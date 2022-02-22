import {EventInterface} from "./EventInterface";

export class WalletInitRequestedEvent implements EventInterface
{
    readonly EVENT_NAME: string = 'walletInitRequested';

    getName(): string {
        return this.EVENT_NAME;
    }
}