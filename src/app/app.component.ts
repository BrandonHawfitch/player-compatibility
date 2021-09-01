import { Component, OnInit } from '@angular/core';
import { GameplayAspectPreferences } from './entities/gameplayAspectPreferences';
import { GenrePreferences } from './entities/genrePreferences';
import { Player } from './entities/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'player-compatibility';

  constructor() {}

  ngOnInit() {
    let players: Array<Player> = [];
    fetch('../assets/players.json')
      .then((response) => response.json())
      .then((objects: Player[]) => {
        // console.log(objects);
        objects.forEach((e) => {
          // console.log(e);
          let player = new Player(e.name);
          player.setGameplayAspectPreferences(
            Object.assign(
              new GameplayAspectPreferences(),
              e.gameplayAspectPreferences
            )
          );
          player.setGenrePreferences(
            Object.assign(new GenrePreferences(), e.genrePreferences)
          );
          players.push(player);
        });
        // Object.assign(players, json as Player[]);
        // console.log(json as Player[]);
        // players = json as Player[];
        // console.log(players);
        // console.log(players[0].getCompatibilityScore(players[1]));
        this.printTable(players);
      });
  }

  private printTable(players: Player[]) {
    let table = ''.padEnd(players.length * 9, '_') + '\n';
    for (let i = 0; i < players.length; i++) {
      let row = '|';

      const playerA = players[i];
      row += playerA.name.padEnd(8) + '|';

      for (let j = 7; j >= 0; j--) {
        const playerB = players[j];
        const fixedCompat = (playerA.getCompatibilityScore(playerB) * 100)
          .toFixed(2)
          .padStart(7);
        row += fixedCompat + '|';
      }
      table += row + '\n';
    }
    let finalRow = '|'.padEnd(9) + '|';
    for (let i = players.length - 1; i >= 0; i--) {
      const player = players[i];
      finalRow += player.name.padEnd(7) + '|';
    }
    table += finalRow;

    console.log(table);
  }
}
