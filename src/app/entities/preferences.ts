/**
 * Any category
 */
export class Category {
  constructor(public name: string = '', public value: number = 0) {}
}

/**
 * Any system of defining a relation between categories
 */
export abstract class Scale {
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
    this.categories.forEach((catA: Category) => {
      if (catA.name === nameB) {
        return catA;
      }
    });
    return null;
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
}

export class Ranking extends Scale {
  constructor(max: number) {
    super(max);
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

  constructor(max: number) {
    super(max);
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
