import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NotificationService} from "../../../../../../ui-modules/notification/services/notification.service";
import {PrizesService} from "../../_services/prizes.service";
import {PrizesModel} from "../../models/prizes.model";

@Component({
  selector: 'app-prizes-dialog',
  templateUrl: './prizes-dialog.component.html',
  styleUrls: ['./prizes-dialog.component.scss'],
})
export class PrizesDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _matDialogRef: MatDialogRef<
      PrizesDialogComponent,
      boolean
      >,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      prize?: PrizesModel.PrizeDTO
    },
    private readonly _prizesService: PrizesService,
    private readonly _notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.formGroup = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
    });

    if (this.data?.prize) {
      this.formGroup.patchValue({
        name: [this.data.prize?.name],
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      if (this.data?.prize) {
        this._prizesService.updatePrize(this.data.prize.id,this.formGroup.getRawValue())
          .subscribe(() => {
            this._notificationService.showSuccessMessage({
              message: 'Pomyślnie zaktualizowano nagrodę',
            });
            this._matDialogRef.close();
          });
      } else {
        this._prizesService.createPrize(this.formGroup.getRawValue())
          .subscribe(() => {
            this._notificationService.showSuccessMessage({
              message: 'Pomyślnie dodano nagrodę :)',
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
