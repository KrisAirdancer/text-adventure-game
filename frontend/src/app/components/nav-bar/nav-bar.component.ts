import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent
{
  // TODO: May be able to consolidate all of these down to enums. Ex. "INVENTORY" or "HOME"
  @Output() displayChangeEvent = new EventEmitter<string>();

  handleHomeClick(event: any)
  {
    console.log("AT: NavBarComponent::handleHomeClick()");

    this.displayChangeEvent.emit('HOME');
  }
  
  // TODO: Give "event" (the parameter) a proper type.
  handleInventoryClick(event: any)
  {
    console.log("AT: NavBarComponent::handleInventoryClick()");

    this.displayChangeEvent.emit('INVENTORY');
  }
}
