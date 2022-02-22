export class CustomChart
{
    readonly CHART_ICON_SELECTOR = ".chart-icon"
    readonly CHART_LABEL_SELECTOR = ".chart-label"
    readonly CHART_VALUE_SELECTOR = ".chart-value"

    chart: ChartInterface

    constructor(chart: ChartInterface) {
        this.chart = chart;
    }

    render(): void
    {
        let _this = this;

        /** chart icon **/
        this.chart.getOptions().then(function(chartOptions) {
            let iconPath = chartOptions.icon_path;
            document.querySelector(_this.chart.getSelector() + " " + _this.CHART_ICON_SELECTOR).innerHTML = `<img src=${iconPath} />`

            /** chart label **/
            document.querySelector(_this.chart.getSelector() + " " + _this.CHART_LABEL_SELECTOR).innerHTML = _this.chart.getName()

            /** chart value **/
            document.querySelector(_this.chart.getSelector() + " " + _this.CHART_VALUE_SELECTOR).innerHTML = chartOptions.retrieveData();
        });
    }
}