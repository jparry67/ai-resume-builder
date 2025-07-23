import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService, ResumeData } from '../../services/resume.service';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, NgxPrintModule, FormsModule, RouterModule],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  constructor(public resumeService: ResumeService, private router: Router) {}
  resume: ResumeData | null = null;

  ngOnInit() {
    this.resume = this.resumeService.resumeData();
    if (!this.resume) {
      this.router.navigate(['/resume']);
    }
  }

  save() {
    this.resumeService.updateResume(this.resume!);
    this.router.navigate(['/resume']);
  }

  saveAs() {
    this.resumeService.createResume(this.resume!);
    this.router.navigate(['/resume']);
  }
}