import { PokemonStats } from "./pokemon-stats";

export interface PokemonData {
    id: number;
    name: string;
    spriteUrl: string;
    types: string[];
    description: string;
    stats: PokemonStats;
}
