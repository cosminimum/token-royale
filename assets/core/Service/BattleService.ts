import {ReportService} from "./ReportService";

const moment = require('moment'); //@todo how it works? ugly AF
import {MessengerService} from "./MessengerService"
import {MessengerContextDto} from "../Dto/MessengerContextDto"
import {Battle} from "../Model/Battle/Battle"
import {CronService} from "./CronService"
import {Client} from "./Wallet/Client"
import {TeamService} from "./TeamService";
import {EventDispatchService} from "./EventDispatcherService";
import {BattleInitRequestedEvent} from "../Event/BattleInitRequestedEvent";

export class BattleService
{
    private static BATTLE_RULES_ROUTE = 'fetch_battle_rules'
    private static SAVE_BATTLE_ROUTE = 'save_battle'

    private messengerService: MessengerService
    private client: Client
    private teamService: TeamService
    private eventDispatchService: EventDispatchService
    private battleInitRequestedEvent: BattleInitRequestedEvent
    private reportService: ReportService;

    constructor() {
        this.messengerService = new MessengerService()
        this.client = Client.getInstance();
        this.teamService = new TeamService()
        this.eventDispatchService = new EventDispatchService()
        this.battleInitRequestedEvent = new BattleInitRequestedEvent()
        this.reportService = ReportService.getInstance();
    }

    start(): void
    {
        let _this = this

        this.messengerService
            .send(new MessengerContextDto(BattleService.BATTLE_RULES_ROUTE, 'GET'))
            .then(function(response){
                _this.messengerService.getResponse(response).then(function (activeBattleRules){
                    _this.messengerService.send(new MessengerContextDto(BattleService.SAVE_BATTLE_ROUTE, 'POST',  _this.createBattleObject(activeBattleRules))).then(function(response){
                        _this.messengerService.getResponse(response).then(function(battle){
                            battle = new Battle(JSON.parse(battle[0]));

                            CronService.set(battle.end, function(){
                                _this.end(battle.salt);
                            })

                            //@todo add to battle object this properties
                            _this.client.start(battle.period, battle.leavePenaltyPermille, battle.houseFeePermille, battle.winnerPermille, battle.exitFee, battle.timeCoef);
                            _this.eventDispatchService.dispatch(_this.battleInitRequestedEvent);
                        })
                    });
                });
            });



    }

    end(salt: string): void
    {
        let _this = this;

        this.client.getWinnerTeamInfo(salt).then(function (winnerTeamInfo) {
            let winnerTeam = winnerTeamInfo[0];
            let winnerTeamContribution = winnerTeamInfo[1];

            let participantCount;

            _this.client.getParticipantsCount().then(function (count) {
                participantCount = count;
            });

            let continueLoop = true
            let offset = 0
            let batchSize = 100

            while (continueLoop) {
                _this.client.distributeTokens(salt, winnerTeam, 2, winnerTeamContribution, offset, offset + batchSize)
                offset += batchSize

                if (offset >= participantCount) {
                    continueLoop = false;
                }
            }

            _this.start()
        });
    }

    join(team: string, value: number): void
    {
        this.client.joinBattle({team: team, value: value})
    }

    leave(team: string): void
    {
        this.client.leaveBattle(team)
    }

    getPlayerStats(teamIndex: number)
    {
        //@todo let's try to minimize duplicated code
        let _this = this;


    }

    isJoined(teamIndex: number): Promise<any>
    {
        let _this = this;

        return _this.client.getAddress().then(function(address) {
            return _this.reportService.fetchEncodedTeamAddress(teamIndex).then(function(encodedTeamAddress){
                return _this.client.getEncodedTeamAddressInfo(encodedTeamAddress).then(function (encodedTeamAddressInfo) {
                    let tokens = encodedTeamAddressInfo[1];

                    return tokens > 0;
                });
            });
        });
    }

    createBattleObject(battleRules: object): object
    {
        let battle = {
            teamAlpha: null,
            teamBeta: null,
            start: null,
            end: null,
            status: "in_progress"
        }

        battle.teamAlpha = battleRules.team_alpha;
        battle.teamBeta = battleRules.team_beta;
        battle.start = battleRules.start;
        battle.end = battleRules.end;

        if (typeof battleRules.team_alpha === "undefined" ||
            typeof battleRules.team_beta === "undefined"
        ) {
            let teams = this.teamService.choose();
            battle.teamAlpha = teams[0].slug;
            battle.teamBeta = teams[1].slug;
        }

        if (typeof battleRules.start === "undefined" ||
            typeof battleRules.end === "undefined"
        ) {
            battle.start = moment().format('YYYY-MM-DD HH:mm:ss');
            battle.end = moment().add(5, 'days').format('YYYY-MM-DD HH:mm:ss');
        }

        return battle;
    }
}