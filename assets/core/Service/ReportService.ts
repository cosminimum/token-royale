import {MessengerContextDto} from "../Dto/MessengerContextDto";
import {Client} from "./Wallet/Client";
import {MessengerService} from "./MessengerService";
import {Battle} from "../Model/Battle/Battle";
import {TeamService} from "./TeamService";
import {UtilsService} from "./UtilsService";

export class ReportService
{
    // Singleton
    private static instance: ReportService;
    public static getInstance(): ReportService {
        if (!ReportService.instance) {
            ReportService.instance = new ReportService();
        }

        return ReportService.instance;
    }

    client: Client
    messengerService: MessengerService
    encodedTeamAddressesCache: any

    private constructor() {
        this.client = Client.getInstance();
        this.messengerService = new MessengerService()
        this.encodedTeamAddressesCache = [];
    }

    fetchTotalBattleHolders()
    {
        return this.client.getParticipantsCount().then(function(participantsCount) {
            return participantsCount;
        });
    }

    fetchTotalBattleTokens(): Promise<any>
    {
        return this.client.getJoinedTokens().then(function(joinedTokens) {
            return joinedTokens;
        });
    }

    async fetchEncodedTeamAddress(teamIndex: number): Promise<any>
    {
        let _this = this;

        return this.client.getAddress().then(function(address) {
            let cacheKey = ReportService.getEncodedTeamAddressCacheKey(address, teamIndex);
            if (typeof _this.encodedTeamAddressesCache[cacheKey] !== "undefined") {
                return _this.encodedTeamAddressesCache[cacheKey];
            }

            return _this.messengerService.send(new MessengerContextDto('fetch_encoded_team', 'GET', {address: address,  team: teamIndex})).then(function(response){
                return _this.messengerService.getResponse(response).then(function(encodedTeamAddress){
                    _this.encodedTeamAddressesCache[cacheKey] = encodedTeamAddress;

                    return encodedTeamAddress;
                });
            });
        })
    }

    fetchJoinedTeamIndex(): Promise<any>
    {
        let _this = this;

        return this.fetchEncodedTeamAddress(1).then(function(encodedTeamAddress) {
            return _this.client.getEncodedTeamAddressInfo(encodedTeamAddress).then(function(encodedTeamAddressInfo) {
                let tokens = encodedTeamAddressInfo[1];

                if (tokens.gt(0)) {
                    return 1;
                }

                return null;
            })
        }).then(function(joinedTeam) {
            if (joinedTeam == 1) {
                return 1;
            }

            return _this.fetchEncodedTeamAddress(2).then(function(encodedTeamAddress) {
               return _this.client.getEncodedTeamAddressInfo(encodedTeamAddress).then(function(encodedTeamAddressInfo) {
                   let tokens = encodedTeamAddressInfo[1];

                   if (tokens.gt(0)) {
                       return 2;
                   }

                   return null;
               })
            });
        }).then(function(joinedTeam) {
            return joinedTeam;
        });
    }

    fetchJoinedTeam(): Promise<TeamInterface>
    {
        let _this = this;

        return this.messengerService.send(new MessengerContextDto('fetch_current_battle', 'GET')).then(function(response){
            return response.json().then(function(battle) {
                let joinedTeam;

                battle = new Battle(battle);

                return _this.fetchJoinedTeamIndex().then(function(joinedTeamIndex) {
                    if (joinedTeamIndex == null) {
                        // todo: what happens when no battle is joined?
                    }

                    if (joinedTeamIndex == 1) {
                        joinedTeam = TeamService.createInstance(battle.teamAlpha);
                    }

                    if (joinedTeamIndex == 2) {
                        joinedTeam = TeamService.createInstance(battle.teamBeta);
                    }

                    return joinedTeam;
                });
            });
        });
    }

    fetchPlayerHoldings(): Promise<any>
    {
        let _this = this;

        return this.fetchJoinedTeamIndex().then(function(joinedTeamIndex) {
            if (joinedTeamIndex == null) {
                return 0;
            }

            return _this.fetchEncodedTeamAddress(joinedTeamIndex).then(function(encodedTeamAddress) {
                return _this.client.getEncodedTeamAddressInfo(encodedTeamAddress).then(function(encodedTeamAddressInfo) {
                    return _this.client.contract.decimals().then(function(decimals) {
                        return UtilsService.uint256TokensToNumber(encodedTeamAddressInfo[1], decimals);
                    });
                });
            });
        });
    }


    private static getEncodedTeamAddressCacheKey(address: string, teamIndex: number) {
        return address + "_" + teamIndex;
    }
}