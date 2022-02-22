import {EventDispatchService} from "../EventDispatcherService";
import {EventInterface} from "../../Event/EventInterface";
import {WalletConnectRequestedEvent} from "../../Event/WalletConnectRequestedEvent";
import {JoinBattleRequestedEvent} from "../../Event/JoinBattleRequestedEvent";
import {MessengerService} from "../MessengerService";
import {MessengerContextDto} from "../../Dto/MessengerContextDto";
import {Client} from "../Wallet/Client";
import {ReportService} from "../ReportService";

export class SurrenderBattleCallback
{
    readonly JOINED_TEAM_ATTRIBUTE_NAME: string = 'data-team-index';

    messengerService: MessengerService
    client: Client;
    reportService: ReportService;

    constructor() {
        this.messengerService = new MessengerService()
        this.client = Client.getInstance();
        this.reportService = ReportService.getInstance();
    }

    getCallback() {
        let _this = this;

        return function (surrenderButtonElement) {
            if (!surrenderButtonElement) {
                return;
            }

            let joinedTeamIndex = surrenderButtonElement.getAttribute(_this.JOINED_TEAM_ATTRIBUTE_NAME);

            _this.reportService.fetchEncodedTeamAddress(joinedTeamIndex).then(function(encodedTeamAddress){
                _this.client.leaveBattle(encodedTeamAddress);
                $(surrenderButtonElement).closest('.modal').modal('hide');
            });
        };
    }
}