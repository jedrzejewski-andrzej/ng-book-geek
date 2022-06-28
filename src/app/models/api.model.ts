import { Params } from '@angular/router';

export namespace ApiModel {
  export const DEFAULT_PAGE_SIZE: number = 10;
  export const DEFAULT_PAGE: number = 1;
  export const DEFAULT_PAGE_SIZE_OPTIONS: number[] = [
    DEFAULT_PAGE_SIZE,
    20,
    50,
    100,
  ];

  export enum SORT_DIR {
    DESC = 'desc',
    ASC = 'asc',
  }

  export class ListResponseMetaDTO {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }

  /**
   * This class is used to define structure of api responses
   */
  export abstract class AbstractListResponseDTO<T> {
    /**
     * Data contains array of list entities that are meant to be displayed. Entity is passed to a generic type of its containing class
     */
    abstract data: T[];

    /**
     * Meta contains pagination data for our lists
     */
    meta: ListResponseMetaDTO;
  }

  export interface PaginationQueryParams {
    readonly page?: string;
    readonly limit?: string;
    readonly sort_by?: string;
    readonly sort_dir?: SORT_DIR;
  }

  /**
   * This class defines what kind of parameters are included in our api requests
   */
  export type PaginationListRequestParams = PaginationQueryParams & Params;
}
