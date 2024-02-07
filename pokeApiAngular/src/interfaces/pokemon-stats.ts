import { PokemonStat } from "./pokemon-stat";

export interface PokemonStats {
  attack: PokemonStat;
  specialAttack: PokemonStat;
  defense: PokemonStat;
  specialDefense: PokemonStat;
  hp: PokemonStat;
  speed: PokemonStat;
}
