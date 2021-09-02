import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../entities/player';

@Component({
  selector: 'app-single-comparison',
  templateUrl: './single-comparison.component.html',
  styleUrls: ['./single-comparison.component.css'],
})
export class SingleComparisonComponent implements OnInit {
  @Input()
  public title = '';

  @Input()
  public players: Player[] = [];

  public playerA: Player = null;
  public playerB: Player = null;

  constructor() {}

  ngOnInit(): void {}

  onSelectPlayerA(player: Player) {
    this.playerA = player;
  }
  onSelectPlayerB(player: Player) {
    this.playerB = player;
  }
}
