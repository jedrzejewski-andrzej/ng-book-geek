import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NotificationService} from "../../../../../../ui-modules/notification/services/notification.service";
import {CategoriesModel} from "../../models/categories.model";
import {CategoriesService} from "../../_services/categories.service";


@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.scss'],
})
export class CategoriesDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _matDialogRef: MatDialogRef<
      CategoriesDialogComponent,
      boolean
      >,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      category?: CategoriesModel.CategoryDTO
    },
    private readonly _categoriesService: CategoriesService,
    private readonly _notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.formGroup = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
    });

    if (this.data?.category) {
      this.formGroup.patchValue({
        name: [this.data.category?.name],
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if (this.data?.category) {
        this._categoriesService.updateCategory(this.data.category.id,this.formGroup.getRawValue())
          .subscribe(() => {
            this._notificationService.showSuccessMessage({
              message: 'Pomyślnie zaktualizowano książkę',
            });
            this._matDialogRef.close();
          });
      } else {
        this._categoriesService.createCategory(this.formGroup.getRawValue())
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
