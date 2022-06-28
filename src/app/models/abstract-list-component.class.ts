import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PaginationModel } from '../ui-modules/pagination/models/pagination.model';
import { ApiModel } from './api.model';


/**
 * This class lays a basis for our components that will be used either to:
 * 1. display data directly
 * 2. pass that in parent-child relation in order to display data in a child component
 */
@Directive()
export abstract class AbstractListComponent<T> implements OnInit, OnDestroy {
  protected _subscription: Subscription = new Subscription();
  private _sortField: keyof T | null;

  listData$: Observable<ApiModel.AbstractListResponseDTO<T> | null>;
  listDataLoading$: Observable<boolean>;

  page: number = ApiModel.DEFAULT_PAGE;
  pageSize: number = ApiModel.DEFAULT_PAGE_SIZE;
  sortDirection: ApiModel.SORT_DIR = ApiModel.SORT_DIR.ASC;
  filtersData: Params;

  /**
   * This getter is used to implement materials sort inputs
   */
  get sortField(): string {
    return this._sortField as string;
  }
  /**
   * @param params
   * @protected
   *
   * This abstract function is meant to implemented in successor classes and is used to fetch data by calling api
   */
  protected abstract _fetchData(
    params: ApiModel.PaginationListRequestParams,
  ): void;

  constructor(
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _router: Router,
  ) {}

  ngOnInit(): void {
    /**
     * Listeaning to changes in our routing in order to refetch data according to new route and params
     */
    this._subscription.add(
      this._activatedRoute.queryParams.subscribe(
        this._queryParamsChangeHandler.bind(this),
      ),
    );
  }

  protected get _allParams(): ApiModel.PaginationListRequestParams {
    return {
      page: `${this.page}`,
      limit: `${this.pageSize}`,
      ...(this.sortField ? { sort_field: this.sortField } : null),
      ...(this.sortDirection ? { sort_dir: this.sortDirection } : null),
      ...this.filtersData,
    };
  }

  protected _refetchData(): void {
    this._fetchData(this._allParams);
  }

  /**
   * @param page
   * @param limit
   * @param sortField
   * @param sortDir
   * @param filterParams
   * @private
   *
   * This function fetches data after being called upon by route changes
   */
  private _queryParamsChangeHandler({
    page,
    limit,
    sortField,
    sortDir,
    ...filterParams
  }: Params): void {
    this.page = (page && !isNaN(+page) ? +page : null) ?? ApiModel.DEFAULT_PAGE;
    this.pageSize =
      (limit && !isNaN(+limit) ? +limit : null) ?? ApiModel.DEFAULT_PAGE_SIZE;

    this.sortDirection = [
      ApiModel.SORT_DIR.ASC,
      ApiModel.SORT_DIR.DESC,
    ].includes(sortDir)
      ? sortDir
      : null;
    this._sortField = sortField || null; // map empty string to null

    this.filtersData = filterParams;

    this._fetchData(this._allParams);
  }

  filtersDataChangeHandler(filtersData: Params): void {
    // remove empty values
    const filtersDataCopy: Params = { ...filtersData };
    Object.keys(filtersDataCopy).forEach((key: string) => {
      if (
        filtersDataCopy[key] === null ||
        filtersDataCopy[key] === undefined ||
        filtersDataCopy[key] === ''
      ) {
        // still allow 0 as a value
        delete filtersDataCopy[key];
      }
    });

    this.filtersData = filtersDataCopy;
    this.page = 1;
    this._reloadData();
  }

  paginationChangeHandler(event: PaginationModel.ChangeEvent): void {
    this.page = event.page;
    this.pageSize = event.pageSize;
    this._reloadData();
  }

  sortChangeHandler(event: Sort): void {
    this._sortField = (event.active as keyof T) || null; // map empty string to null
    this.sortDirection = (event.direction as ApiModel.SORT_DIR) || null; // map empty string to null
    this._reloadData();
  }

  protected _reloadData(): void {
    const newQueryParams: Params = {
      // pagination
      ...(this.page && this.page !== 1 ? { page: this.page } : null),
      ...(this.pageSize && this.pageSize !== ApiModel.DEFAULT_PAGE_SIZE
        ? { limit: this.pageSize }
        : null),
      // sorting
      ...(this.sortField && this.sortDirection
        ? {
            sortField: this.sortField,
            sortDir: this.sortDirection,
          }
        : null),
      // filters
      ...(this.filtersData ?? {}),
    };
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: newQueryParams,
      preserveFragment: true,
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
