import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PokedexService } from '../services/pokedex.service';
import { PokemonData } from '../interfaces/pokemon-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pokemonData!: PokemonData;

  constructor(private pokedexService: PokedexService) {
    this.pokedexService.getPokemonData("bulbasaur").then((pokemon: PokemonData) => {
      this.pokemonData = pokemon;
      console.log(this.pokemonData);
    });
  }
}
