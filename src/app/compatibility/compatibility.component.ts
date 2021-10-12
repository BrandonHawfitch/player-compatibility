import { Component, OnInit } from '@angular/core';
import { Player } from '../entities/player';
import { Item, Category, Ranking, Rating } from '../entities/preferences';

@Component({
  selector: 'app-compatibility',
  templateUrl: './compatibility.component.html',
  styleUrls: ['./compatibility.component.css'],
})
export class CompatibilityComponent implements OnInit {
  public players: Player[] = [];
  public categories: Category[] = [Category.gameplayAspect, Category.genre];

  constructor() {}

  ngOnInit(): void {
    fetch('../assets/players.json')
      .then((response) => response.json())
      .then((objects: UserData[]) => {
        objects.forEach((playerObject) => {
          let player = new Player(playerObject.name);
          const gameplayAspectPreferences = new Ranking(
            Category.gameplayAspect
          );
          const genrePreferences = new Rating(Category.genre);
          for (const item in playerObject.gameplayAspectPreferences) {
            if (
              Object.prototype.hasOwnProperty.call(
                playerObject.gameplayAspectPreferences,
                item
              )
            ) {
              const value: number =
                playerObject.gameplayAspectPreferences[item];
              const cat = new Item(item, value);
              gameplayAspectPreferences.addItem(cat);
            }
          }
          for (const item in playerObject.genrePreferences) {
            if (
              Object.prototype.hasOwnProperty.call(
                playerObject.genrePreferences,
                item
              )
            ) {
              const value: number = playerObject.genrePreferences[item];
              const cat = new Item(item, value);
              genrePreferences.addItem(cat);
            }
          }
          player.preferences.push(gameplayAspectPreferences);
          player.preferences.push(genrePreferences);
          this.players.push(player);
        });
      });
  }

  public getComparison(category: Category) {
    let comparison: (playerA: Player, playerB: Player) => number =
      Player.getCompatibilityScore.bind(null, category);
    return comparison;
  }

  public getCumulativeComparison() {
    return Player.getCumulativeCompatibilityScore;
  }

  public onCellSelect(players: { playerA: Player; playerB: Player }) {}
}

interface UserData {
  name: string;
  genrePreferences: number[];
  gameplayAspectPreferences: number[];
}
