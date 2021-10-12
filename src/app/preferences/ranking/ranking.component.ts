import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from 'src/app/entities/preferences';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RankingComponent,
    },
  ],
})
export class RankingComponent implements ControlValueAccessor {
  items = [
    'Acting',
    'Exploring',
    'Instigating',
    'Fighting',
    'Optimizing',
    'Problem Solving',
    'Storytelling',
  ];

  onChange = (items) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  writeValue(items: Item[]): void {
    if (items && items[1]) {
      let temp = [];
      for (const item of items) {
        temp[item.value - 1] = item.name;
      }
      this.items = temp;
    }
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex && !this.touched) {
      this.touched = true;
      this.onTouched();
    }
    this.onChange(this.items);
  }
}
