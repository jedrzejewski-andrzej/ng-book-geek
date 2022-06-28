import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractListComponent} from "../../../../../../models/abstract-list-component.class";
import {ButtonModel} from "../../../../../../ui-modules/button/models/button.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../../../../ui-modules/notification/services/notification.service";
import {ApiModel} from "../../../../../../models/api.model";
import {PrizesModel} from "../../models/prizes.model";
import {PrizesService} from "../../_services/prizes.service";
import {MatDialog} from "@angular/material/dialog";
import {PrizesDialogComponent} from "../prizes-dialog/prizes-dialog.component";

@Component({
  selector: 'app-prizes-container',
  templateUrl: './prizes-container.component.html',
  styleUrls: ['./prizes-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrizesContainerComponent extends AbstractListComponent<PrizesModel.PrizeDTO>
  implements OnInit {
  readonly buttonIconEnum: typeof ButtonModel.ICON = ButtonModel.ICON;

  readonly displayedColumns: string[] = [
    'name',
    'actions',
  ];

  constructor(
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _router: Router,
    private readonly _notificationService: NotificationService,
    private readonly _prizesService: PrizesService,
    private readonly _matDialog: MatDialog,
  ) {
    super(_activatedRoute, _router);
  }

  ngOnInit() {
    this._initDataStreams();
    super.ngOnInit();
  }

  private _initDataStreams(): void {
    this.listData$ = this._prizesService.listData$;
    this.listDataLoading$ = this._prizesService.listDataLoading$;
  }

  protected _fetchData(params: ApiModel.PaginationListRequestParams) {
    this._prizesService.getList(params);
  }

  openEditionDialog(prize: PrizesModel.PrizeDTO): void {
    this._matDialog.open(PrizesDialogComponent, {
      data: { prize }
    }).afterClosed().subscribe(_ => {
      this._refetchData();
    });
  }

  openAddDialog(): void {
    this._matDialog.open(PrizesDialogComponent).afterClosed().subscribe(_ => {
      this._refetchData();
    });
  }

  openRemoveDialog(prizeId: number): void {
    this._prizesService.deletePrize(
      prizeId
    ).subscribe(_ => {
      this._refetchData();
    })
  }
}

