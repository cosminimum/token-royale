import {EventListenerInterface} from "./EventListenerInterface";
import {BattleService} from "../Service/BattleService";
import {EventInterface} from "../Event/EventInterface";
import {JoinBattleRequestedEvent} from "../Event/JoinBattleRequestedEvent";

export class JoinBattleRequestedEventListener implements EventListenerInterface
{
    event: EventInterface
    battleService: BattleService

    constructor() {
        this.event = new JoinBattleRequestedEvent()
        this.battleService = new BattleService()

        this.startListen();
    }

    startListen(): void {
        let _this = this;

        document.addEventListener(this.event.getName(), function (event){
            let data = event.detail[0];
            _this.battleService.join(data.team, data.value)
        });
    }
}