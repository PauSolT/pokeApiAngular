import { Injectable } from '@angular/core';
import axios from 'axios';
import { PokemonData } from '../interfaces/pokemon-data';
import { NoEndOfLines } from '../Utils/Utils.js';
@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor() {}

  async getPokemonData(pokemonNameOrId: string): Promise<PokemonData> {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`
      );
      const res = response.data;
      let pokemonDescription = '';
      await getPokemonDescription(pokemonNameOrId).then(
        (description: string) => (pokemonDescription = description)
      );
      return {
        id: res.id,
        name: res.name,
        spriteUrl: res.sprites.front_default,
        types: [
          res.types[0].type.name,
          res.types.length > 1 ? res.types[1].type.name : '',
        ],
        description: pokemonDescription,
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
