import { Component } from '@angular/core';
import { PokemonData } from '../../interfaces/pokemon-data';
import { PokedexService } from '../../services/pokedex.service';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [NgOptimizedImage, TitleCasePipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  randomIdPokemon: number[] = [];
  randomPokemonData: PokemonData[] = [];

  constructor(private pokedexService: PokedexService) {
    for (let index = 0; index < 12; index++) {
      let randomNumber = Math.floor(Math.random() * 1017) + 1;
      while (this.randomIdPokemon.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 1017) + 1;
      }
      this.randomIdPokemon = [...this.randomIdPokemon, randomNumber];
      this.pokedexService
        .getPokemonData(randomNumber.toString())
        .then((pokemonData: PokemonData) => {
          this.randomPokemonData = [...this.randomPokemonData, pokemonData];
        });
    }
  }
  
}
