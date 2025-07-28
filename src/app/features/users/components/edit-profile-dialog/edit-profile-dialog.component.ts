import {AfterViewInit, Component, ElementRef, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from '../../../../shared/models/user/user-models';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {UserProviderService} from '../../user-provider-service/user-provider.service';

export interface DialogData {
  user: User
}

@Component({
  selector: 'app-edit-profile-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInput,
    MatButton,
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss'
})
export class EditProfileDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('personalInfoBtn', { static: true }) personalInfoBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('tab2Btn', { static: true }) tab2Btn!: ElementRef<HTMLButtonElement>;
  @ViewChild('tab3Btn', { static: true }) tab3Btn!: ElementRef<HTMLButtonElement>;

  readonly dialogRef = inject(MatDialogRef<EditProfileDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  public selectedTab: 'personalInfo' | 'security' | 'tab3' = 'personalInfo';
  public hovering = false;
  public editableUser = {...this.data.user}

  errorMessage: string | null = null;

  public passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private _userProviderService: UserProviderService
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  selectTab(tab: 'personalInfo' | 'security' | 'tab3') {
    this.selectedTab = tab;
  }

  public onCloseClick(): void {
    this.dialogRef.close();
  }

  onProfilePictureSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('file', file);

      this._userProviderService.uploadProfilePicture(this.data.user.id, formData)
        .subscribe((url) => {
          this.editableUser.profilePicture = url;
        });
    }
  }

  onSubmit() {
    this._userProviderService.updateUser(this.data.user.id, this.editableUser)
      .subscribe((updatedUser) => {
        this.data.user = updatedUser;
      });
  }

  onPasswordChange() {
    const { currentPassword, newPassword, confirmPassword } = this.passwordData;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'New passwords do not match.';
      return;
    }

 /*   this._userProviderService.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.errorMessage = 'Password changed successfully!';
        this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
      },
      error: (err) => {
        this.errorMessage = 'Failed to change password: ' + err.error?.message || 'Unknown error';
      }
    });*/
  }
}
