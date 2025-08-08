import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../services/resume.service';
import { MainTemplateComponent } from '../../components/templates/main-template/main-template.component';
import { NgxPrintModule } from 'ngx-print';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TemplateConfig } from '../../services/resume.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, MainTemplateComponent, NgxPrintModule, RouterModule, MatIconModule],
  templateUrl: './resume.component.html',
})
export class ResumeComponent implements OnInit {
  readonly MIN_FONT_SIZE_PX = 8;
  readonly MAX_FONT_SIZE_PX = 20;
  readonly FONT_SIZE_STEP_PX = 1;

  private readonly DEFAULT_TEMPLATE_CONFIG: TemplateConfig = { baseFontSize: 12 };

  templateConfig: TemplateConfig | null = null;

  constructor(public resumeService: ResumeService) {}

  ngOnInit() {
    this.resumeService.loadResume('123');
    this.loadTemplateConfig();
  }

  loadTemplateConfig(): void {
    const currentResume = this.resumeService.resumeData();
    this.templateConfig = {
      ...this.DEFAULT_TEMPLATE_CONFIG,
      ...(currentResume?.templateConfig ?? {}),
    };
  }

  get fontSizePx(): number {
    return this.templateConfig?.baseFontSize || 0;
  }

  get fontSizeRem(): number {
    return this.fontSizePx / 16;
  }

  get hasUnsavedChanges(): boolean {
    const currentResume = this.resumeService.resumeData();
    if (!this.templateConfig) {
      return false;
    }
    const normalizedResumeConfig: TemplateConfig = {
      ...this.DEFAULT_TEMPLATE_CONFIG,
      ...(currentResume?.templateConfig ?? {}),
    } as TemplateConfig;
    return this.templateConfig.baseFontSize !== normalizedResumeConfig.baseFontSize;
  }

  decreaseFontSize(): void {
    if (this.templateConfig && this.templateConfig.baseFontSize > this.MIN_FONT_SIZE_PX) {
      this.templateConfig = {
        ...this.templateConfig,
        baseFontSize: this.templateConfig.baseFontSize - this.FONT_SIZE_STEP_PX
      };
    }
  }

  increaseFontSize(): void {
    if (this.templateConfig && this.templateConfig.baseFontSize < this.MAX_FONT_SIZE_PX) {
      this.templateConfig = {
        ...this.templateConfig,
        baseFontSize: this.templateConfig.baseFontSize + this.FONT_SIZE_STEP_PX
      };
    }
  }

  saveChanges(): void {
    const currentResume = this.resumeService.resumeData();
    if (currentResume && this.templateConfig) {
      const updatedResume = {
        ...currentResume,
        templateConfig: { ...this.templateConfig }
      };
      this.resumeService.updateResume(updatedResume);
    }
  }

  resetChanges(): void {
    this.loadTemplateConfig();
  }
}