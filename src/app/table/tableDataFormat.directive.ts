import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[tableDataFormat]',
})
export class TableDataFormatDirective {
  private minColor: Color = new Color(230, 126, 115);
  private midColor: Color = new Color(255, 255, 255);
  private maxColor: Color = new Color(87, 187, 138);

  @Input()
  set tableDataFormat(percent: number) {
    const percentString = (percent * 100).toFixed(2).padStart(7) + '%';
    this.element.nativeElement.innerText = percentString;
    console.log(this.element.nativeElement.style);
    let color = this.midColor;
    if (percent < 0.5) {
      color = this.minColor.getGradient(this.midColor, percent * 2);
    } else if (percent > 0.5) {
      color = this.midColor.getGradient(this.maxColor, (percent - 0.5) * 2);
    }
    this.element.nativeElement.style.backgroundColor = color;
  }

  constructor(public element: ElementRef) {}
}

class Color {
  constructor(public r: number, public g: number, public b: number) {}

  public toString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  /**
   *
   * @param colorB The color this is transforming into
   * @param percent The percentage of its transformation
   */
  public getGradient(colorB: Color, percent: number): Color {
    const rDif = colorB.r - this.r;
    const gDif = colorB.g - this.g;
    const bDif = colorB.b - this.b;

    const rDifScaled = rDif * percent;
    const gDifScaled = gDif * percent;
    const bDifScaled = bDif * percent;

    const r = this.r + rDifScaled;
    const g = this.g + gDifScaled;
    const b = this.b + bDifScaled;

    return new Color(r, g, b);
  }
}
