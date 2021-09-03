import { Quality, Ranking, Rating, Scale } from './preferences';

export class Player {
  public preferences: Scale[] = [];

  constructor(public name: string) {}

  public getCompatibilityScore(quality: Quality, playerB: Player): number {
    const scaleA = this.getScale(quality);
    const scaleB = playerB.getScale(quality);
    if (scaleA && scaleB) {
      return scaleA.getCompatibility(scaleB);
    }
    return null;
  }

  public static getCompatibilityScore(
    quality: Quality,
    playerA: Player,
    playerB: Player
  ): number {
    const scaleA = playerA.getScale(quality);
    const scaleB = playerB.getScale(quality);
    if (scaleA && scaleB) {
      return scaleA.getCompatibility(scaleB);
    }
    return null;
  }

  public getScale(quality: Quality): Scale {
    let result = null;
    this.preferences.forEach((scale: Scale) => {
      if (quality === scale.quality) {
        result = scale;
      }
    });
    return result;
  }

  public getCumulativeCompatibilityScore(playerB: Player): number {
    let totalCompat = 0;
    this.preferences.forEach((scale) => {
      const quality = scale.quality;
      const scaleA = this.getScale(quality);
      const scaleB = playerB.getScale(quality);
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
      const quality = scale.quality;
      const scaleA = playerA.getScale(quality);
      const scaleB = playerB.getScale(quality);
      if (scaleA && scaleB) {
        totalCompat +=
          scaleA.getCompatibility(scaleB) / playerA.preferences.length;
      }
    });
    return totalCompat;
  }
}
