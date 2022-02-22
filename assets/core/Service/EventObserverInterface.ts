interface EventObserverInterface
{
    /* @todo typehint should be strict */
    start(events: Array<any>): void;
    /* @todo typehint should be strict */
    callbackWrapper(callback: any, argument: any): any;
}
