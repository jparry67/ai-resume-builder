import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ParticlesComponent } from '../../components/particles/particles.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ParticlesComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLoginMode = true;
  
  // Login form data
  loginData = {
    email: '',
    password: ''
  };
  
  // Register form data
  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  login() {
    // TODO: Implement actual login logic
    console.log('Login attempt:', this.loginData);
    this.router.navigate(['/resume']);
  }

  register() {
    // TODO: Implement actual registration logic
    console.log('Register attempt:', this.registerData);
    this.router.navigate(['/resume']);
  }

  isLoginValid(): boolean {
    return this.loginData.email.trim() !== '' && this.loginData.password.trim() !== '';
  }

  isRegisterValid(): boolean {
    return this.registerData.firstName.trim() !== '' &&
           this.registerData.lastName.trim() !== '' &&
           this.registerData.email.trim() !== '' &&
           this.registerData.password.trim() !== '' &&
           this.registerData.password === this.registerData.confirmPassword;
  }
}