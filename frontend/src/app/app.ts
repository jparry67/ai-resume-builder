import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'ai-resume-builder-frontend';
  protected message = signal('Loading...');

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.callBackend();
  }

  callBackend() {
    this.apiService.getHello().subscribe({
      next: (response) => {
        console.log('Backend response:', response);
        this.message.set(response.message);
      },
      error: (error) => {
        console.error('Error calling backend:', error);
        this.message.set('Error connecting to backend');
      }
    });
  }
}
