import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, switchMap, Observable } from 'rxjs';
import { TuiRoot, TuiLink, TuiTitle, TuiButton } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink,
    TuiRoot, 
    TuiLink, 
    TuiTitle, 
    TuiBadge, 
    TuiCardLarge, 
    TuiButton
],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  country$: Observable<any> = this.route.params.pipe(
    map(params => params['id']),
    switchMap(id => this.http.get<any[]>(`https://restcountries.com/v3.1/alpha/${id}`)),
    map(res => res[0]) 
  );

  //formatting helpers
  getValues(obj: any): string {
    return obj ? Object.values(obj).join(', ') : 'N/A';
  }

  getCurrencies(obj: any): string {
    return obj ? Object.values(obj).map((c: any) => `${c.name} (${c.symbol})`).join(', ') : 'N/A';
  }
}