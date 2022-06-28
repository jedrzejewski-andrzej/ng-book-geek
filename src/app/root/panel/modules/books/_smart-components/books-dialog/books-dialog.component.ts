import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NotificationService} from "../../../../../../ui-modules/notification/services/notification.service";
import {BooksModel} from "../../models/books.model";
import {BooksService} from "../../_services/books.service";
import {BooksFilterService} from "../../_services/books-filter.service";
import {Observable} from "rxjs";
import {FormModel} from "../../../../../../utility-modules/forms/models/form.model";


@Component({
  selector: 'app-books-dialog',
  templateUrl: './books-dialog.component.html',
  styleUrls: ['./books-dialog.component.scss'],
})
export class BooksDialogComponent implements OnInit {
  formGroup: FormGroup;
  categoriesOptions$: Observable<FormModel.Option[]>;
  authorsOptions$: Observable<FormModel.Option[]>;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _matDialogRef: MatDialogRef<
      BooksDialogComponent,
      boolean
      >,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      book?: BooksModel.BookDTO
    },
    private readonly _booksService: BooksService,
    private readonly _booksFiltersService: BooksFilterService,
    private readonly _notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._initDataStreams();
  }

  private _initDataStreams(): void {
    this.categoriesOptions$ = this._booksFiltersService.getCategoriesOptions();
    this.authorsOptions$ = this._booksFiltersService.getAuthorsOptions();
  }

  private _initForm(): void {
    this.formGroup = this._formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      isbn: [null, [Validators.required]],
      author_id: [null, [Validators.required]],
      category_id: [null, [Validators.required]],
    });

    if (this.data?.book) {
      this.formGroup.patchValue({
        title: [this.data.book?.title],
        isbn: [this.data.book?.isbn],
        author_id: [this.data.book?.author?.id],
        category_id: [this.data.book?.category?.id],
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if (this.data?.book) {
        this._booksService.updateBook(this.data.book.id,this.formGroup.getRawValue())
          .subscribe(() => {
            this._notificationService.showSuccessMessage({
              message: 'Pomyślnie zaktualizowano książkę',
            });
            this._matDialogRef.close();
          });
      } else {
        this._booksService.createBook(this.formGroup.getRawValue())
          .subscribe(() => {
            this._notificationService.showSuccessMessage({
              message: 'Pomyślnie dodano książkę :)',
            });
            this._matDialogRef.close();
          });
      }
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  close(): void {
    this._matDialogRef.close();
  }

  getControl(content: string): FormControl {
    return this.formGroup.get(content) as FormControl;
  }
}
