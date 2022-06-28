import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import {NotificationService} from "../../../../../ui-modules/notification/services/notification.service";
import {CategoriesModel} from "../../categories/models/categories.model";
import {AuthorsModel} from "../../authors/models/authors.model";
import {FormModel} from "../../../../../utility-modules/forms/models/form.model";


@Injectable()
export class BooksFilterService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _notificationService: NotificationService,
  ) {}

  getCategoriesOptions(): Observable<FormModel.Option[]> {
    return this._httpClient
      .get<unknown>('http://book-geek.test/api/categories', {
        params: {
          page: `1`,
          limit: Number.MAX_SAFE_INTEGER.toString(),
        },
      })
      .pipe(
        catchError(this._errorHandler.bind(this)),
        map((response: CategoriesModel.CategoriesListDTO) =>
          response.data.map(category => ({
            value: category.id,
            name: category.name,
          })),
        ),
        share(),
      );
  }

  getAuthorsOptions(): Observable<FormModel.Option[]> {
    return this._httpClient
      .get<unknown>('http://book-geek.test/api/authors', {
        params: {
          page: `1`,
          limit: Number.MAX_SAFE_INTEGER.toString(),
        },
      })
      .pipe(
        catchError(this._errorHandler.bind(this)),
        map((response: AuthorsModel.AuthorsListDTO) =>
          response.data.map(author => ({
            value: author.id,
            name: author.name + ' ' + author.lastname,
          })),
        ),
        share(),
      );
  }

  private _errorHandler(error: any): Observable<never> {
    return throwError(error);
  }
}
