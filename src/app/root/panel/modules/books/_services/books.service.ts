import { Injectable } from '@angular/core';
import { AbstractListService } from '../../../../../models/abstract-list-service.class';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../../ui-modules/notification/services/notification.service';
import { ApiModel } from '../../../../../models/api.model';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, of} from "rxjs";
import {BooksModel} from "../models/books.model";

export const mock: any = {
  data: [
    {
      title: 'test title',
      isbn: '1134123413',
      authors: [
        {
          name: 'Imię autora',
          lastname: 'Nazwisko autora',
          birth_date: '09-03-2002',
          country: 'Polska'
        },
        {
          name: 'Imię autora',
          lastname: 'Nazwisko autora',
          birth_date: '09-03-2002',
          country: 'Polska'
        },
      ],
      category: 'Nazwa kategorii',
    }
  ]
};

@Injectable()
export class BooksService extends AbstractListService<
  BooksModel.BooksListDTO
  > {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _notificationService: NotificationService,
  ) {
    super();
  }

  getList(params: ApiModel.PaginationListRequestParams): void {
    this._listDataLoading$.next(true);

    this._httpClient.get('http://book-geek.test/api/books', {params})
      .pipe(
        finalize(() => this._listDataLoading$.next(false)),
      )
      .subscribe({
        next: (response: BooksModel.BooksListDTO) => {
          this._listData$.next(response);
        },
        error: () => {
          this._listData$.next(null);
        },
      });
  }

  createBook(data: any): Observable<any> {
    return this._httpClient.post(`http://book-geek.test/api/books`,data).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }

  updateBook(bookId: number, data: any): Observable<any> {
    return this._httpClient.patch(`http://book-geek.test/api/books/${bookId}`,data).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }

  deleteBook(bookId: number): Observable<any> {
    return this._httpClient.delete(`http://book-geek.test/api/books/${bookId}`).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }
}
