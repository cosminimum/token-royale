export class AbstractTemplate implements TemplateInterface
{
    readonly DOM_RENDERED_TAG: string = '-rendered';
    readonly CLASS_TAG: string = '.';

    render(context: object): void {};
    inject(syntax: string) {};
}