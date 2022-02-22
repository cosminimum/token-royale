import {MessengerContextDto} from "../Dto/MessengerContextDto";
import {ExternalDependency} from "../ExternalDependency";

export class MessengerService
{
    externalDependency: ExternalDependency;

    constructor() {
        this.externalDependency = new ExternalDependency();
    }

    send(context: MessengerContextDto): Promise<any> {
        if ("GET" === context.method) {
            let url;
            if (typeof context.data !== "undefined") {
                url = this.externalDependency.routing.generate(context.url, context.data);
            } else {
                url = this.externalDependency.routing.generate(context.url);
            }

            return fetch(url, {
                method: context.method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return fetch(this.externalDependency.routing.generate(context.url), {
            method: context.method,
            body: JSON.stringify(context.data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async getResponse(response)
    {
        return await response.json()
    }
}