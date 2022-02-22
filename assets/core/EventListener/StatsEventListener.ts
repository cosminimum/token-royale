import {EventListenerInterface} from "./EventListenerInterface";
import {BattleTokensEvolution} from "../Model/Chart/BattleTokensEvolution";
import {ChartRenderService} from "../Service/ChartRenderService";
import {StatsInitRequestedEvent} from "../Event/StatsInitRequestedEvent";
import {BattleHoldersEvolution} from "../Model/Chart/BattleHoldersEvolution";
import {BattleDistribution} from "../Model/Chart/BattleDistribution";
import {TotalBattleTokens} from "../Model/Chart/TotalBattleTokens";
import {TotalBattleHolders} from "../Model/Chart/TotalBattleHolders";
import {JoinedTeam} from "../Model/Chart/JoinedTeam";
import {PlayerHoldings} from "../Model/Chart/PlayerHoldings";

export class StatsEventListener implements EventListenerInterface
{
    readonly CHARTS = [
        new BattleTokensEvolution(),
        new BattleHoldersEvolution(),
        new TotalBattleTokens(),
        new TotalBattleHolders(),
        new JoinedTeam(),
        new PlayerHoldings()
    ];

    chartRenderService: ChartRenderService;
    statsInitRequestedEvent: StatsInitRequestedEvent;

    constructor() {
        this.chartRenderService = new ChartRenderService();
        this.statsInitRequestedEvent = new StatsInitRequestedEvent();

        this.startListen();
    }

    startListen(): void {
        let _this = this;

        document.addEventListener(_this.statsInitRequestedEvent.getName(), function (){
            // if isJoined

            _this.CHARTS.forEach(function(chart){
                _this.chartRenderService.render(chart);
            });
        });
    }
}