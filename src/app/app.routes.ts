import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'country/:id',
    loadComponent: () => import('./pages/detail/detail.component').then(m => m.DetailComponent)
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/world-map/world-map.component').then(m => m.WorldMapComponent)
  }
];