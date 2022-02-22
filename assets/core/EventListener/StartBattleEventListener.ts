import {EventListenerInterface} from "./EventListenerInterface";
import {BattleTokensEvolution} from "../Model/Chart/BattleTokensEvolution";
import {ChartRenderService} from "../Service/ChartRenderService";
import {StatsInitRequestedEvent} from "../Event/StatsInitRequestedEvent";
import {BattleHoldersEvolution} from "../Model/Chart/BattleHoldersEvolution";
import {BattleDistribution} from "../Model/Chart/BattleDistribution";
import {TotalBattleTokens} from "../Model/Chart/TotalBattleTokens";
import {TotalBattleHolders} from "../Model/Chart/TotalBattleHolders";
import {BattleService} from "../Service/BattleService";

export class StartBattleEventListener implements EventListenerInterface
{
    battleService: BattleService

    constructor() {
        this.battleService = new BattleService()

        this.startListen();
    }

    startListen(): void {
        let _this = this;

        //@TODO DELETE THIS AFTER TESTING. IT'S A BIG NO-NO
        document.addEventListener("startBattle", function (){
            _this.battleService.start();
        });
    }
}