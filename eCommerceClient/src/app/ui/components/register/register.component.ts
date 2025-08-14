import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { Create_User } from '../../../contracts/users/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
}) 
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService : UserService, private toastService : CustomToastrService, spinner: NgxSpinnerService ) {super(spinner); }
  
  frm : FormGroup;
  
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ['' , [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(50)
        ]
      ],
      username: ['',
        [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9_]+$') // Alphanumeric and underscores only
        ]
      ],
      email: ['' , [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
        ]
      ],
      password: ['' , [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d])\\S{6,20}$')
      ]
      ],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d])\\S{6,20}$')
      ]
      ]
    }, { validators: passwordMatchValidator('password', 'confirmPassword') });
  }

  get component() {
    return this.frm.controls;
  }

  async onSubmit(user: User) {
    const result: Create_User = await this.userService.create(user);
    if (result.succeeded) {
      this.toastService.message(result.message, 'User created successfully!',{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    } else {
      this.toastService.message(result.message, 'User creation failed!', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
    }
  }
}

export function passwordMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordKey);
    const confirmPassword = formGroup.get(confirmPasswordKey);

    if (!password || !confirmPassword) return null;

    const mismatch = password.value !== confirmPassword.value;

    if (mismatch) {
      confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
    } else {
      if (confirmPassword.hasError('passwordMismatch')) {
        const errors = { ...confirmPassword.errors };
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          confirmPassword.setErrors(null);
        } else {
          confirmPassword.setErrors(errors);
        }
      }
    }

    return null;
  };
}