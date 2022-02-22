import {ReportService} from "../../Service/ReportService";

export class BattleHoldersEvolution implements ChartInterface
{
    readonly CHART_NAME: string = "Battle Holders Evolution";
    readonly CHART_SELECTOR: string = "#battle_holders_evolution";
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
                        label: 'Battle Holders',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }
            })
        });
    }
}