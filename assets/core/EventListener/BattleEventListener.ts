import {EventListenerInterface} from "./EventListenerInterface";
import {BattleInitRequestedEvent} from "../Event/BattleInitRequestedEvent";
import {MessengerService} from "../Service/MessengerService";
import {MessengerContextDto} from "../Dto/MessengerContextDto";
import {TeamService} from "../Service/TeamService";
import {Battle} from "../Model/Battle/Battle";
import {BattleService} from "../Service/BattleService";
import {BattleWaitingTemplate} from "../Template/BattleWaitingTemplate";
import {BattleInProgressTemplate} from "../Template/BattleInProgressTemplate";
import {StatsInitRequestedEvent} from "../Event/StatsInitRequestedEvent";
import {EventDispatchService} from "../Service/EventDispatcherService";
import {EventInterface} from "../Event/EventInterface";

export class BattleEventListener implements EventListenerInterface
{
    battleInitRequestedEvent: EventInterface
    messengerService: MessengerService
    battleWaitingTemplate: BattleWaitingTemplate
    battleInProgressTemplate: BattleInProgressTemplate
    battleService: BattleService
    eventDispatchService: EventDispatchService
    statsInitEvent: EventInterface


    constructor() {
        this.battleInitRequestedEvent = new BattleInitRequestedEvent()
        this.messengerService = new MessengerService()
        this.battleWaitingTemplate = new BattleWaitingTemplate()
        this.battleInProgressTemplate = new BattleInProgressTemplate()
        this.battleService = new BattleService()
        this.eventDispatchService = new EventDispatchService()
        this.statsInitEvent = new StatsInitRequestedEvent()

        this.startListen();
    }

    startListen(): void {
        let _this = this;

        document.addEventListener(_this.battleInitRequestedEvent.getName(), function () {
            _this.messengerService.send(new MessengerContextDto('fetch_current_battle', 'GET')).then(function(response){
                _this.getBattle(response).then(function(battle: object){
                    // todo: why?
                    if (battle.length === 0) {
                        _this.battleWaitingTemplate.render()

                        return;
                    }

                    battle = new Battle(battle);

                    if (battle.status !== "in_progress") {
                        _this.battleWaitingTemplate.render()

                        return;
                    }

                    let teamAlpha = TeamService.createInstance(battle.teamAlpha);
                    let teamBeta = TeamService.createInstance(battle.teamBeta);

                    _this.battleService.isJoined(1).then(function(isJoinedTeamAlpha) {
                        _this.battleService.isJoined(2).then(function(isJoinedTeamBeta) {
                            let allowedAlpha = true;
                            let allowedBeta = true;

                            if (isJoinedTeamAlpha) {
                                allowedBeta = false;
                            }

                            if (isJoinedTeamBeta) {
                                allowedAlpha = false;
                            }

                            _this.battleInProgressTemplate.render({
                                battle_end: battle.end,
                                teams: [
                                    {
                                        badge_path: teamAlpha.getBadgePath(),
                                        cover_path: teamAlpha.getCoverPath(),
                                        name: teamAlpha.getName(),
                                        slogan: teamAlpha.getSlogan(),
                                        slug: teamAlpha.getSlug(),
                                        team_index: 1,
                                        is_joined: isJoinedTeamAlpha,
                                        allowed: allowedAlpha
                                    },
                                    {
                                        badge_path: teamBeta.getBadgePath(),
                                        cover_path: teamBeta.getCoverPath(),
                                        name: teamBeta.getName(),
                                        slogan: teamBeta.getSlogan(),
                                        slug: teamBeta.getSlug(),
                                        team_index: 2,
                                        is_joined: isJoinedTeamBeta,
                                        allowed: allowedBeta
                                    }
                                ],
                                canvas_charts: [
                                    "battle_holders_evolution",
                                    "battle_tokens_evolution"
                                ],
                                custom_charts: [
                                    "total_battle_holders",
                                    "total_battle_tokens",
                                    "joined_team",
                                    "player_holdings"
                                ]
                            })
                            window.initCountdown();

                            _this.eventDispatchService.dispatch(_this.statsInitEvent);
                        });
                    });
                })
            })
        })
    }

    async getBattle(response)
    {
        return await response.json();
    }
}