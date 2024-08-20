import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GamePanelComponent } from './components/game-panel/game-panel.component';
import { InventoryPanelComponent } from './components/inventory-panel/inventory-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    GamePanelComponent,
    InventoryPanelComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  display = 'HOME';

  receiveDisplayChangeEvent($event: any)
  {
    console.log('AT: AppComponent::setDisplayInventory()');
    
    this.display = $event;
  }
}
