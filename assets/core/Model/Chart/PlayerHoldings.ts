import {ReportService} from "../../Service/ReportService";

export class PlayerHoldings implements ChartInterface
{
    readonly CHART_NAME: string = "My Holdings";
    readonly CHART_SELECTOR: string = "#player_holdings";
    readonly CHART_TYPE: string = "panel";
    readonly CHART_ICON_PATH = "build/images/elements/theme-objects/player-holdings.png"

    reportService: ReportService

    constructor() {
        this.reportService = ReportService.getInstance();
    }

    getName(): string {
        return this.CHART_NAME;
    }

    getType(): string {
        return this.CHART_TYPE;
    }

    getSelector(): string {
        return this.CHART_SELECTOR;
    }

    getOptions(): Promise<any> {
        let _this = this;

        return this.reportService.fetchPlayerHoldings().then(function(playerHoldings) {
            return {
                icon_path: _this.CHART_ICON_PATH,
                retrieveData: function () {
                    return playerHoldings;
                }
            };
        });
    }
}