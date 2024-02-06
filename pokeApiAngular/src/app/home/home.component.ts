import { Component } from '@angular/core';
import { PokemonData } from '../../interfaces/pokemon-data';
import { PokedexService } from '../../services/pokedex.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pokemonData!: PokemonData;

  constructor(private pokedexService: PokedexService) {
    this.pokedexService.getPokemonData("bulbasaur").then((pokemon: PokemonData) => {
      this.pokemonData = pokemon;
      console.log(this.pokemonData);
    });
  }
}
