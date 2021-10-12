import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Item, Ranking } from 'src/app/entities/preferences';

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
export class RankingComponent implements ControlValueAccessor, Validator {
  ranking: Ranking;

  items: Item[];

  onChange = (items) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  writeValue(items: Item[]): void {
    this.items = items;
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

  validate(control: AbstractControl): ValidationErrors | null {
    const items = control.value;

    throw new Error('Method not implemented.');
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    const modified = event.previousIndex !== event.currentIndex;
    if (modified) {
      this.onChange(this.items);
      if (!this.touched) {
        this.touched = true;
        this.onTouched();
      }
    }
  }
}
