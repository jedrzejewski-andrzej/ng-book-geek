import { Injectable } from '@angular/core';
import { AbstractListService } from '../../../../../models/abstract-list-service.class';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../../ui-modules/notification/services/notification.service';
import { ApiModel } from '../../../../../models/api.model';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, of, throwError} from "rxjs";
import {CategoriesModel} from "../models/categories.model";

export const mock: any = {
  data: [
    {
      id: 1,
      name: 'testowa kategoria'
    }
  ]
};

@Injectable()
export class CategoriesService extends AbstractListService<
  CategoriesModel.CategoriesListDTO
  > {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _notificationService: NotificationService,
  ) {
    super();
  }

  getList(params: ApiModel.PaginationListRequestParams): void {
    this._listDataLoading$.next(true);

    this._httpClient.get('http://book-geek.test/api/categories', {params})
      .pipe(
        finalize(() => this._listDataLoading$.next(false)),
      )
      .subscribe({
        next: (response: CategoriesModel.CategoriesListDTO) => {
          this._listData$.next(response);
        },
        error: () => {
          this._listData$.next(null);
        },
      });
  }

  createCategory(data: any): Observable<any> {
    return this._httpClient.post(`http://book-geek.test/api/categories`,data).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }

  updateCategory(categoryId: number, data: any): Observable<any> {
    return this._httpClient.patch(`http://book-geek.test/api/categories/${categoryId}`,data).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this._httpClient.delete(`http://book-geek.test/api/categories/${categoryId}`).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }
}
