import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category, Item, Ranking } from '../entities/preferences';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
})
export class PreferencesComponent implements OnInit {
  preferencesForm: FormGroup;

  control: FormControl;

  constructor() {}

  ngOnInit(): void {
    let ranking = new Ranking(Category.gameplayAspect, 7);
    ranking.addItem(new Item('Acting', 1));
    ranking.addItem(new Item('Exploring', 2));
    ranking.addItem(new Item('Fighting', 3));
    ranking.addItem(new Item('Instigating', 4));
    ranking.addItem(new Item('Optimizing', 5));
    ranking.addItem(new Item('Problem Solving', 6));
    ranking.addItem(new Item('Storytelling', 7));

    this.control = new FormControl(ranking);
  }

  onSubmit() {
    console.log(this.control);
  }
}
