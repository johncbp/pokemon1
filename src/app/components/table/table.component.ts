import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'image','name'] ;
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(private pokeService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getPokemos();
  }

  getPokemos(){
    let pokemonData;

    for(let i = 1; i <= 1000; i++){

      this.pokeService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;          
        },
        err=>{
          console.log(err);
        }
      );
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
    getRow(row){
       this.router.navigateByUrl(`pokeDetail/${row.position}`);
    }  
}