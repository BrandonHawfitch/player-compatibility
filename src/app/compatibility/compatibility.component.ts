import { Component, OnInit } from '@angular/core';
import { GameplayAspectPreferences } from '../entities/gameplayAspectPreferences';
import { GenrePreferences } from '../entities/genrePreferences';
import { Player } from '../entities/player';

@Component({
  selector: 'app-compatibility',
  templateUrl: './compatibility.component.html',
  styleUrls: ['./compatibility.component.css'],
})
export class CompatibilityComponent implements OnInit {
  public players: Player[] = [];

  constructor() {}

  ngOnInit(): void {
    fetch('../assets/players.json')
      .then((response) => response.json())
      .then((objects: Player[]) => {
        objects.forEach((playerObject) => {
          let player = new Player(playerObject.name);
          player.setGameplayAspectPreferences(
            Object.assign(
              new GameplayAspectPreferences(),
              playerObject.gameplayAspectPreferences
            )
          );
          player.setGenrePreferences(
            Object.assign(new GenrePreferences(), playerObject.genrePreferences)
          );
          this.players.push(player);
        });
      });
  }

  get genreComparisonString() {
    return Player.getGenreCompatibilityString;
  }

  get gameplayAspectComparisonString() {
    return Player.getGameplayAspectCompatibilityString;
  }

  get cumulativeComparisonString() {
    return Player.getCumulativeCompatibilityString;
  }
}
