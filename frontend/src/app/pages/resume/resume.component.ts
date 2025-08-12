import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./resume.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeComponent implements OnInit {
  @ViewChild('resumeContainer', {static: true}) resumeContainer!: ElementRef;
  readonly MIN_FONT_SIZE_PX = 8;
  readonly MAX_FONT_SIZE_PX = 20;
  readonly FONT_SIZE_STEP_PX = 1;

  private readonly DEFAULT_TEMPLATE_CONFIG: TemplateConfig = { baseFontSize: 12 };
  private readonly TOP_PAGE_MARGIN: number = 45;
  private readonly PAGE_HEIGHT: number = 960;

  templateConfig: TemplateConfig | null = null;

  constructor(public resumeService: ResumeService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.resumeService.loadResume('123');
    this.loadTemplateConfig();
  }

  ngAfterViewInit(): void {
    this.addDynamicLineBreaks();
  }

  loadTemplateConfig(): void {
    const currentResume = this.resumeService.resumeData();
    this.templateConfig = {
      ...this.DEFAULT_TEMPLATE_CONFIG,
      ...(currentResume?.templateConfig ?? {}),
    };
  }

  addDynamicLineBreaks(): void {
    const containerEl = this.resumeContainer.nativeElement as HTMLElement;
    requestAnimationFrame(() => {
      this.removeExistingLines(containerEl);
      containerEl.style.height = 'auto';
      const contentHeight = containerEl.scrollHeight;
      const effectiveHeight = Math.max(0, contentHeight - this.TOP_PAGE_MARGIN);
      const numberOfPages = Math.max(1, Math.ceil(effectiveHeight / this.PAGE_HEIGHT));
      for (let i = 1; i < numberOfPages; i++) {
        const line = document.createElement('div');
        line.classList.add('dynamic-line');
        line.style.top = `${i * this.PAGE_HEIGHT + this.TOP_PAGE_MARGIN}px`;
        containerEl.appendChild(line);
      }
      containerEl.style.height = `${numberOfPages * this.PAGE_HEIGHT + this.TOP_PAGE_MARGIN}px`;
    });
  }

  private removeExistingLines(container: HTMLElement): void {
    const existingLines = container.querySelectorAll('.dynamic-line');
    existingLines.forEach(line => line.remove());
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
    this.addDynamicLineBreaks();
  }

  increaseFontSize(): void {
    if (this.templateConfig && this.templateConfig.baseFontSize < this.MAX_FONT_SIZE_PX) {
      this.templateConfig = {
        ...this.templateConfig,
        baseFontSize: this.templateConfig.baseFontSize + this.FONT_SIZE_STEP_PX
      };
    }
    this.addDynamicLineBreaks();
  }

  async autoFitFont(): Promise<void> {
    if (!this.templateConfig) return;

    const containerEl = this.resumeContainer.nativeElement as HTMLElement;
    const startingSize = this.templateConfig.baseFontSize;
    
    this.removeExistingLines(containerEl);
    containerEl.style.height = 'auto';

    // First, try increasing from current size until it doesn't fit
    let currentSize = startingSize;
    let contentHeight = containerEl.scrollHeight;
    let effectiveHeight = Math.max(0, contentHeight - this.TOP_PAGE_MARGIN);
    let numberOfPages = Math.max(1, Math.ceil(effectiveHeight / this.PAGE_HEIGHT));
    
    // Try increasing
    while (numberOfPages === 1 && currentSize < this.MAX_FONT_SIZE_PX) {
      this.templateConfig = { ...this.templateConfig, baseFontSize: currentSize };
      this.cdr.detectChanges();
      
      await new Promise<void>(resolve => {
        requestAnimationFrame(() => {
          const contentHeight = containerEl.scrollHeight;
          const effectiveHeight = Math.max(0, contentHeight - this.TOP_PAGE_MARGIN);
          numberOfPages = Math.max(1, Math.ceil(effectiveHeight / this.PAGE_HEIGHT));
          console.log('Increasing - size:', currentSize, 'pages:', numberOfPages);
          resolve();
        });
      });

      if (numberOfPages === 1) {
        currentSize++;
      }
    }
    
    // Now decrease until we get back to 1 page
    if (numberOfPages > 1) {
      currentSize = startingSize - 1;
      while (currentSize >= this.MIN_FONT_SIZE_PX) {
        this.templateConfig = { ...this.templateConfig, baseFontSize: currentSize };
        this.cdr.detectChanges();
        
        await new Promise<void>(resolve => {
          requestAnimationFrame(() => {
            const contentHeight = containerEl.scrollHeight;
            const effectiveHeight = Math.max(0, contentHeight - this.TOP_PAGE_MARGIN);
            numberOfPages = Math.max(1, Math.ceil(effectiveHeight / this.PAGE_HEIGHT));
            console.log('Decreasing - size:', currentSize, 'pages:', numberOfPages);
            resolve();
          });
        });

        if (numberOfPages === 1) {
          break;
        }
        currentSize--;
      }
      
      if (currentSize < this.MIN_FONT_SIZE_PX) {
        currentSize = this.MIN_FONT_SIZE_PX;
      }
    }
    
    // Set the final size
    this.templateConfig = { ...this.templateConfig, baseFontSize: currentSize };
    this.cdr.detectChanges();
    
    this.addDynamicLineBreaks();
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