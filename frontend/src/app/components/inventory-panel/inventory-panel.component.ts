import { Component } from '@angular/core';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'app-inventory-panel',
  standalone: true,
  imports: [],
  templateUrl: './inventory-panel.component.html',
  styleUrl: './inventory-panel.component.css'
})
export class InventoryPanelComponent
{
  inventory = [];

  constructor(private actionService: ActionService) {}

  ngOnInit(): void
  {
    this.actionService.getInventory().subscribe((responseData) => {
      this.inventory = responseData;
      console.log(this.inventory);
    });
  }
}
