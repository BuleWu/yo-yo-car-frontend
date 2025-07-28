import {AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from '../../../../shared/models/user/user-models';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {NgTemplateOutlet} from '@angular/common';

export interface DialogData {
  user: User
}

@Component({
  selector: 'app-edit-profile-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    NgTemplateOutlet
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss'
})
export class EditProfileDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  template!: TemplateRef<any>;

  readonly dialogRef = inject(MatDialogRef<EditProfileDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);


  constructor(

  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.template = this.tab1;
  }

  public select(template: any) {
    this.template = template;
  }

  public onCloseClick(): void {
    this.dialogRef.close();
  }
}
