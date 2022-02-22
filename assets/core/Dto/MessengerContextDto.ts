export class MessengerContextDto
{
    private _url: string;
    private _method: string;
    private _data: object;

    constructor(url: string, method: string, data: object = {}) {
        this._url = url;
        this._method = method;
        this._data = data;
    }

    get url(): string {
        return this._url;
    }

    get method(): string {
        return this._method;
    }

    get data(): object {
        return this._data;
    }
}