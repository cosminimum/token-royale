import {EventInterface} from "./EventInterface";

export class StatsInitRequestedEvent implements EventInterface
{
    readonly EVENT_NAME: string = 'statsInitRequested';

    getName(): string {
        return this.EVENT_NAME;
    }
}