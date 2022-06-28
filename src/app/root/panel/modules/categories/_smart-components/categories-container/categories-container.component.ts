import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractListComponent} from "../../../../../../models/abstract-list-component.class";
import {ButtonModel} from "../../../../../../ui-modules/button/models/button.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../../../../ui-modules/notification/services/notification.service";
import {ApiModel} from "../../../../../../models/api.model";
import {CategoriesModel} from "../../models/categories.model";
import {CategoriesService} from "../../_services/categories.service";
import {AuthorsModel} from "../../../authors/models/authors.model";
import {AuthorsDialogComponent} from "../../../authors/_smart-components/authors-dialog/authors-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CategoriesDialogComponent} from "../categories-dialog/categories-dialog.component";

@Component({
  selector: 'app-categories-container',
  templateUrl: './categories-container.component.html',
  styleUrls: ['./categories-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesContainerComponent extends AbstractListComponent<CategoriesModel.CategoryDTO>
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
    private readonly _categoriesService: CategoriesService,
    private readonly _matDialog: MatDialog,
  ) {
    super(_activatedRoute, _router);
  }

  ngOnInit() {
    this._initDataStreams();
    super.ngOnInit();
  }

  private _initDataStreams(): void {
    this.listData$ = this._categoriesService.listData$;
    this.listDataLoading$ = this._categoriesService.listDataLoading$;
  }

  protected _fetchData(params: ApiModel.PaginationListRequestParams) {
    this._categoriesService.getList(params);
  }

  openEditionDialog(author: AuthorsModel.AuthorDTO): void {
    this._matDialog.open(CategoriesDialogComponent, {
      data: { author }
    }).afterClosed().subscribe(_ => {
      this._refetchData();
    });
  }

  openAddDialog(): void {
    this._matDialog.open(CategoriesDialogComponent).afterClosed().subscribe(_ => {
      this._refetchData();
    });;
  }

  openRemoveDialog(categoryId: number): void {
    this._categoriesService.deleteCategory(
      categoryId
    ).subscribe(_ => {
      this._refetchData();
    })
  }
}

