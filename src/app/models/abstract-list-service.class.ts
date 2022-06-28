import {BehaviorSubject, Observable, throwError} from 'rxjs';

/**
 * This class lays a basis for our services by defining basic data stream objects
 */
export class AbstractListService<T> {
  protected readonly _listData$: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(
    null,
  );

  protected readonly _listDataLoading$: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);

  listData$: Observable<T | null> = this._listData$.asObservable();
  listDataLoading$: Observable<boolean> = this._listDataLoading$.asObservable();

  protected _errorHandler(error: any): Observable<never> {
    return throwError(error);
  }
}
