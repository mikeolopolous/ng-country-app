import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';

import { CountryMapper } from '../mappers/country.mapper';

import type { RESTCountry } from '../interfaces/rest-countries.interfaces';
import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://www.apicountries.com';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(CountryMapper.mapRestItemsToCountryArray),
      catchError((err) => {
        console.log('Error fetching -> searchByCapital', err);

        return throwError(() => new Error('No se obtuvieron resultados'));
      }),
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(CountryMapper.mapRestItemsToCountryArray),
      delay(2000),
      catchError((err) => {
        console.log('Error fetching -> searchByCountry', err);
        return throwError(() => new Error('No se obtuvieron resultados'));
      }),
    );
  }
}
