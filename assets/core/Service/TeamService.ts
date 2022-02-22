import {BroodOfNozdormu} from "../Model/Team/BroodOfNozdormu";
import {OrderOfTheAwakened} from "../Model/Team/OrderOfTheAwakened";
import {SilverwingSentinels} from "../Model/Team/SilverwingSentinels";
import {WarsongOutriders} from "../Model/Team/WarsongOutriders";

export class TeamService
{
    private static TEAMS = [
        new BroodOfNozdormu(),
        new OrderOfTheAwakened(),
        new SilverwingSentinels(),
        new WarsongOutriders()
    ];

    public static createInstance(slug: string): TeamInterface
    {
        let teamInstance;
        this.TEAMS.some(function (team: TeamInterface){
           if (team.getSlug() === slug) {
               teamInstance = team;
           }
        });

        return teamInstance;
    }

    choose()
    {
        return  TeamService.shuffle().slice(0, 2);
    }

    private static shuffle()
    {
        let shuffledTeams = [];
        let currentIndex = TeamService.TEAMS.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = TeamService.TEAMS[currentIndex];
            shuffledTeams[currentIndex] = TeamService.TEAMS[randomIndex];
            shuffledTeams[randomIndex] = temporaryValue;
        }

        return shuffledTeams;
    }
}