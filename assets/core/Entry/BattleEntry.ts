import {EntryInterface} from "./EntryInterface";
import {DOMEventObserver} from "../Service/DOMEventObserver";
import {DocumentReadyEventListener} from "../EventListener/DocumentReadyEventListener";
import {StatsInitRequestedEvent} from "../Event/StatsInitRequestedEvent";
import {StatsEventListener} from "../EventListener/StatsEventListener";
import {BattleEventListener} from "../EventListener/BattleEventListener";
import {BattleInitRequestedEvent} from "../Event/BattleInitRequestedEvent";
import {StartBattleEventListener} from "../EventListener/StartBattleEventListener";
import {WalletConnectCallback} from "../Service/Callback/WalletConnectCallback";
import {JoinBattleCallback} from "../Service/Callback/JoinBattleCallback";
import {JoinBattleRequestedEventListener} from "../EventListener/JoinBattleRequestedEventListener";
import {HistoricalBattlesRequestedEvent} from "../Event/HistoricalBattlesRequestedEvent";
import {HistoricalBattlesEventListener} from "../EventListener/HistoricalBattlesEventListener";
import {WalletEventListener} from "../EventListener/WalletEventListener";
import {WalletInitRequestedEvent} from "../Event/WalletInitRequestedEvent";
import {SurrenderBattleCallback} from "../Service/Callback/SurrenderBattleCallback";

export class BattleEntry implements EntryInterface
{
    domEventObserver: DOMEventObserver

    constructor() {
        this.domEventObserver = new DOMEventObserver()

        this.loadDOMEventListeners()
        this.loadEventListeners()
    }

    loadEventListeners(): void {
        new StatsEventListener()
        new BattleEventListener()
        new StartBattleEventListener()
        new JoinBattleRequestedEventListener()
        new HistoricalBattlesEventListener()
        new WalletEventListener()

        new DocumentReadyEventListener([
            new BattleInitRequestedEvent(),
            new HistoricalBattlesRequestedEvent(),
            new WalletInitRequestedEvent()
        ]);
    }

    loadDOMEventListeners(): void {
        this.domEventObserver.start([
            { type: "click", selector: ".join-battle", callback: new JoinBattleCallback().getCallback() },
            { type: "click", selector: ".surrender-battle", callback: new SurrenderBattleCallback().getCallback() },
            { type: "click", selector: ".wallet-type", callback: new WalletConnectCallback().getCallback() }
        ]);
    }
}

window['Entry'] = new BattleEntry()