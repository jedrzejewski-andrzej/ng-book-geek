export namespace MainMenuModel {

  export enum ICON {
    TILES = 'TILES',
    CUP = 'CUP',
    TAG = 'TAG',
    CART = 'CART',
    PEOPLE = 'PEOPLE',
    BOOK = 'BOOK',
  }

  export interface SubItem {
    name: string;
    path: string;
  }

  export interface MainItem {
    name: string;
    icon: ICON;
    path?: string;
    children?: SubItem[];
    expanded?: boolean;
  }

  export type Menu = MainItem[];
}
