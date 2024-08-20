import { Component } from '@angular/core';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'app-game-panel',
  standalone: true,
  imports: [],
  templateUrl: './game-panel.component.html',
  styleUrl: './game-panel.component.css'
})
export class GamePanelComponent
{
  // TODO: Give all of these proper types.
  locationName = "";
  locationDescription = "";
  actions: any = [];
  notifications: any = [];
  time: string = "";
  date: string = "";

  constructor(private actionService: ActionService) {}

  ngOnInit(): void
  {
    console.log("AT: AppComponent::ngOnInit()");

    // TODO: First get the state from the server, then get the currentLocationId from the state data, then request the current location data with the below function.
    // this.postActionToServer("TRAVEL_PLAYERCABIN")
    this.actionService.getGameState().subscribe((responseData) => {
      this.setState(responseData);
    });
  }

  // TODO: Give "event" (the parameter) a proper type.
  onClick(event: any)
  {
    console.log("AT: AppComponent::onClick()");
    
    this.postActionToServer(event.target.id);
  }

  postActionToServer(actionId: any)
  {
    console.log("AT: AppComponent::postActionToServer()");

    this.actionService.postAction(actionId).subscribe((responseData) => {
      this.setState(responseData);
    });
  }

  setState(gameStateData: any)
  {
    this.locationName = gameStateData.currentLocation.name;
    this.locationDescription = gameStateData.currentLocation.description;
    this.actions = gameStateData.currentLocation.actions;
    this.notifications = gameStateData.notifications;
    let dateTime = gameStateData.currentDateTime;
    this.time = dateTime.time;
    let seasonName: string = dateTime.season.charAt(0) + dateTime.season.toLowerCase().slice(1);
    this.date = `day ${dateTime.day} of month ${dateTime.monthOfSeason} of ${seasonName}, year ${dateTime.year}`;
  }
}
