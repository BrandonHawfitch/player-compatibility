import { GenrePreferences } from './genrePreferences';
import { GameplayAspectPreferences } from './gameplayAspectPreferences';

export class Player {
  public genrePreferences: GenrePreferences;
  public gameplayAspectPreferences: GameplayAspectPreferences;

  constructor(public name: string) {
    this.genrePreferences = new GenrePreferences();
    this.gameplayAspectPreferences = new GameplayAspectPreferences();
  }

  public getCompatibilityScore(player: Player): number {
    const genreCompat = this.genrePreferences.getCompatibility(
      player.genrePreferences
    );
    const aspectCompat = this.gameplayAspectPreferences.getCompatibility(
      player.gameplayAspectPreferences
    );
    // console.log('Comparing ' + this.name + ' and ' + player.name);
    // console.log('Genre Compat: ' + genreCompat);
    // console.log('Aspect Compat: ' + aspectCompat);
    const totalCompat = 0.5 * genreCompat + 0.5 * aspectCompat;
    return totalCompat;
  }

  public setGenrePreferences(pref: GenrePreferences) {
    this.genrePreferences = pref;
  }

  public setGameplayAspectPreferences(pref: GameplayAspectPreferences) {
    this.gameplayAspectPreferences = pref;
  }
}
