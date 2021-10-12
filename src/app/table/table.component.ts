import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../entities/player';
import { Category } from '../entities/preferences';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input()
  public players: Player[] = [];

  @Input()
  public comparison: (playerA: Player, playerB: Player) => number;

  @Input()
  public title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
