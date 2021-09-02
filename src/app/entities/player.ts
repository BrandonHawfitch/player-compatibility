import { GenrePreferences } from './genrePreferences';
import { GameplayAspectPreferences } from './gameplayAspectPreferences';

export class Player {
  public genrePreferences: GenrePreferences;
  public gameplayAspectPreferences: GameplayAspectPreferences;

  constructor(public name: string) {
    this.genrePreferences = new GenrePreferences();
    this.gameplayAspectPreferences = new GameplayAspectPreferences();
  }

  public static getGenreCompatibilityScore(
    playerA: Player,
    playerB: Player
  ): number {
    const genreCompat = playerA.genrePreferences.getCompatibility(
      playerB.genrePreferences
    );
    return genreCompat;
  }

  public static getGameplayAspectCompatibilityScore(
    playerA: Player,
    playerB: Player
  ): number {
    const aspectCompat = playerA.gameplayAspectPreferences.getCompatibility(
      playerB.gameplayAspectPreferences
    );
    return aspectCompat;
  }

  public static getCumulativeCompatibilityScore(
    playerA: Player,
    playerB: Player
  ): number {
    const genreCompat = Player.getGenreCompatibilityScore(playerA, playerB);
    const aspectCompat = Player.getGameplayAspectCompatibilityScore(
      playerA,
      playerB
    );
    const totalCompat = 0.5 * genreCompat + 0.5 * aspectCompat;
    return totalCompat;
  }

  public static getGenreCompatibilityString(
    playerA: Player,
    playerB: Player
  ): string {
    const genreCompat = Player.getGenreCompatibilityScore(playerA, playerB);
    return (genreCompat * 100).toFixed(2).padStart(7) + '%';
  }

  public static getGameplayAspectCompatibilityString(
    playerA: Player,
    playerB: Player
  ): string {
    const aspectCompat = Player.getGameplayAspectCompatibilityScore(
      playerA,
      playerB
    );
    return (aspectCompat * 100).toFixed(2).padStart(7) + '%';
  }

  public static getCumulativeCompatibilityString(
    playerA: Player,
    playerB: Player
  ): string {
    const totalCompat = Player.getCumulativeCompatibilityScore(
      playerA,
      playerB
    );
    return (totalCompat * 100).toFixed(2).padStart(7) + '%';
  }

  public setGenrePreferences(pref: GenrePreferences) {
    this.genrePreferences = pref;
  }

  public setGameplayAspectPreferences(pref: GameplayAspectPreferences) {
    this.gameplayAspectPreferences = pref;
  }
}
