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

  public getDifferenceRootSum(pref: GameplayAspectPreferences): number {
    let difRootSum = 0;

    this.getAspects().forEach((aspect) => {
      if (pref.hasOwnProperty(aspect) && this.hasOwnProperty(aspect)) {
        const dif = Math.abs(
          (this[aspect] as number) - (pref[aspect] as number)
        );
        const difRoot = Math.sqrt(dif);

        difRootSum += difRoot;
      }
    });

    return difRootSum;
  }

  public getMaximumDifferenceRootSum(pref: GameplayAspectPreferences): number {
    let numberOfItems = 0;
    const aspects = Object.getOwnPropertyNames(this);
    for (const aspect of aspects) {
      if (pref.hasOwnProperty(aspect) && this.hasOwnProperty(aspect)) {
        numberOfItems += 1;
      }
    }

    const maxDifRootSum = Math.sqrt(
      numberOfItems * Math.floor(0.5 * numberOfItems * numberOfItems)
    );
    return maxDifRootSum;
  }

  public getCompatibility(pref: GameplayAspectPreferences): number {
    const difRootSum = this.getDifferenceRootSum(pref);
    const maxDifRootSum = this.getMaximumDifferenceRootSum(pref);

    return 1 - difRootSum / maxDifRootSum;
  }
}
