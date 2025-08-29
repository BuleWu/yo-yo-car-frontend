import {Component, inject,} from '@angular/core';
import {User} from '../../../../shared/models/user/user-models';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserProviderService} from '../../user-provider-service/user-provider.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserProfileTabsEnum} from '../../enums/edit-user-profile-enum';

export interface DialogData {
  user: User;
  onProfilePictureChange: (newProfilePicture: string) => void;
  onUserUpdated: (updatedUser: User) => void;
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
    ReactiveFormsModule,
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss'
})
export class EditProfileDialogComponent {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  userProfileForm: FormGroup;
  initialFormValue: any;

  public selectedTab: UserProfileTabsEnum = UserProfileTabsEnum.PERSONAL_INFO;
  public hovering = false;
  public editableUser = {...this.data.user}

  errorMessage: string | null = null;

  public passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private _userProviderService: UserProviderService,
    private _snackbar: MatSnackBar,
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
  ) {
    this.userProfileForm = this._fb.group({
      firstName: [this.editableUser.firstName, Validators.required],
      lastName: [this.editableUser.lastName, Validators.required],
      vehicle: [this.editableUser.vehicle]
    })

    this.initialFormValue = this.userProfileForm.value;
  }

  selectTab(tab: UserProfileTabsEnum) {
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
        .subscribe({
          next: url => {
            this.editableUser.profilePicture = url;
            this.data.onProfilePictureChange(url);
            this._snackbar.open('Profile picture successfully!', 'Close', {
              duration: 5000,
              panelClass: ['success-snackbar']
            });
          },
          error: err => {
            this._snackbar.open('An error has occurred while trying to update your profile picture.', 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        })
    }
  }

  onSubmit() {
    this._userProviderService.updateUser(this.data.user.id, this.userProfileForm.value)
      .subscribe({
        next: (updatedUser) => {
          this.data.user = updatedUser;
          this.data.onUserUpdated(updatedUser);
          this.initialFormValue = {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            vehicle: updatedUser.vehicle,
          };
          this._snackbar.open('Profile updated successfully!', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
        },
        error: err => {
          this._snackbar.open('An error has occurred while trying to update your profile.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      })
  }

  onPasswordChange(passwordForm: NgForm) {
    const { currentPassword, newPassword, confirmPassword } = this.passwordData;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'New passwords do not match.';
      return;
    }

    this._userProviderService.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this._snackbar.open('Password changed successfully!', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
        passwordForm.resetForm();

      },
      error: (err) => {
        this.errorMessage = 'Failed to change password: ' + (err.error?.message || 'Unknown error');
      }
    });

  }

  get hasFormChanged(): boolean {
    return !(JSON.stringify(this.userProfileForm.value) === JSON.stringify(this.initialFormValue));
  }

  protected readonly UserProfileTabsEnum = UserProfileTabsEnum;
}
