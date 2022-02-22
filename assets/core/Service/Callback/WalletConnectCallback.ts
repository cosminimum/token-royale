import {EventDispatchService} from "../EventDispatcherService";
import {EventInterface} from "../../Event/EventInterface";
import {WalletConnectRequestedEvent} from "../../Event/WalletConnectRequestedEvent";

export class WalletConnectCallback
{
    readonly WALLET_TYPE_ATTRIBUTE_NAME: string = 'data-wallet';

    eventDispatcher: EventDispatchService
    event: EventInterface;

    constructor() {
        this.eventDispatcher = new EventDispatchService();
        this.event = new WalletConnectRequestedEvent();
    }

    getCallback() {
        let _this = this;

        return function (element) {
            if (!element) {
                return;
            }

            let walletType = element.getAttribute(_this.WALLET_TYPE_ATTRIBUTE_NAME);

            _this.eventDispatcher.dispatch(_this.event, [{type: walletType}]);
        };
    }

}