import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService, ResumeData } from '../../services/resume.service';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, NgxPrintModule],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  constructor(public resumeService: ResumeService) {}
  resume: ResumeData | null = null;

  ngOnInit() {
    this.resume = this.resumeService.resumeData();
  }
}