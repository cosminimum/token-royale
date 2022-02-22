export abstract class AbstractEventObserver implements EventObserverInterface
{
    start(events: Array<any>): void {}
    callbackWrapper(callback: any, argument: any): any {
        return function () {
            callback(argument);
        };
    }
}