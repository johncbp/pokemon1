import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    pokemon: any = '';
    pokemonType = [];
    pokemonImg = '';

  constructor(private pokemonService: PokemonService, private activatedRouter: ActivatedRoute) { 
      this.activatedRouter.params.subscribe(
          params => {
            this.getPokemon(params['id']);
          }
      )
  }

  ngOnInit(): void {
  }

  getPokemon(id){
      this.pokemonService.getPokemons(id).subscribe(
          res => {
            this.pokemon = res;
            this.pokemonImg = this.pokemon.sprites.front_default;
            this.pokemonType = res.types[0].type.name;
          },
          err =>{
            console.log(err);
          }
      )
  }
}