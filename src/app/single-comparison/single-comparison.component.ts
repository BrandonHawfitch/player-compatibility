import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../entities/player';
import { Item, Category } from '../entities/preferences';

@Component({
  selector: 'app-single-comparison',
  templateUrl: './single-comparison.component.html',
  styleUrls: ['./single-comparison.component.css'],
})
export class SingleComparisonComponent implements OnInit {
  public title = '';

  @Input()
  public players: Player[] = [];

  @Input()
  public category;

  public items: Set<Item> = new Set();

  public playerA: Player = null;
  public playerB: Player = null;

  constructor() {}

  ngOnInit(): void {
    this.title = this.category + ' Comparison';
  }

  onSelectPlayerA(player: Player) {
    this.playerA = player;
    this.updateItems();
  }
  onSelectPlayerB(player: Player) {
    this.playerB = player;
    this.updateItems();
  }

  private updateItems() {
    this.items.clear();
    const itemNames = new Set<string>();
    if (this.playerA) {
      this.playerA.getScale(this.category).items.forEach((item) => {
        itemNames.add(item.name);
      });
    }
    if (this.playerB) {
      this.playerB.getScale(this.category).items.forEach((item) => {
        itemNames.add(item.name);
      });
    }
    itemNames.forEach((name) => {
      this.items.add(new Item(name));
    });
  }
}
