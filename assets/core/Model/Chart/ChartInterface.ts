interface ChartInterface
{
    getName(): string;
    getType(): string;
    getSelector(): string;
    getOptions(): Promise<any>;
}