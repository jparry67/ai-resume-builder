import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../services/resume.service';
import { MainTemplateComponent } from '../../components/templates/main-template/main-template.component';
import { NgxPrintModule } from 'ngx-print';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, MainTemplateComponent, NgxPrintModule, RouterModule],
  templateUrl: './resume.component.html',
})
export class ResumeComponent implements OnInit {
  constructor(public resumeService: ResumeService) {}

  ngOnInit() {
    this.resumeService.loadResume('123');
  }
}