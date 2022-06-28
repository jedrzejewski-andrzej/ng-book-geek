import { Injectable } from '@angular/core';
import { AbstractListService } from '../../../../../models/abstract-list-service.class';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../../ui-modules/notification/services/notification.service';
import { ApiModel } from '../../../../../models/api.model';
import {catchError, finalize} from 'rxjs/operators';
import {PrizesModel} from "../models/prizes.model";
import {Observable, throwError} from "rxjs";

@Injectable()
export class PrizesService extends AbstractListService<
  PrizesModel.PrizesListDTO
  > {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _notificationService: NotificationService,
  ) {
    super();
  }

  getList(params: ApiModel.PaginationListRequestParams): void {
    this._listDataLoading$.next(true);

    this._httpClient.get('http://book-geek.test/api/prizes', {params})
      .pipe(
        finalize(() => this._listDataLoading$.next(false)),
      )
      .subscribe({
        next: (response: PrizesModel.PrizesListDTO) => {
          this._listData$.next(response);
        },
        error: () => {
          this._listData$.next(null);
        },
      });
  }

  createPrize(data: any): Observable<any> {
    return this._httpClient.post(`http://book-geek.test/api/prizes`,data).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }

  updatePrize(prizeId: number, data: any): Observable<any> {
    return this._httpClient.patch(`http://book-geek.test/api/prizes/${prizeId}`,data).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }

  deletePrize(prizeId: number): Observable<any> {
    return this._httpClient.delete(`http://book-geek.test/api/prizes/${prizeId}`).pipe(
      catchError(this._errorHandler.bind(this)),
      finalize(() => this._listDataLoading$.next(false)),
    );
  }
}
