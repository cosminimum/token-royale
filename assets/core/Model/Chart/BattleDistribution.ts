import {ReportService} from "../../Service/ReportService";

export class BattleDistribution implements ChartInterface
{
    readonly CHART_NAME: string = "Battle Distribution";
    readonly CHART_SELECTOR: string = "#battle_distribution";
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
                series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
                chart: {
                    type: 'polarArea',
                },
                stroke: {
                    colors: ['#fff']
                },
                fill: {
                    opacity: 0.8
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            })
        });
    }
}