import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://restcountries.com/v3.1';

  searchByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/name/${name}`);
  }

  getByCode(code: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/alpha/${code}`);
  }
}