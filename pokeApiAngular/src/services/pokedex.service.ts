import { Injectable } from '@angular/core';
import Pokedex from 'pokedex-promise-v2';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  P = new Pokedex();

  getPokedex(): Pokedex{
    return this.P;
  }

  getPokemonName(): void{
    axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log('There was an ERROR: ', error);
  });
  }

  constructor() { }
}
