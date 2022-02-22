import {EventInterface} from "./EventInterface";

export class WalletChainChangedEvent implements EventInterface
{
    readonly EVENT_NAME: string = 'chainChanged';

    getName(): string {
        return this.EVENT_NAME;
    }
}