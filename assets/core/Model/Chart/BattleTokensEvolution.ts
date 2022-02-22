import {ReportService} from "../../Service/ReportService";

export class BattleTokensEvolution implements ChartInterface
{
    readonly CHART_NAME: string = "Battle Tokens Evolution";
    readonly CHART_SELECTOR: string = "#battle_tokens_evolution";
    readonly CHART_TYPE: string = "chart";

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
        return new Promise((resolve, reject) => {
            resolve({
                type: 'line',
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: 'Battle Tokens',
                        data: [65000, 59000, 80000, 81000, 110000, 176000, 320000],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }
            })
        });
    }
}