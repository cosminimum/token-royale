import {EventInterface} from "./EventInterface";

export class JoinBattleRequestedEvent implements EventInterface
{
    readonly EVENT_NAME: string = 'joinBattleRequested';

    getName(): string {
        return this.EVENT_NAME;
    }
}