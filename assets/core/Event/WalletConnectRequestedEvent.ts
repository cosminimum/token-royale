import {EventInterface} from "./EventInterface";

export class WalletConnectRequestedEvent implements EventInterface
{
    readonly EVENT_NAME: string = 'walletConnectRequested';

    getName(): string {
        return this.EVENT_NAME;
    }
}