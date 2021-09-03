import { Component, OnInit } from '@angular/core';
import { Player } from '../entities/player';
import { Category, Quality, Ranking, Rating } from '../entities/preferences';

@Component({
  selector: 'app-compatibility',
  templateUrl: './compatibility.component.html',
  styleUrls: ['./compatibility.component.css'],
})
export class CompatibilityComponent implements OnInit {
  public players: Player[] = [];
  public qualities: Quality[] = [Quality.gameplayAspect, Quality.genre];

  constructor() {}

  ngOnInit(): void {
    fetch('../assets/players.json')
      .then((response) => response.json())
      .then((objects: UserData[]) => {
        objects.forEach((playerObject) => {
          let player = new Player(playerObject.name);
          const gameplayAspectPreferences = new Ranking(Quality.gameplayAspect);
          const genrePreferences = new Rating(Quality.genre);
          for (const category in playerObject.gameplayAspectPreferences) {
            if (
              Object.prototype.hasOwnProperty.call(
                playerObject.gameplayAspectPreferences,
                category
              )
            ) {
              const value: number =
                playerObject.gameplayAspectPreferences[category];
              const cat = new Category(category, value);
              gameplayAspectPreferences.addCategory(cat);
            }
          }
          for (const category in playerObject.genrePreferences) {
            if (
              Object.prototype.hasOwnProperty.call(
                playerObject.genrePreferences,
                category
              )
            ) {
              const value: number = playerObject.genrePreferences[category];
              const cat = new Category(category, value);
              genrePreferences.addCategory(cat);
            }
          }
          player.preferences.push(gameplayAspectPreferences);
          player.preferences.push(genrePreferences);
          this.players.push(player);
        });
      });
  }

  public getComparison(quality: Quality) {
    let comparison: (playerA: Player, playerB: Player) => number =
      Player.getCompatibilityScore.bind(null, quality);
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
