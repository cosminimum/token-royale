import {EventDispatchService} from "../EventDispatcherService";
import {EventInterface} from "../../Event/EventInterface";
import {WalletConnectRequestedEvent} from "../../Event/WalletConnectRequestedEvent";
import {JoinBattleRequestedEvent} from "../../Event/JoinBattleRequestedEvent";
import {MessengerService} from "../MessengerService";
import {MessengerContextDto} from "../../Dto/MessengerContextDto";
import {Client} from "../Wallet/Client";
import {ReportService} from "../ReportService";

export class JoinBattleCallback
{
    readonly JOINED_TEAM_ATTRIBUTE_NAME: string = 'data-team-index';

    eventDispatcher: EventDispatchService
    event: EventInterface
    messengerService: MessengerService
    client: Client;
    reportService: ReportService;

    constructor() {
        this.client = Client.getInstance();
        this.eventDispatcher = new EventDispatchService()
        this.event = new JoinBattleRequestedEvent()
        this.messengerService = new MessengerService()
        this.reportService = ReportService.getInstance();
    }

    getCallback() {
        let _this = this;

        return function (joinButtonElement) {
            if (!joinButtonElement) {
                return;
            }

            let joinedTeamIndex = joinButtonElement.getAttribute(_this.JOINED_TEAM_ATTRIBUTE_NAME);

            let joinedTeamSelector = `input[name=team_${joinedTeamIndex}]`;
            //@todo fix phpstorm error
            let value = parseFloat(document.querySelector(joinedTeamSelector).value);

            if (isNaN(value)) {
                return;
            }

            _this.reportService.fetchEncodedTeamAddress(joinedTeamIndex).then(function(encodedTeamAddress){
                _this.eventDispatcher.dispatch(_this.event, {team: encodedTeamAddress, value: value});
                $(joinButtonElement).closest('.modal').modal('hide');
            });
        };
    }

}