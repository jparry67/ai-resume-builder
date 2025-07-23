import { Component, Input, OnInit } from '@angular/core';
import { ResumeData } from '../../../services/resume.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.css']
})
export class MainTemplateComponent implements OnInit {
  @Input() resumeData: ResumeData | null = null;

  constructor() { }

  ngOnInit(): void {
    console.log(this.resumeData);
  }

  get names() {
    return this.resumeData ? this.resumeData.personalInfo.name.split(' ').map((name: string) => [name[0], name.slice(1)]) : [];
  }
}
