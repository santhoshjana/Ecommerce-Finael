import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { authService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted: boolean = false;


  constructor(private fb: FormBuilder,
              private authService: authService,
              private toastr: ToastrService,
              private router: Router
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.storeToken(res.token);
          alert('Login successful!');
          this.router.navigate(['/']); // Navigate to home or dashboard
        },
        error: (err) => {
          alert(err.error.message || 'Login failed');
        }
      });
    }
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
