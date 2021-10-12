import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css'],
})
export class PreferenceComponent implements OnInit {
  @Input()
  description = 'test';

  constructor() {}

  ngOnInit(): void {}
}
