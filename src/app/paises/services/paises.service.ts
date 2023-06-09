import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais, PaisSmall } from '../interfaces/paises.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _urlBase: string = 'https://restcountries.com/v3.1'
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones (){

    return [...this._regiones];

  }
  constructor( private http: HttpClient) { }

  getPaisesPorRegion(region: string) : Observable<PaisSmall[]>{
    const url: string = `${this._urlBase}/region/${region}?fields=name,cca3`;
    return this.http.get<PaisSmall[]>( url );
  }

  getPaisPorAlphaCode(code: string): Observable<Pais | null>{

    if(!code){
      return of(null);
    }
    const url: string = `https://restcountries.com/v2/alpha/${code}`;

    return this.http.get<Pais>(url);
  }

  getPaisPorAlphaCodeSmall(code: string): Observable<PaisSmall>{

    const url: string = `https://restcountries.com/v2/alpha/${code}?fields=name;alpha3Code`;

    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorBorders(borders: string[]): Observable<PaisSmall[]>{

    if (!borders){
      return of([])
    }

    const peticiones: Observable<PaisSmall>[]=[];

    borders.forEach((codigo) => {
      const peticion = this.getPaisPorAlphaCodeSmall(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);

  }
}
