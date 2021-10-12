import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from '../entities/preferences';

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
    this.control = new FormControl([
      new Item('Acting', 1),
      new Item('Exploring', 2),
      new Item('Fighting', 3),
      new Item('Instigating', 4),
      new Item('Optimizing', 5),
      new Item('Problem Solving', 6),
      new Item('Storytelling', 7),
    ]);
  }

  onSubmit() {
    console.log(this.control);
  }
}
