export class GenrePreferences {
  public fantasy: number = 0;
  public horror: number = 0;
  public mythic: number = 0;
  public scifi: number = 0;
  public nautical: number = 0;
  public comedy: number = 0;
  public mystery: number = 0;
  public fairyTale: number = 0;
  public wuxia: number = 0;

  constructor() {}

  private getGenres(): (keyof GenrePreferences)[] {
    return Object.keys(this) as (keyof GenrePreferences)[];
  }

  public getMaxDifference(): number {
    const RANGE = 7;
    return RANGE - 1;
  }

  public getAbsoluteDifferenceSum(pref: GenrePreferences): number {
    let differenceSum = 0;

    // const genres = Object.getOwnPropertyNames(this);

    this.getGenres().forEach((genre) => {
      if (pref.hasOwnProperty(genre) && this.hasOwnProperty(genre)) {
        differenceSum += Math.abs(
          (this[genre] as number) - (pref[genre] as number)
        );
      }
    });

    // for (const genre of genres) {
    //   if (pref.hasOwnProperty(genre) && this.hasOwnProperty(genre)) {
    //     differenceSum += Math.abs(
    //       (this[genre] as number) - (pref[genre] as number)
    //     );
    //   }
    // }

    return differenceSum;
  }

  public getMaximumDifferenceSum(pref: GenrePreferences): number {
    let numberOfCategories = 0;

    const genres = Object.getOwnPropertyNames(this);

    for (const genre of genres) {
      if (pref.hasOwnProperty(genre) && this.hasOwnProperty(genre)) {
        numberOfCategories += 1;
        // console.log('Genre ' + genre);
      }
    }

    // console.log(numberOfCategories);
    const maxDifSum = numberOfCategories * this.getMaxDifference();

    return maxDifSum;
  }

  public getCompatibility(pref: GenrePreferences): number {
    const absDif = this.getAbsoluteDifferenceSum(pref);
    const maxDifSum = this.getMaximumDifferenceSum(pref);

    // console.log('Abs dif: ' + absDif);
    // console.log('Max dif: ' + maxDifSum);

    return 1 - absDif / maxDifSum;
  }
}