import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService, ResumeData } from '../../services/resume.service';
import { MainTemplateComponent } from '../../components/templates/main-template.component.ts/main-template.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, MainTemplateComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent implements OnInit {
  constructor(public resumeService: ResumeService) {}

  ngOnInit() {
    this.resumeService.loadResume('123');
  }
} 