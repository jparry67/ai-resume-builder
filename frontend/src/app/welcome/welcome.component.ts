import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParticlesComponent } from '../particles/particles.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, ParticlesComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  protected getStarted() {
    // TODO: Navigate to resume builder or sign up page
    console.log('Get started clicked');
  }
} 