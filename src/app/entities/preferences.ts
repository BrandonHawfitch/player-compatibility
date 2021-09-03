/**
 * The qualities that can be used to analyze
 */
export enum Quality {
  genre = 'Genre',
  gameplayAspect = 'Gameplay Aspect',
}

/**
 * Any category
 */
export class Category {
  constructor(public name: string = '', public value: number = 0) {}
}

/**
 * Any system of defining a relation between categories
 * A specific implementation of a Scale is a set of Preferences
 */
export abstract class Scale {
  // The quality that the categories are being compared against
  public quality: Quality;
  // The individual categories that possess assigned values
  public categories: Category[] = [];

  /**
   *
   * @param max The maximum value of the scale
   * @param min The minimum value of the scale, assumed to be 1 (one)
   */
  constructor(public max: number, public min: number = 1) {}

  /**
   * Returns a difference value between two categories that is calculated in relation to the scale type
   * @param cat1
   * @param cat2
   */
  public abstract getDifference(cat1: Category, cat2: Category): number;

  public abstract getMaxDifferenceSum(scale: Scale): number;

  public getDifferenceSum(scale: Scale): number {
    let sum = 0;
    this.categories.forEach((catA: Category) => {
      const catB: Category = scale.getCategory(catA);
      if (catB) {
        sum += this.getDifference(catA, catB);
      }
    });

    return sum;
  }

  public getCompatibility(scale: Scale): number {
    return 1 - this.getDifferenceSum(scale) / this.getMaxDifferenceSum(scale);
  }

  public getCategory(catB: Category): Category {
    const nameB = catB.name;
    let catX = null;
    this.categories.forEach((catA: Category) => {
      if (catA.name === nameB) {
        catX = catA;
      }
    });
    return catX;
  }

  public getNumberOfSharedCategories(scale: Scale): number {
    let numCategories = 0;
    this.categories.forEach((catA: Category) => {
      const catB: Category = scale.getCategory(catA);
      if (catB) {
        numCategories++;
      }
    });
    return numCategories;
  }

  public addCategory(cat: Category): void {
    this.categories.push(cat);
  }
}

export class Ranking extends Scale {
  constructor(quality: Quality, max: number = 7) {
    super(max);
    this.quality = quality;
  }

  public getDifference(cat1: Category, cat2: Category): number {
    const absDif = Math.abs(cat1.value - cat2.value);
    const difRoot = Math.sqrt(absDif);
    return difRoot;
  }

  public getMaxDifferenceSum(scale: Ranking): number {
    const n = this.getNumberOfSharedCategories(scale);
    const maxDifSum = Math.sqrt(n * Math.floor(0.5 * n * n));
    return maxDifSum;
  }
}

export class Rating extends Scale {
  public get maxDifference() {
    return this.max - this.min;
  }

  constructor(quality: Quality, max: number = 7) {
    super(max);
    this.quality = quality;
  }

  public getDifference(cat1: Category, cat2: Category): number {
    const absDif = Math.abs(cat1.value - cat2.value);
    return absDif;
  }

  public getMaxDifferenceSum(scale: Rating): number {
    const n = this.getNumberOfSharedCategories(scale);
    const maxDifSum = n * this.maxDifference;
    return maxDifSum;
  }
}
