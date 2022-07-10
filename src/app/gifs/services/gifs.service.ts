import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { SearchGifsResponse, Gif } from '../../interfaces/inetrface';

export const API_KEY = environment.apiKey
export const ENDPOINT = environment.enpointGiphy

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  private _historial: string[] = []
  public resultados: Gif[] = []
  constructor(
    private http: HttpClient
  ) {
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || []
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || []
  }

  get historial() {
    return [...this._historial]
  }

  public hacerQuery( termino: string ): Observable<SearchGifsResponse> {
    const params = new HttpParams()
      .set('api_key', API_KEY)
      .set('q', termino)
      .set('limit', '10')
    return this.http.get<SearchGifsResponse>(`${ENDPOINT}`, { params });
  }

  buscarGifs( query: string = '' ) 
  {
    query = query.trim().toLowerCase()
    const hayElemento = this._historial.includes(query)
    if (!hayElemento) {
      this._historial.unshift( query )
      this._historial = this._historial.splice(0, 9)
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    this.hacerQuery(query).subscribe(( resp ) => {
      this.resultados = resp.data
      localStorage.setItem('resultados', JSON.stringify(resp.data))
    })
  }
}
