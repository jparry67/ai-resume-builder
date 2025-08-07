import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../services/resume.service';
import { MainTemplateComponent } from '../../components/templates/main-template/main-template.component';
import { NgxPrintModule } from 'ngx-print';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, MainTemplateComponent, NgxPrintModule, RouterModule, MatIconModule],
  templateUrl: './resume.component.html',
})
export class ResumeComponent implements OnInit {
  fontSizePx: number = 12; // Default font size in pixels
  readonly MIN_FONT_SIZE_PX = 8;
  readonly MAX_FONT_SIZE_PX = 20;
  readonly FONT_SIZE_STEP_PX = 1;

  constructor(public resumeService: ResumeService) {}

  ngOnInit() {
    this.resumeService.loadResume('123');
  }

  get fontSizeRem(): number {
    return this.fontSizePx / 16;
  }

  decreaseFontSize(): void {
    if (this.fontSizePx > this.MIN_FONT_SIZE_PX) {
      this.fontSizePx -= this.FONT_SIZE_STEP_PX;
    }
  }

  increaseFontSize(): void {
    if (this.fontSizePx < this.MAX_FONT_SIZE_PX) {
      this.fontSizePx += this.FONT_SIZE_STEP_PX;
    }
  }
}