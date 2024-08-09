import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  locationName = "";
  locationDescription = "";

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    let locationData = undefined;
    this.locationService.getLocation().subscribe((data) => {
      locationData = data;
      console.log(locationData);
      this.locationName = data.name;
      this.locationDescription = data.description;
    });
  }
}
