import {EventInterface} from "./EventInterface";

export class HistoricalBattlesRequestedEvent implements EventInterface
{
    readonly EVENT_NAME: string = 'historicalBattlesRequested';

    getName(): string {
        return this.EVENT_NAME;
    }
}