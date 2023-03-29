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
  borders        : string[] | null = [];


  constructor(private fb: FormBuilder,
    private paisesServices: PaisesService) {

}


  ngOnInit(): void {

    this.regiones = this.paisesServices.regiones;

    //cuando cambie la region

    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap(( _ ) => this.miFormulario.get('paises')?.reset('')),
      switchMap( region => this.paisesServices.getPaisesPorRegion(region) )
    )
    .subscribe(
      paises => this.paisesPorRegion = paises
    )

    this.miFormulario.get('paises')?.valueChanges
    .pipe(
      switchMap(code => this.paisesServices.getPaisPorAlphaCode(code))
    )
    .subscribe(pais =>this.borders = pais?.borders || [])

  }


  guardar(){
    console.log(this.miFormulario.value);
  }

}
