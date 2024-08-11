import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActionService } from './services/action.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // TODO: Give all of these proper types.
  locationName = "";
  locationDescription = "";
  actions: any = [];

  constructor(private actionService: ActionService) {}

  ngOnInit(): void {
    console.log("AT: AppComponent::ngOnInit()");

    // TODO: First get the state from the server, then get the currentLocationId from the state data, then request the current location data with the below function.
    this.postActionToServer("TRAVEL_PLAYERCABIN")
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
      this.locationName = responseData.currentLocation.name;
      this.locationDescription = responseData.currentLocation.description;
      this.actions = responseData.currentLocation.actions;
    });
  }
}
