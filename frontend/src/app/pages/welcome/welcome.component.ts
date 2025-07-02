import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ParticlesComponent } from '../../components/particles/particles.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, ParticlesComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  protected getStarted() {
    this.router.navigate(['/resume']);
  }
}