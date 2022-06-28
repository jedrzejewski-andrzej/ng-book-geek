import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractListComponent} from "../../../../../../models/abstract-list-component.class";
import {ButtonModel} from "../../../../../../ui-modules/button/models/button.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../../../../ui-modules/notification/services/notification.service";
import {ApiModel} from "../../../../../../models/api.model";
import {BooksModel} from "../../models/books.model";
import {BooksService} from "../../_services/books.service";
import {MatDialog} from "@angular/material/dialog";
import {BooksDialogComponent} from "../books-dialog/books-dialog.component";

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksContainerComponent extends AbstractListComponent<BooksModel.BookDTO>
  implements OnInit {
  readonly buttonIconEnum: typeof ButtonModel.ICON = ButtonModel.ICON;

  readonly displayedColumns: string[] = [
    'title',
    'isbn',
    'authors',
    'category',
    'actions',
  ];

  constructor(
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _router: Router,
    private readonly _notificationService: NotificationService,
    private readonly _booksService: BooksService,
    private readonly _matDialog: MatDialog,
  ) {
    super(_activatedRoute, _router);
  }

  ngOnInit() {
    this._initDataStreams();
    super.ngOnInit();
  }

  private _initDataStreams(): void {
    this.listData$ = this._booksService.listData$;
    this.listDataLoading$ = this._booksService.listDataLoading$;
  }

  protected _fetchData(params: ApiModel.PaginationListRequestParams) {
    this._booksService.getList(params);
  }

  openEditionDialog(book: BooksModel.BookDTO): void {
    this._matDialog.open(BooksDialogComponent, {
      data: { book }
    }).afterClosed().subscribe(_ => {
      this._refetchData();
    });
  }

  openAddDialog(): void {
    this._matDialog.open(BooksDialogComponent).afterClosed().subscribe(_ => {
      this._refetchData();
    });;
  }

  openRemoveDialog(bookId: number): void {
    this._booksService.deleteBook(
      bookId
    ).subscribe(_ => {
      this._refetchData();
    })
  }
}

