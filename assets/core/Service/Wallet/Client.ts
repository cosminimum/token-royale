import { ethers } from "ethers";
import {ExternalDependency} from "../../ExternalDependency";
import {AbiSmartContract} from "./AbiSmartContract";
import {UtilsService} from "../UtilsService";

export class Client
{
    // Singleton
    private static instance: Client;
    public static getInstance(): Client {
        if (!Client.instance) {
            Client.instance = new Client();
        }

        return Client.instance;
    }

    readonly ADDRESS_PREFIX = "0x"
    public static SMART_CONTRACT_ADDRESS = "0x8770dA900FEa02b122b7922638B7aE6D56f30F80" // with 0x

    provider: any;
    signer: any;
    contract: any;
    externalDependency: ExternalDependency;

    private constructor()
    {
        this.externalDependency = new ExternalDependency();
        this.provider =  new ethers.providers.Web3Provider(this.externalDependency.ethereum);
        this.signer = this.provider.getSigner()
        this.contract = new ethers.Contract(Client.SMART_CONTRACT_ADDRESS, AbiSmartContract.get(), this.signer);
    }

    getProvider(): any
    {
        return this.provider;
    }

    getSigner(): any
    {
        return this.signer;
    }

    getBlockNumber(): Promise<any>
    {
        return this.provider.getBlockNumber();
    }

    getAddress(): Promise<any>
    {
        let _this = this;

        return this.isConnected().then(function(isConnected) {
            if (!isConnected) {
                // window.location.replace("http://stackoverflow.com");
                // todo: redirect to a page to ask for wallet connection and then redirect?
            }

            return _this.signer.getAddress();
        })
    }

    async isConnected(): Promise<any>
    {
        const accounts = await this.provider.listAccounts();

        return accounts.length > 0;
    }

    async connect(): Promise<any>
    {
        return await this.externalDependency.ethereum.request({
            method: 'eth_requestAccounts'
        });
    }

    async switchChain()
    {
        // await this.externalDependency.ethereum.request({
        //     method: 'wallet_addEthereumChain',
        //     params: [{
        //         chainId: '0x38',
        //         chainName: 'Binance Smart Chain',
        //         nativeCurrency:
        //             {
        //                 name: 'BNB',
        //                 symbol: 'BNB',
        //                 decimals: 18
        //             },
        //         rpcUrls: ['https://bsc-dataseed.binance.org/'],
        //         blockExplorerUrls: ['https://bscscan.com/']
        //     }]
        // });
    }

    async getExitFee(): Promise<any>
    {
        return this.contract._exitFee();
    }

    async joinBattle(params: object): Promise<any>
    {
        let _this = this;

        return this.getExitFee().then(function(exitFee) {
            return _this.getEncodedTeamAddressInfo(params.team).then(function(encodedTeamAddressInfo) {
                let tokens = encodedTeamAddressInfo[1];

                return _this.contract.decimals().then(function(decimals) {
                    let overrides = {};
                    if (tokens.eq(0)) {
                        overrides = {value: '' + exitFee};
                    }

                    return _this.contract.joinBattle(
                        _this.ADDRESS_PREFIX + params.team,
                        '' + UtilsService.numberToUint256Tokens(params.value, decimals), // needed to be string so no overflow error arrives
                        overrides
                    );
                });
            });
        });
    }

    async leaveBattle(encodedTeamAddress: string): Promise<any>
    {
        return this.contract.leaveBattle(this.ADDRESS_PREFIX + encodedTeamAddress)
    }

    async getWinnerTeamInfo(salt: string): Promise<any>
    {
        return this.contract.getWinnerTeamInfo(salt)
    }

    async getEncodedTeamAddressInfo(encodedTeamAddress: string): Promise<any>
    {
        return this.contract.getEncodedTeamAddressInfo(this.ADDRESS_PREFIX + encodedTeamAddress);
    }

    async getParticipantsCount(): Promise<any>
    {
        return this.contract.getParticipantsCount()
    }

    async getJoinedTokens(): Promise<any>
    {
        return this.contract.getJoinedTokens()
    }

    async distributeTokens(salt: string, winnerTeam: number, looserTeam: number, winnerTeamContribution: number, offset: number, limit: number)
    {
        await this.contract.distributeTokens()
    }

    async start(period: number, leavePenaltyPermille: number, houseFeePermille: number, winnerPermille: number, exitFee: number, timeCoef: number)
    {
        await this.contract.startSeason(period, leavePenaltyPermille, houseFeePermille, winnerPermille, exitFee, timeCoef)
    }
}
