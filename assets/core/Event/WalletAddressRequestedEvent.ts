import {EventInterface} from "./EventInterface";

export class WalletAddressRequestedEvent implements EventInterface
{
    readonly EVENT_NAME: string = 'walletAddressRequested';

    getName(): string {
        return this.EVENT_NAME;
    }
}