import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AuthorsService} from "../../_services/authors.service";
import {NotificationService} from "../../../../../../ui-modules/notification/services/notification.service";
import {AuthorsModel} from "../../models/authors.model";

@Component({
  selector: 'app-authors-dialog',
  templateUrl: './authors-dialog.component.html',
  styleUrls: ['./authors-dialog.component.scss'],
})
export class AuthorsDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _matDialogRef: MatDialogRef<
      AuthorsDialogComponent,
      boolean
      >,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      author?: AuthorsModel.AuthorDTO
    },
    private readonly _authorsService: AuthorsService,
    private readonly _notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.formGroup = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      lastname: [null, [Validators.required]],
      birth_date: [null, [Validators.required]],
    });

    if (this.data?.author) {
      const date = (new Date(this.data.author?.birth_date)).toLocaleDateString();
      const dateArr = date.split('.');
      [dateArr[0], dateArr[1], dateArr[2]] = [dateArr[2], dateArr[0], dateArr[1]];
      this.formGroup.patchValue({
        name: [this.data.author?.name],
        lastname: [this.data.author?.lastname],
        birth_date: [dateArr.join('-')],
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if (this.data?.author) {
        this._authorsService.updateAuthor(this.data.author.id,this.formGroup.getRawValue())
          .subscribe(() => {
            this._notificationService.showSuccessMessage({
              message: 'Pomyślnie zaktualizowano autora',
            });
            this._matDialogRef.close();
          });
      } else {
        this._authorsService.createAuthor(this.formGroup.getRawValue())
          .subscribe(() => {
            this._notificationService.showSuccessMessage({
              message: 'Pomyślnie dodano autora :)',
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
