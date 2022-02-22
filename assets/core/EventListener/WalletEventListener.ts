import {Client} from "../Service/Wallet/Client";
import {EventDispatchService} from "../Service/EventDispatcherService";
import {EventInterface} from "../Event/EventInterface";
import {WalletConnectRequestedEvent} from "../Event/WalletConnectRequestedEvent";
import {EventListenerInterface} from "./EventListenerInterface";
import {WalletInitRequestedEvent} from "../Event/WalletInitRequestedEvent";
import {WalletConnectedTemplate} from "../Template/WalletConnectedTemplate";
import {WalletDisconnectedTemplate} from "../Template/WalletDisconnectedTemplate";
import {WalletAddressRequestedEvent} from "../Event/WalletAddressRequestedEvent";
import {ExternalDependency} from "../ExternalDependency";
import {WalletChainChangedEvent} from "../Event/WalletChainChangedEvent";

export class WalletEventListener implements EventListenerInterface
{
    client: Client;
    externalDependency: ExternalDependency;

    walletConnectedTemplate: WalletConnectedTemplate
    walletDisconnectedTemplate: WalletDisconnectedTemplate

    eventDispatcher: EventDispatchService
    initRequestedEvent: EventInterface
    connectRequestedEvent: EventInterface
    addressRequestedEvent: EventInterface
    chainChangedEvent: EventInterface


    constructor() {
        this.client = Client.getInstance();
        this.eventDispatcher = new EventDispatchService();
        this.externalDependency = new ExternalDependency();

        /* events */
        this.connectRequestedEvent = new WalletConnectRequestedEvent();
        this.initRequestedEvent = new WalletInitRequestedEvent();
        this.addressRequestedEvent = new WalletAddressRequestedEvent();
        this.chainChangedEvent = new WalletChainChangedEvent();

        /* templates */
        this.walletConnectedTemplate = new WalletConnectedTemplate();
        this.walletDisconnectedTemplate = new WalletDisconnectedTemplate();

        this.startListen();
    }

    startListen(): void {
        let _this = this;

        document.addEventListener(_this.connectRequestedEvent.getName(), function (){
            _this.client.connect().then(function(){
                _this.client.switchChain();

                _this.eventDispatcher.dispatch(_this.initRequestedEvent);
            });
        });

        document.addEventListener(_this.addressRequestedEvent.getName(), function (){
            _this.client.getAddress().then(function(address) {
                _this.walletConnectedTemplate.render({
                    address: address
                });
            });
        });

        document.addEventListener(_this.initRequestedEvent.getName(), function (){
            _this.client.isConnected().then(function(isConnected){
                if (isConnected) {
                    _this.eventDispatcher.dispatch(_this.addressRequestedEvent);
                } else {
                    _this.walletDisconnectedTemplate.render();
                }
            });
        });

        /* Blockchain event listener */
        this.externalDependency.ethereum.on(this.chainChangedEvent.getName(), function(){
           _this.client.switchChain();
        });
    }
}