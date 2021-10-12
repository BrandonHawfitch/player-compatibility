import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent {
  fields = [
    'Acting',
    'Exploring',
    'Instigating',
    'Fighting',
    'Optimizing',
    'Problem Solving',
    'Storytelling',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    console.log(this.fields);
  }
}
