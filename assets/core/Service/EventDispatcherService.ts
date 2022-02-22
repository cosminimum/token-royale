import {EventInterface} from "../Event/EventInterface";

export class EventDispatchService
{
    dispatch(event: EventInterface, ...data: object[]): void
    {
        document.dispatchEvent(
            new CustomEvent(event.getName(), { detail: data })
        );
    }
}