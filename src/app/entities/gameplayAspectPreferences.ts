export class GameplayAspectPreferences {
  public acting: number = 0;
  public exploring: number = 0;
  public instigating: number = 0;
  public fighting: number = 0;
  public optimizing: number = 0;
  public problemSolving: number = 0;
  public storytelling: number = 0;

  constructor() {}

  private getAspects(): (keyof GameplayAspectPreferences)[] {
    return Object.keys(this) as (keyof GameplayAspectPreferences)[];
  }

  // private getValue(key: string): number {
  //   if (this.hasOwnProperty(key)) {
  //     return this[key as keyof this];
  //   }
  // }

  public getDifferenceRootSum(pref: GameplayAspectPreferences): number {
    let difRootSum = 0;

    // const aspects = Object.getOwnPropertyNames(this);

    this.getAspects().forEach((aspect) => {
      if (pref.hasOwnProperty(aspect) && this.hasOwnProperty(aspect)) {
        const dif = Math.abs(
          (this[aspect] as number) - (pref[aspect] as number)
        );
        const difRoot = Math.sqrt(dif);

        difRootSum += difRoot;
      }
    });

    // for (const aspect of this.getAspects()) {
    //   if (pref.hasOwnProperty(aspect) && this.hasOwnProperty(aspect)) {
    //     const dif = Math.abs(this[aspect] - pref[aspect]);
    //     const difRoot = Math.sqrt(dif);

    //     difRootSum += difRoot;
    //   }
    // }

    // for (const aspect of aspects) {
    //   if (pref.hasOwnProperty(aspect) && this.hasOwnProperty(aspect)) {
    //     const dif = Math.abs(this[aspect] - pref[aspect]);
    //     const difRoot = Math.sqrt(dif);

    //     difRootSum += difRoot;
    //   }
    // }

    return difRootSum;
  }

  public getMaximumDifferenceRootSum(pref: GameplayAspectPreferences): number {
    let numberOfCategories = 0;
    const aspects = Object.getOwnPropertyNames(this);
    for (const aspect of aspects) {
      if (pref.hasOwnProperty(aspect) && this.hasOwnProperty(aspect)) {
        numberOfCategories += 1;
      }
    }
    // console.log('Number of categories: ' + numberOfCategories);

    const maxDifRootSum = Math.sqrt(
      numberOfCategories *
        Math.floor(0.5 * numberOfCategories * numberOfCategories)
    );
    return maxDifRootSum;
  }

  public getCompatibility(pref: GameplayAspectPreferences): number {
    const difRootSum = this.getDifferenceRootSum(pref);
    const maxDifRootSum = this.getMaximumDifferenceRootSum(pref);

    // console.log('Dif root sum: ' + difRootSum);
    // console.log('Max dif root sum: ' + maxDifRootSum);

    return 1 - difRootSum / maxDifRootSum;
  }
}
