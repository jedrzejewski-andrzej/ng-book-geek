import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainMenuModel } from 'src/app/ui-modules/main-menu/models/main-menu.model';

@Injectable()
export class PanelMenuService {
  getMenu(): Observable<MainMenuModel.Menu> {
    return of([
      {
        name: 'Dashboard',
        icon: MainMenuModel.ICON.TILES,
        path: '/panel/dashboard',
      },
      {
        name: 'Książki',
        icon: MainMenuModel.ICON.BOOK,
        path: '/panel/books',
      },
      {
        name: 'Kategorie',
        icon: MainMenuModel.ICON.TAG,
        path: '/panel/categories',
      },
      {
        name: 'Autorzy',
        icon: MainMenuModel.ICON.PEOPLE,
        path: '/panel/authors',
      },
      {
        name: 'Nagrody',
        icon: MainMenuModel.ICON.CUP,
        path: '/panel/prizes',
      }
    ]);
  }
}
