import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player } from './entities/player';
import { AppState } from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'player-compatibility';
  public players: Player[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    // fetch('../assets/players.json')
    //   .then((response) => response.json())
    //   .then((objects: Player[]) => {
    //     // console.log(objects);
    //     objects.forEach((e) => {
    //       // console.log(e);
    //       let player = new Player(e.name);
    //       player.setGameplayAspectPreferences(
    //         Object.assign(
    //           new GameplayAspectPreferences(),
    //           e.gameplayAspectPreferences
    //         )
    //       );
    //       player.setGenrePreferences(
    //         Object.assign(new GenrePreferences(), e.genrePreferences)
    //       );
    //       this.players.push(player);
    //     });
    //     // Object.assign(players, json as Player[]);
    //     // console.log(json as Player[]);
    //     // players = json as Player[];
    //     // console.log(players);
    //     // console.log(players[0].getCompatibilityScore(players[1]));
    //     this.printTable(this.players);
    //   });
  }

  // private printTable(players: Player[]) {
  //   let table = ''.padEnd(players.length * 9, '_') + '\n';
  //   for (let i = 0; i < players.length; i++) {
  //     let row = '|';

  //     const playerA = players[i];
  //     row += playerA.name.padEnd(8) + '|';

  //     for (let j = 7; j >= 0; j--) {
  //       const playerB = players[j];
  //       const fixedCompat = Player.getCumulativeCompatibilityString(
  //         playerA,
  //         playerB
  //       );
  //       row += fixedCompat + '|';
  //     }
  //     table += row + '\n';
  //   }
  //   let finalRow = '|'.padEnd(9) + '|';
  //   for (let i = players.length - 1; i >= 0; i--) {
  //     const player = players[i];
  //     finalRow += player.name.padEnd(7) + '|';
  //   }
  //   table += finalRow;

  //   console.log(table);
  // }
}
