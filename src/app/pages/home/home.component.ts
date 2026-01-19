import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { debounceTime, distinctUntilChanged, switchMap, catchError, of, Observable, startWith, BehaviorSubject, tap } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TuiRoot, TuiTextfield, TuiLabel, TuiLoader } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import {TuiCardLarge} from '@taiga-ui/layout';
import { TuiHint } from '@taiga-ui/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiRoot,
    RouterLink,
    TuiTextfield, 
    TuiLabel,
    TuiLoader,
    TuiBadge,
    TuiCardLarge,
    TuiHint
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private countryService = inject(CountryService);
  private timer = 500;
  readonly loading$ = new BehaviorSubject<boolean>(false);
  searchControl = new FormControl('');
  countries$: Observable<any[]> = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(this.timer),
    distinctUntilChanged(),
    tap(() => this.loading$.next(true)),
    switchMap(val => {
          if (!val || val.length < 2) {
            this.loading$.next(false);
            return of([]);
          }
          return this.countryService.searchByName(val).pipe(
            tap(() => this.loading$.next(false)),
            catchError(() => {
              this.loading$.next(false);
              return of([]);
            })
          );
        })
      );
  

  //formatting helpers
  getLanguages(languages: any): string {
    return languages ? Object.values(languages).join(', ') : 'N/A';
  }

  getCurrency(currencies: any): string {
    if (!currencies) return 'N/A';
    const firstKey = Object.keys(currencies)[0];
    return `${currencies[firstKey].name} (${currencies[firstKey].symbol})`;
}
}