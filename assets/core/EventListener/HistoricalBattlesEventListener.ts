import {EventListenerInterface} from "./EventListenerInterface";
import {EventInterface} from "../Event/EventInterface";
import {HistoricalBattlesRequestedEvent} from "../Event/HistoricalBattlesRequestedEvent";
import {AbstractTemplate} from "../Template/AbstractTemplate";
import {HistoricalBattlesTemplate} from "../Template/HistoricalBattlesTemplate";
import {MessengerService} from "../Service/MessengerService";
import {MessengerContextDto} from "../Dto/MessengerContextDto";
import {TeamService} from "../Service/TeamService";

export class HistoricalBattlesEventListener implements EventListenerInterface
{
    event: EventInterface
    template: AbstractTemplate
    messengerService: MessengerService

    constructor() {
        this.event = new HistoricalBattlesRequestedEvent()
        this.template = new HistoricalBattlesTemplate()
        this.messengerService = new MessengerService()

        this.startListen();
    }

    startListen(): void {
        let _this = this;

        document.addEventListener(_this.event.getName(), function () {
            _this.messengerService.send(new MessengerContextDto('fetch_historical_battles', 'GET')).then(function(response){
                _this.messengerService.getResponse(response).then(function(historicalBattles){
                    let battles = [];

                    historicalBattles.forEach(function(battle) {
                        battle.team_alpha = TeamService.createInstance(battle.team_alpha)
                        battle.team_beta = TeamService.createInstance(battle.team_beta)
                        battle.winner = TeamService.createInstance(battle.winner)

                        battles.push(battle);
                    });

                   _this.template.render({battles: battles})
                });
            })
        });
    }
}