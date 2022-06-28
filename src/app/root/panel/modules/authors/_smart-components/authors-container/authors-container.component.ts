import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractListComponent} from "../../../../../../models/abstract-list-component.class";
import {AuthorsModel} from "../../models/authors.model";
import {ButtonModel} from "../../../../../../ui-modules/button/models/button.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../../../../ui-modules/notification/services/notification.service";
import {AuthorsService} from "../../_services/authors.service";
import {ApiModel} from "../../../../../../models/api.model";
import {MatDialog} from "@angular/material/dialog";
import {AuthorsDialogComponent} from "../authors-dialog/authors-dialog.component";

@Component({
  selector: 'app-authors-container',
  templateUrl: './authors-container.component.html',
  styleUrls: ['./authors-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsContainerComponent extends AbstractListComponent<AuthorsModel.AuthorDTO>
  implements OnInit {
  readonly buttonIconEnum: typeof ButtonModel.ICON = ButtonModel.ICON;

  readonly displayedColumns: string[] = [
    'name',
    'birth_date',
    'actions',
  ];

  constructor(
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _router: Router,
    private readonly _notificationService: NotificationService,
    private readonly _authorsService: AuthorsService,
    private readonly _matDialog: MatDialog,
  ) {
    super(_activatedRoute, _router);
  }

  ngOnInit() {
    this._initDataStreams();
    super.ngOnInit();
  }

  private _initDataStreams(): void {
    this.listData$ = this._authorsService.listData$;
    this.listDataLoading$ = this._authorsService.listDataLoading$;
  }

  protected _fetchData(params: ApiModel.PaginationListRequestParams) {
    this._authorsService.getList(params);
  }

  openEditionDialog(author: AuthorsModel.AuthorDTO): void {
    this._matDialog.open(AuthorsDialogComponent, {
      data: { author }
    }).afterClosed().subscribe(_ => {
      this._refetchData();
    });
  }

  openAddDialog(): void {
    this._matDialog.open(AuthorsDialogComponent).afterClosed().subscribe(_ => {
      this._refetchData();
    });;
  }

  openRemoveDialog(authorId: number): void {
    this._authorsService.deleteAuthor(
      authorId
    ).subscribe(_ => {
      this._refetchData();
    })
  }
}
