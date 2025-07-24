import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService, ResumeData } from '../../services/resume.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DndModule, DndDropEvent } from 'ngx-drag-drop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DndModule, MatIconModule],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  constructor(public resumeService: ResumeService, private router: Router) {}
  resume: ResumeData | null = null;
  resumeSectionDraggingIndex: number | null = null;

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

  onDragStart(index: number) {
    this.resumeSectionDraggingIndex = index;
  }

  onDragEnd() {
    this.resumeSectionDraggingIndex = null;
  }

  onDrop(event: DndDropEvent) {
    const oldIndex = event.data;
    let newIndex = event.index as number;
    if (newIndex > oldIndex) {
      newIndex -= 1;
    }
    if (!this.resume || !this.resume.resumeSections) {
      return;
    }
    this.resume.resumeSections.splice(
        newIndex, 0, this.resume.resumeSections.splice(oldIndex, 1)[0]);
  }
}