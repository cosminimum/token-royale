import Chart from "chart.js/dist/Chart";
import {CustomChart} from "./Chart/CustomChart"

export class ChartRenderService
{
    readonly PANEL_CHART_TYPE = "panel"

    render(chart: ChartInterface): void
    {
        let canvas

        if (chart.getType() === this.PANEL_CHART_TYPE) {
            canvas = new CustomChart(chart)
            canvas.render()
        } else {
            let ctx = document.querySelector(chart.getSelector())
            chart.getOptions().then(function(chartOptions) {
                let canvas = new Chart(ctx, chartOptions);
            });
        }
    }
}