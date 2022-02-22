import {AbstractEventObserver} from "./AbstractEventObserver";

export class DOMEventObserver extends AbstractEventObserver
{
    private setTimeoutFunction;
    private retries;

    constructor(props) {
        super();

        this.retries = 0;
    }

    start(events: Array<any>): void {
        let _this = this;
        let delayedEvents = [];

        events.forEach(function (event) {
            if (!document.querySelector(event.selector)) {
                delayedEvents.push(event);

                return;
            }

            let elements = document.querySelectorAll(event.selector)

            elements.forEach(function(element){
                element.addEventListener(event.type, function () {
                    event.callback(this);
                });
            });
        });

        if (this.retries <= 5 && delayedEvents.length > 0) {
            this.retries++;
            this.setTimeoutFunction = setTimeout(function () {
                _this.start(delayedEvents)
            }, 1000);
        }
    }
}