import { Component, Input, OnInit } from '@angular/core';
import { GameplayAspectPreferences } from '../entities/gameplayAspectPreferences';
import { GenrePreferences } from '../entities/genrePreferences';
import { Player } from '../entities/player';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input()
  public players: Player[] = [];

  @Input()
  public comparison: (playerA: Player, playerB: Player) => string;

  @Input()
  public title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
