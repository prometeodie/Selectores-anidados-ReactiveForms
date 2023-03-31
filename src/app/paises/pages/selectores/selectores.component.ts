import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selectores',
  templateUrl: './selectores.component.html',
  styleUrls: ['./selectores.component.css']
})
export class SelectoresComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region   : ['',[Validators.required]],
    paises   : ['',[Validators.required]],
    fronteras: ['',[Validators.required]]

  })

  regiones       : string[] = [];
  paisesPorRegion: PaisSmall[] = [];
  borders        : PaisSmall[]= [];

  // UI
  cargando: boolean = false;


  constructor(private fb: FormBuilder,
    private paisesServices: PaisesService) {

}


  ngOnInit(): void {

    this.regiones = this.paisesServices.regiones;

    //cuando cambie la region

    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap(( _ ) => {
        this.miFormulario.get('paises')?.reset('');
        this.cargando = true ;
      }),
      switchMap( region => this.paisesServices.getPaisesPorRegion(region) )
    )
    .subscribe(
      paises =>{
        this.paisesPorRegion = paises;
        this.cargando = false ;}
    )

    this.miFormulario.get('paises')?.valueChanges
    .pipe(
      tap(( _ ) => {
        this.miFormulario.get('fronteras')?.reset('');
        this.cargando = true;
      }),
      switchMap(code => this.paisesServices.getPaisPorAlphaCode(code)),
      switchMap(pais => this.paisesServices.getPaisesPorBorders(pais?.borders!) )
    )
    .subscribe(paises =>{
      this.borders = paises;
      this.cargando = false;
    })

  }

  guardar(){
    console.log(this.miFormulario.value);
  }

}
