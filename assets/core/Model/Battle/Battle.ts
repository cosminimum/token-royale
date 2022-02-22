import {TeamService} from "../../Service/TeamService";

export class Battle
{
    private _teamAlpha: string
    private _teamBeta: string
    private _salt: string
    private _start: number
    private _end: number
    private _status: string

    constructor(object) {
        this._teamAlpha = object.team_alpha;
        this._teamBeta = object.team_beta;
        this._salt = object.salt;
        this._start = object.start;
        this._end = object.end;
        this._status = object.status;
    }

    get teamAlpha(): string {
        return this._teamAlpha;
    }

    get teamBeta(): string {
        return this._teamBeta;
    }

    get salt(): string {
        return this._salt;
    }

    get start(): number {
        return this._start;
    }

    get end(): number {
        return this._end;
    }

    get status(): string {
        return this._status;
    }
}