import {EventListenerInterface} from "./EventListenerInterface";
import {EventDispatchService} from "../Service/EventDispatcherService";
import {EventInterface} from "../Event/EventInterface";

export class DocumentReadyEventListener implements EventListenerInterface
{
    readonly EVENT: string = 'DOMContentLoaded';

    eventDispatcher: EventDispatchService
    events: object[]

    constructor(events: object[]) {
        this.eventDispatcher = new EventDispatchService();

        this.events = events;

        this.startListen();
    }

    startListen(): void {
        let _this = this;

        document.addEventListener(this.EVENT, function() {
            _this.events.forEach(function (event: EventInterface) {
                _this.eventDispatcher.dispatch(event);
            });
        });
    }
}