import {ReportService} from "../../Service/ReportService";
import {Client} from "../../Service/Wallet/Client";
import {UtilsService} from "../../Service/UtilsService";

export class TotalBattleTokens implements ChartInterface
{
    readonly CHART_NAME: string = "Total Battle Tokens";
    readonly CHART_SELECTOR: string = "#total_battle_tokens";
    readonly CHART_TYPE: string = "panel";
    readonly CHART_ICON_PATH = "build/images/elements/theme-objects/controller-icon.png"

    reportService: ReportService;
    client: Client;

    constructor() {
        this.reportService = ReportService.getInstance();
        this.client = Client.getInstance();
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

        return this.reportService.fetchTotalBattleTokens().then(function(totalBattleTokens) {
            return _this.client.contract.decimals().then(function(decimals) {
                return {
                    icon_path: _this.CHART_ICON_PATH,
                    retrieveData: function () {
                        return UtilsService.uint256TokensToNumber(totalBattleTokens, decimals);
                    }
                }
            })
        });
    }
}