import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../entities/player';
import { Category, Quality } from '../entities/preferences';

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
  public quality;

  public categories: Set<Category> = new Set();

  public playerA: Player = null;
  public playerB: Player = null;

  constructor() {}

  ngOnInit(): void {
    this.title = this.quality + ' Comparison';
  }

  onSelectPlayerA(player: Player) {
    this.playerA = player;
    this.updateCategories();
  }
  onSelectPlayerB(player: Player) {
    this.playerB = player;
    this.updateCategories();
  }

  private updateCategories() {
    this.categories.clear();
    const categoryNames = new Set<string>();
    if (this.playerA) {
      this.playerA.getScale(this.quality).categories.forEach((category) => {
        categoryNames.add(category.name);
      });
    }
    if (this.playerB) {
      this.playerB.getScale(this.quality).categories.forEach((category) => {
        categoryNames.add(category.name);
      });
    }
    categoryNames.forEach((name) => {
      this.categories.add(new Category(name));
    });
  }
}
