import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { authService } from '../service/auth.service';

@Component({
  selector: 'app-user-register',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,ToastrModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

   registerationForm!: FormGroup;
   userSubmitted: boolean | undefined;

    constructor(private fb:FormBuilder,
                private http: HttpClient,
                private toastr: ToastrService,
                private authService: authService ){}

    ngOnInit(): void {

      //cross feild validation
    //   this.registerationForm = new FormGroup({
    //     userName: new FormControl(null,Validators.required),
    //     email: new FormControl(null, [Validators.required, Validators.email]),
    //     password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //     confirmPassword: new FormControl(null, [Validators.required]),
    //     mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    //   },
    //   this.passwordMathchingValidator
    // );
    this.createRegisterationForm();
    }

    createRegisterationForm() {
        this.registerationForm = this.fb.group({
  UserName: [null, Validators.required],
  Email: [null, [Validators.required, Validators.email]],
  Password: [null, [Validators.required, Validators.minLength(8)]],
  ConfirmPassword: [null, Validators.required],
  Mobile: [null, [Validators.required, Validators.maxLength(10)]]
}, { validators: this.passwordMatchValidator });
    }


    // I did this code for coustom validaters
     passwordMatchValidator(form: FormGroup) {
  return form.get('Password')?.value === form.get('ConfirmPassword')?.value
    ? null : { notmatched: true };
}

 onSubmit() {
  this.userSubmitted = true;

  if (this.registerationForm.valid) {
    const rawFormValue = this.registerationForm.value;

    const formValue = {
      ...rawFormValue,
      Mobile: rawFormValue.Mobile ? rawFormValue.Mobile.toString() : ''
    };

    this.authService.register(formValue).subscribe({
      next: (res) => {
        alert('Registered successfully!');
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  } else {
    alert('Please fill all required fields');
  }
}


  // if (this.registerationForm.invalid) {
  //   this.toastr.error('Please fill all required fields correctly', 'Validation Error');
  //   return;
  // }

  // this.http.post('http://localhost:8000/api/v1/register', this.registerationForm.value)
  //   .subscribe({
  //     next: (res) => {
  //       this.toastr.success('User Registered Successfully', 'Success');
  //       this.registerationForm.reset();
  //       this.userSubmitted = false;
  //     },
  //     error: (err) => {
  //       this.toastr.error('Registration Failed. Please try again.', 'Error');
  //       console.error('Registration failed', err);
  //     }
  //   });





    onReset() {
        this.userSubmitted = false;
        this.registerationForm.reset();
    }

    // Getter methods for all form contro

  get UserName() { return this.registerationForm.get('UserName')!; }
get Email() { return this.registerationForm.get('Email')!; }
get Password() { return this.registerationForm.get('Password')!; }
get ConfirmPassword() { return this.registerationForm.get('ConfirmPassword')!; }
get Mobile() { return this.registerationForm.get('Mobile')!; }
}
