import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'pokemons',
    component: PokemonCardComponent,
    title: 'Pokemon list',
  },
];
export default routeConfig;
