import { Injectable } from '@angular/core';
import { AbstractListService } from '../../../../../models/abstract-list-service.class';
import { AuthorsModel } from '../models/authors.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../../ui-modules/notification/services/notification.service';
import { ApiModel } from '../../../../../models/api.model';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, throwError} from "rxjs";

@Injectable()
export class AuthorsService extends AbstractListService<
  AuthorsModel.AuthorsListDTO
  > {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _notificationService: NotificationService,
  ) {
    super();
  }

  getList(params: ApiModel.PaginationListRequestParams): void {
    this._listDataLoading$.next(true);

    this._httpClient.get('http://book-geek.test/api/authors', {params})
      .pipe(
        finalize(() => this._listDataLoading$.next(false)),
      )
      .subscribe({
        next: (response: AuthorsModel.AuthorsListDTO) => {
          this._listData$.next(response);
        },
        error: () => {
          this._listData$.next(null);
        },
      });
  }

  createAuthor(data: any): Observable<any> {
    return this._httpClient.post(`http://book-geek.test/api/authors`,data).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }

  updateAuthor(authorId: number, data: any): Observable<any> {
    return this._httpClient.patch(`http://book-geek.test/api/authors/${authorId}`,data).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }

  deleteAuthor(authorId: number): Observable<any> {
    return this._httpClient.delete(`http://book-geek.test/api/authors/${authorId}`).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }
}
