import {ReportService} from "../../Service/ReportService";
import {Client} from "../../Service/Wallet/Client";
import {MessengerService} from "../../Service/MessengerService";

export class TotalBattleHolders implements ChartInterface
{
    readonly CHART_NAME: string = "Total Battle Holders";
    readonly CHART_SELECTOR: string = "#total_battle_holders";
    readonly CHART_TYPE: string = "panel";
    readonly CHART_ICON_PATH = "build/images/elements/theme-objects/player-icon.png"

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

        return this.reportService.fetchTotalBattleHolders().then(function(totalBattleHolders) {
            return {
                icon_path: _this.CHART_ICON_PATH,
                retrieveData: function () {
                    return totalBattleHolders;
                }
            }
        });
    }
}