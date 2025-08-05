import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService, ResumeData } from '../../services/resume.service';
import { RouterModule, Router } from '@angular/router';
import { EditResumeOverviewComponent } from '../../components/edit-resume-overview/edit-resume-overview.component';
import { EditResumeSectionComponent } from '../../components/edit-resume-section/edit-resume-section.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, EditResumeOverviewComponent, EditResumeSectionComponent],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  constructor(public resumeService: ResumeService, private router: Router) {}
  resume: ResumeData | null = null;
  editingResumeSectionIndex: number | null = null;
  editingExperienceSectionIndex: number | null = null;

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

  cancel() {
    this.router.navigate(['/resume']);
  }

  saveAs() {
    this.resumeService.createResume(this.resume!);
    this.router.navigate(['/resume']);
  }

  onEditSection(index: number) {
    this.editingResumeSectionIndex = index;
  }

  onCloseSection() {
    this.editingResumeSectionIndex = null;
  }
}