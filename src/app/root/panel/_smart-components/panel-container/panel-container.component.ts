import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  Router,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RoutingAnimations } from 'src/app/animations/routing.animations';
import { RouterDataModel } from 'src/app/models/router-data.model';
import { MainMenuModel } from 'src/app/ui-modules/main-menu/models/main-menu.model';
import { NotificationService } from 'src/app/ui-modules/notification/services/notification.service';
import { PanelMenuService } from '../../services/panel-menu.service';

@Component({
  selector: 'app-panel-container',
  templateUrl: './panel-container.component.html',
  styleUrls: ['./panel-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [RoutingAnimations.slideTrigger('PanelRoutingAnimationState')],
})
export class PanelContainerComponent implements OnInit, OnDestroy {
  private readonly _subscription: Subscription = new Subscription();

  // @ts-ignore
  mainMenu$: Observable<MainMenuModel.Menu>;
  // @ts-ignore
  mobileMenuExpanded: boolean;

  userTooltipMenuVisible: boolean = false;
  // @ts-ignore
  isDesktopScreen$: Observable<boolean>;

  constructor(
    private readonly _panelMenuService: PanelMenuService,
    private readonly _router: Router,
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.mainMenu$ = this._panelMenuService.getMenu();

    // close mobile expanded menu on every navigation start
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.mobileMenuExpanded = false;
      });

    this.isDesktopScreen$ = this._breakpointObserver
      .observe('(min-width: 1240px)')
      .pipe(map((state: BreakpointState) => state?.matches));

    this._subscription.add(
      this._router.events
        .pipe(filter(event => event instanceof ActivationEnd))
        .subscribe(() => {
          this.mobileMenuExpanded = false;
          this._changeDetectorRef.detectChanges();
        }),
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  hamburgerClickHandler(): void {
    this.mobileMenuExpanded = !this.mobileMenuExpanded;
  }

  shadowClickHandler(): void {
    this.mobileMenuExpanded = false;
  }

  toggleUserTooltipMenu(): void {
    this.userTooltipMenuVisible = !this.userTooltipMenuVisible;
  }

  prepareRoute(): number | string | null {
    return RouterDataModel.getDataFromSnapshotTree(
      'panelAnimationState',
      this._activatedRoute.snapshot,
    );
  }
}
