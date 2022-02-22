let global:any = window;

export class ExternalDependency
{
    readonly ethereum: any = global.ethereum;
    readonly routing: any = global.Routing;
}