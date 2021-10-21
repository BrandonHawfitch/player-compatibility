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
  public description: string = '';

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
   * @param item1
   * @param item2
   */
  public abstract getDifference(item1: Item, item2: Item): number;

  public abstract getMaxDifferenceSum(scale: Scale): number;

  public getDifferenceSum(scale: Scale): number {
    let sum = 0;
    this.items.forEach((itemA: Item) => {
      const itemB: Item = scale.getItem(itemA);
      if (itemB) {
        sum += this.getDifference(itemA, itemB);
      }
    });

    return sum;
  }

  public getCompatibility(scale: Scale): number {
    return 1 - this.getDifferenceSum(scale) / this.getMaxDifferenceSum(scale);
  }

  public getItem(itemB: Item): Item {
    const nameB = itemB.name;
    let itemX = null;
    this.items.forEach((itemA: Item) => {
      if (itemA.name === nameB) {
        itemX = itemA;
      }
    });
    return itemX;
  }

  /**
   * Returns the number of items that are shared between this scale and another
   * @param scale The scale being compared against this scale
   * @returns number of items that are shared
   */
  public getNumberOfSharedItems(scale: Scale): number {
    let numItems = 0;
    this.items.forEach((itemA: Item) => {
      const itemB: Item = scale.getItem(itemA);
      if (itemB) {
        numItems++;
      }
    });
    return numItems;
  }

  public addItem(item: Item): void {
    this.items.push(item);
  }
}

export class Ranking extends Scale {
  constructor(category: Category, max: number = 7) {
    super(max);
    this.category = category;
  }

  public getDifference(item1: Item, item2: Item): number {
    const absDif = Math.abs(item1.value - item2.value);
    const difRoot = Math.sqrt(absDif);
    return difRoot;
  }

  public getMaxDifferenceSum(scale: Ranking): number {
    const n = this.getNumberOfSharedItems(scale);
    const maxDifSum = Math.sqrt(n * Math.floor(0.5 * n * n));
    return maxDifSum;
  }

  public addItem(item: Item): void {
    super.addItem(item);
    this.updateOrder();
  }

  /**
   * Modifies the value of each item within the ranking to reflect its place in the array
   */
  public updateValues(): void {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      item.value = i + 1;
    }
  }

  /**
   * Modifies the position of each item within the ranking to reflect its value
   */
  public updateOrder(): void {
    const temp = [];
    for (const item of this.items) {
      if (item) {
        temp[item.value - 1] = item;
      }
    }
    this.items = temp;
  }
}

export class Rating extends Scale {
  public get maxDifference() {
    return this.max - this.min;
  }

  constructor(category: Category, max: number = 7, min: number = 1) {
    super(max, min);
    this.category = category;
  }

  public getDifference(item1: Item, item2: Item): number {
    const absDif = Math.abs(item1.value - item2.value);
    return absDif;
  }

  public getMaxDifferenceSum(scale: Rating): number {
    const n = this.getNumberOfSharedItems(scale);
    const maxDifSum = n * this.maxDifference;
    return maxDifSum;
  }
}

export class Binary extends Scale {
  constructor(category: Category) {
    super(1, 0);
    this.category = category;
  }

  public getDifference(item1: Item, item2: Item): number {
    return Math.abs(item1.value - item2.value);
  }

  public getMaxDifferenceSum(scale: Scale): number {
    return this.getNumberOfSharedItems(scale);
  }
}
