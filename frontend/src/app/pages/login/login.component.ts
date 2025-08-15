import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ParticlesComponent } from '../../components/particles/particles.component';
import { LoginData, RegisterData, AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ParticlesComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLoginMode = true;
  
  // Error messages
  loginError = '';
  registerError = '';
  
  // Login form data
  loginData: LoginData = {
    email: '',
    password: ''
  };
  
  // Register form data
  registerData: RegisterData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  confirmPassword = '';

  constructor(private router: Router, private authService: AuthService) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    // Clear errors when switching modes
    this.loginError = '';
    this.registerError = '';
  }

  login() {
    this.loginError = '';
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.router.navigate(['/resume']);
      },
      error: (err) => {
        console.error('Login failed:', err.error.error);
        this.loginError = err.error.error || 'Login failed. Please try again.';
        console.log('setting loginError', this.loginError);
      }
    });
  }

  register() {
    this.registerError = '';
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.router.navigate(['/resume']);
      },
      error: (err) => {
        console.error('Registration failed:', err.error.error);
        this.registerError = err.error.error || 'Registration failed. Please try again.';
        console.log('setting registerError', this.registerError);
      }
    });
  }

  isLoginValid(): boolean {
    return this.loginData.email.trim() !== '' && this.loginData.password.trim() !== '';
  }

  isRegisterValid(): boolean {
    return this.registerData.firstName.trim() !== '' &&
           this.registerData.lastName.trim() !== '' &&
           this.registerData.email.trim() !== '' &&
           this.registerData.password.trim() !== '' &&
           this.registerData.password === this.confirmPassword;
  }
}