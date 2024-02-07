import { Injectable } from '@angular/core';
import axios from 'axios';
import { PokemonData } from '../interfaces/pokemon-data';
import { NoEndOfLines } from '../Utils/Utils.js';
import { PokemonStats } from '../interfaces/pokemon-stats';
import { PokemonStat } from '../interfaces/pokemon-stat';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor() { }

  async getPokemonData(pokemonNameOrId: string): Promise<PokemonData> {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`
      );
      const res = response.data;
      let pokemonDescription = '';
      let pokemonStats!: PokemonStats;
      await getPokemonDescription(pokemonNameOrId).then(
        (description: string) => (pokemonDescription = description)
      );
      console.log(res.stats);
      let pokemonStat: PokemonStat[] = [];

      res.stats.map((stat: any) => {
        pokemonStat.push({
          name: stat.stat.name,
          value: stat.base_stat,
          effort: stat.effort
        })
      });

      pokemonStats = {
        hp: pokemonStat[0],
        attack: pokemonStat[1],
        defense: pokemonStat[2],
        specialAttack: pokemonStat[3],
        specialDefense: pokemonStat[4],
        speed: pokemonStat[5],
      }

      // pokemonStats.hp = res.stats[0].base_stat;
      // pokemonStats.attack = res.stats[1].base_stat;
      // pokemonStats.defense = res.stats[2].base_stat;
      // pokemonStats.specialAttack = res.stats[3].base_stat;
      // pokemonStats.specialDefense = res.stats[4].base_stat;
      // pokemonStats.speed = res.stats[5].base_stat;
      return {
        id: res.id,
        name: res.name,
        spriteUrl: res.sprites.front_default,
        types: [
          res.types[0].type.name,
          res.types.length > 1 ? res.types[1].type.name : '',
        ],
        description: pokemonDescription,
        stats: pokemonStats
        // hp: res.stats[0].base_stat,
        // attack: res.stats[1].base_stat,
        // defense: res.stats[2].base_stat,
        // specialAttack: res.stats[3].base_stat,
        // specialDefense: res.stats[4].base_stat,
        // speed: res.stats[5].base_stat,
      } as PokemonData;

    } catch (error) {
      console.log('There was an ERROR: ', error);
      return await Promise.reject(error);
    }
  }
}

async function getPokemonDescription(
  pokemonNameOrId: string,
  language: string = 'en'
): Promise<string> {
  try {
    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonNameOrId}`
    );

    const descriptions = speciesResponse.data.flavor_text_entries.filter(
      (entry: any) => entry.language.name === language
    );
    if (descriptions.length > 0) {
      return NoEndOfLines(descriptions[0].flavor_text);
    } else {
      return 'Description not available in the specified language.';
    }
  } catch (error) {
    console.error('Error fetching Pokémon description:', error);
    throw error;
  }
}
