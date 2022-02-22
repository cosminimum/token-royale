interface TemplateInterface
{
    /* @todo return type should be strict */
    render(context: object): void;
    inject(syntax: string): void;
}