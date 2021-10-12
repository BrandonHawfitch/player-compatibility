import { Category, Ranking, Rating, Scale } from './preferences';

export class Player {
  public preferences: Scale[] = [];

  constructor(public name: string) {}

  public getCompatibilityScore(category: Category, playerB: Player): number {
    const scaleA = this.getScale(category);
    const scaleB = playerB.getScale(category);
    if (scaleA && scaleB) {
      return scaleA.getCompatibility(scaleB);
    }
    return null;
  }

  public static getCompatibilityScore(
    category: Category,
    playerA: Player,
    playerB: Player
  ): number {
    const scaleA = playerA.getScale(category);
    const scaleB = playerB.getScale(category);
    if (scaleA && scaleB) {
      return scaleA.getCompatibility(scaleB);
    }
    return null;
  }

  public getScale(category: Category): Scale {
    let result = null;
    this.preferences.forEach((scale: Scale) => {
      if (category === scale.category) {
        result = scale;
      }
    });
    return result;
  }

  public getCumulativeCompatibilityScore(playerB: Player): number {
    let totalCompat = 0;
    this.preferences.forEach((scale) => {
      const category = scale.category;
      const scaleA = this.getScale(category);
      const scaleB = playerB.getScale(category);
      if (scaleA && scaleB) {
        totalCompat +=
          scaleA.getCompatibility(scaleB) / this.preferences.length;
      }
    });
    return totalCompat;
  }

  public static getCumulativeCompatibilityScore(
    playerA: Player,
    playerB: Player
  ): number {
    let totalCompat = 0;
    playerA.preferences.forEach((scale) => {
      const category = scale.category;
      const scaleA = playerA.getScale(category);
      const scaleB = playerB.getScale(category);
      if (scaleA && scaleB) {
        totalCompat +=
          scaleA.getCompatibility(scaleB) / playerA.preferences.length;
      }
    });
    return totalCompat;
  }
}
