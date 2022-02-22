import {ReportService} from "../../Service/ReportService";

export class JoinedTeam implements ChartInterface
{
    readonly CHART_NAME: string = "My Team";
    readonly CHART_SELECTOR: string = "#joined_team";
    readonly CHART_TYPE: string = "panel";

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
        return this.reportService.fetchJoinedTeam().then(function(joinedTeam) {
            let iconPath = "build/images/elements/theme-objects/controller-icon.png"; // todo: new icon for this
            let teamName = "-";

            if (joinedTeam != null) {
                iconPath = joinedTeam.getBadgePath();
                teamName = joinedTeam.getName();
            }

            return {
                icon_path: iconPath,
                retrieveData: function () {
                    return teamName;
                }
            }
        });
    }
}