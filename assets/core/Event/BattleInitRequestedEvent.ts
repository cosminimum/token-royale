import {EventInterface} from "./EventInterface";

export class BattleInitRequestedEvent implements EventInterface
{
    readonly EVENT_NAME: string = 'battleInitRequested';

    getName(): string {
        return this.EVENT_NAME;
    }
}