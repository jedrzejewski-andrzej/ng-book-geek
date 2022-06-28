import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginationModel } from '../../models/pagination.model';
import {ApiModel} from "../../../../models/api.model";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
  @HostBinding('hidden')
  private _hidden: boolean = true;

  // @ts-ignore
  @Input() meta: ApiModel.ListResponseMetaDTO;
  @Input() pageSizeOptions: number[] = ApiModel.DEFAULT_PAGE_SIZE_OPTIONS;
  @Input() alwaysVisible: boolean = true;
  // @ts-ignore
  @Input() loading: boolean;

  @Output() change: EventEmitter<
    PaginationModel.ChangeEvent
  > = new EventEmitter<PaginationModel.ChangeEvent>();

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.meta) {
      this._metaChangeHandler();
    }
  }

  private _metaChangeHandler(): void {
    const paginationTotal: number = this.meta?.total ?? 0;

    this._hidden = this.alwaysVisible
      ? false
      : paginationTotal <= ApiModel.DEFAULT_PAGE_SIZE;
  }

  paginatorChangeHandler(event: PageEvent): void {
    const changeEvent: PaginationModel.ChangeEvent = {
      page: event.pageIndex + 1,
      pageSize: event.pageSize,
    };
    this.change.emit(changeEvent);
  }
}
