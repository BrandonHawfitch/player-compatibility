/**
 * The categories that can be used to analyze
 */
export enum Category {
  genre = 'Genre',
  gameplayAspect = 'Gameplay Aspect',
}

/**
 * Any scale item; anything that can possess a meaningful value on a scale
 */
export class Item {
  constructor(public name: string = '', public value: number = 0) {}
}

/**
 * Any system of defining a relation between items
 * A specific implementation of a Scale is a set of Preferences
 */
export abstract class Scale {
  // The category that the items belong to
  public category: Category;
  // The individual items that possess assigned values
  public items: Item[] = [];

  /**
   *
   * @param max The maximum value of the scale
   * @param min The minimum value of the scale, assumed to be 1 (one)
   */
  constructor(public max: number, public min: number = 1) {}

  /**
   * Returns a difference value between two items that is calculated in relation to the scale type
   * @param cat1
   * @param cat2
   */
  public abstract getDifference(cat1: Item, cat2: Item): number;

  public abstract getMaxDifferenceSum(scale: Scale): number;

  public getDifferenceSum(scale: Scale): number {
    let sum = 0;
    this.items.forEach((catA: Item) => {
      const catB: Item = scale.getItem(catA);
      if (catB) {
        sum += this.getDifference(catA, catB);
      }
    });

    return sum;
  }

  public getCompatibility(scale: Scale): number {
    return 1 - this.getDifferenceSum(scale) / this.getMaxDifferenceSum(scale);
  }

  public getItem(catB: Item): Item {
    const nameB = catB.name;
    let catX = null;
    this.items.forEach((catA: Item) => {
      if (catA.name === nameB) {
        catX = catA;
      }
    });
    return catX;
  }

  public getNumberOfSharedItems(scale: Scale): number {
    let numItems = 0;
    this.items.forEach((catA: Item) => {
      const catB: Item = scale.getItem(catA);
      if (catB) {
        numItems++;
      }
    });
    return numItems;
  }

  public addItem(cat: Item): void {
    this.items.push(cat);
  }
}

export class Ranking extends Scale {
  constructor(category: Category, max: number = 7) {
    super(max);
    this.category = category;
  }

  public getDifference(cat1: Item, cat2: Item): number {
    const absDif = Math.abs(cat1.value - cat2.value);
    const difRoot = Math.sqrt(absDif);
    return difRoot;
  }

  public getMaxDifferenceSum(scale: Ranking): number {
    const n = this.getNumberOfSharedItems(scale);
    const maxDifSum = Math.sqrt(n * Math.floor(0.5 * n * n));
    return maxDifSum;
  }
}

export class Rating extends Scale {
  public get maxDifference() {
    return this.max - this.min;
  }

  constructor(category: Category, max: number = 7) {
    super(max);
    this.category = category;
  }

  public getDifference(cat1: Item, cat2: Item): number {
    const absDif = Math.abs(cat1.value - cat2.value);
    return absDif;
  }

  public getMaxDifferenceSum(scale: Rating): number {
    const n = this.getNumberOfSharedItems(scale);
    const maxDifSum = n * this.maxDifference;
    return maxDifSum;
  }
}
