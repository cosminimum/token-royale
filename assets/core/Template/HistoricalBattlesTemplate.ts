import Handlebars from "handlebars";
import {AbstractTemplate} from "./AbstractTemplate";

export class HistoricalBattlesTemplate extends AbstractTemplate
{
    readonly SCRIPT_TAG: string = "historical-battles-template";

    render(context: object = null): void {
        let template = Handlebars.compile(document.getElementById(this.SCRIPT_TAG).innerHTML);

        this.inject(template(context));
    }

    inject(syntax: string) {
        document.querySelector(this.CLASS_TAG + this.SCRIPT_TAG + this.DOM_RENDERED_TAG).innerHTML = syntax;
    }
}