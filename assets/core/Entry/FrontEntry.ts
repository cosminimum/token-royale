import {WalletEventListener} from "../EventListener/WalletEventListener";
import {EntryInterface} from "./EntryInterface";
import {DOMEventObserver} from "../Service/DOMEventObserver";
import {WalletConnectCallback} from "../Service/Callback/WalletConnectCallback";
import {DocumentReadyEventListener} from "../EventListener/DocumentReadyEventListener";
import {WalletInitRequestedEvent} from "../Event/WalletInitRequestedEvent";

export class FrontEntry implements EntryInterface
{
    domEventObserver: DOMEventObserver;

    constructor() {
        this.domEventObserver = new DOMEventObserver();

        this.loadDOMEventListeners();
        this.loadEventListeners();
    }

    loadEventListeners(): void {}

    loadDOMEventListeners(): void {}
}

window['Entry'] = new FrontEntry();