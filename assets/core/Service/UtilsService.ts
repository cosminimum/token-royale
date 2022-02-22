import {BroodOfNozdormu} from "../Model/Team/BroodOfNozdormu";
import {OrderOfTheAwakened} from "../Model/Team/OrderOfTheAwakened";
import {SilverwingSentinels} from "../Model/Team/SilverwingSentinels";
import {WarsongOutriders} from "../Model/Team/WarsongOutriders";

export class UtilsService
{
    public static uint256TokensToNumber(uint256Tokens: number, decimals: number): number
    {
        let number = uint256Tokens / Math.pow(10, decimals);

        return this.round(number, 2);
    }

    public static numberToUint256Tokens(uint256Tokens: number, decimals: number): number
    {
        return uint256Tokens * Math.pow(10, decimals);
    }

    public static round(n: number, precision: number): number
    {
        let pow = Math.pow(10, precision);

        return Math.round(n * pow) / pow; // round 2 decimals
    }
}