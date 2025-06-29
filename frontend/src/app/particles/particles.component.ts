import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var particlesJS: any;

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [CommonModule],
  template: '<div id="particles-js" class="absolute inset-0 -z-10"></div>',
  styles: [`
    #particles-js {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ParticlesComponent implements OnInit {

  ngOnInit() {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 160,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: [
            '#3B82F6', // blue-500
            '#1D4ED8', // blue-700
            '#1E40AF', // blue-800
            '#1E3A8A', // blue-900
            '#60A5FA', // blue-400
            '#93C5FD'  // blue-300
          ]
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.75,
          random: true,
        },
        size: {
          value: 1,
          random: false
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 0.67,
          direction: 'bottom-left',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: false
          },
          onclick: {
            enable: false
          },
          resize: true
        }
      },
      retina_detect: true
    });
  }
} 