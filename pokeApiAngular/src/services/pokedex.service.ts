import { Injectable } from '@angular/core';
import axios from 'axios';
import { PokemonData } from '../interfaces/pokemon-data';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor() {}

  async getPokemonData(pokemonNameOrId: string): Promise<PokemonData> {
    try {
      const response = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
      const res = response.data;
      return {
        id: res.id,
        name: res.name,
      } as PokemonData;
    } catch (error) {
      console.log('There was an ERROR: ', error);
      return await Promise.reject(error);
    }
  }
}
