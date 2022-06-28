import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuAnimations } from '../../animations/menu.animation';
import { MainMenuModel } from '../../models/main-menu.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [MenuAnimations.expandable],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private readonly _subscription: Subscription = new Subscription();
  // @ts-ignore
  @Input() menu: MainMenuModel.Menu;

  constructor(
    private readonly _router: Router,
    private readonly _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._subscription.add(
      this._router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this._collapseOtherNonActiveElements();
          this._changeDetectorRef.detectChanges();
        }),
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  toggleExpansion(index: number): void {
    if (this.menu[index]) {
      if (
        this.menu[index].path &&
        this._router.isActive(this.menu[index].path as string, false)
      ) {
        // if we click on element that matches activated route we do not collapse it. It should stay activated
        return;
      }

      // toggle expansion state
      this.menu[index].expanded = !this.menu[index].expanded;
    }

    // close other expanded elements
    this._collapseOtherNonActiveElements(index);
  }

  isActive(index: number): boolean {
    const item: MainMenuModel.MainItem | undefined = this.menu[index];

    if (item) {
      if (item.children) {
        // if item has children it is active when it is expanded or when its path matches activated route
        return (
          !!item.expanded ||
          (item.path ? this._router.isActive(item.path, false) : false)
        );
      }

      if (item.path) {
        return this._router.isActive(item.path, false);
      }
    }

    return false;
  }

  private _collapseOtherNonActiveElements(itemIndex?: number): void {
    // collapse all expanded elements but clicked one and these that matches activated route
    (this.menu ?? []).forEach(
      (menuItem: MainMenuModel.MainItem, index: number) => {
        if (index === itemIndex) {
          return;
        }

        if (menuItem.path && !this._router.isActive(menuItem.path, false)) {
          menuItem.expanded = false;
        }
      },
    );
  }
}
