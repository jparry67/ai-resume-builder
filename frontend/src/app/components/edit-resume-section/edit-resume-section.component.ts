import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeSection, Experience, Role } from '../../services/resume.service';
import { FormsModule } from '@angular/forms';
import { DndModule, DndDropEvent } from 'ngx-drag-drop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-resume-section',
  standalone: true,
  imports: [CommonModule, FormsModule, DndModule, MatIconModule],
  templateUrl: './edit-resume-section.component.html',
})
export class EditResumeSectionComponent implements OnInit {
  @Input() resumeSection: ResumeSection | null = null;
  @Output() editExperience = new EventEmitter<number>();
  @Output() closeSection = new EventEmitter();
  draggingIndex: number | null = null;
  isAddingSection: boolean = false;
  newSectionOrganization: string = '';
  newSectionTitle: string = '';
  newSectionDates: string = '';
  newSectionLocation: string = '';

  constructor() {}

  ngOnInit() {}

  onCloseSection() {
    this.closeSection.emit();
  }

  onDragStart(index: number) {
    this.draggingIndex = index;
  }

  onDragEnd() {
    this.draggingIndex = null;
  }

  onDrop(event: DndDropEvent) {
    const oldIndex = event.data;
    let newIndex = event.index as number;
    if (newIndex > oldIndex) {
      newIndex -= 1;
    }
    if (!this.resumeSection) {
      return;
    }
    if (this.resumeSection.type === 'experience' && this.resumeSection.experiences) {
      this.resumeSection.experiences.splice(
        newIndex, 0, this.resumeSection.experiences.splice(oldIndex, 1)[0]);
    }
    if (this.resumeSection.type === 'bullet' && this.resumeSection.bullets) {
      this.resumeSection.bullets.splice(
        newIndex, 0, this.resumeSection.bullets.splice(oldIndex, 1)[0]);
    }
  }

  onEditSection(index: number) {
    this.editExperience.emit(index);
  }

  add() {
    if (this.resumeSection && this.resumeSection.type === 'bullet') {
      this.resumeSection.bullets.push('');
    } else if (this.resumeSection && this.resumeSection.type === 'experience') {
      this.isAddingSection = true;
    }
  }

  confirmAddSection() {
    if (this.resumeSection && this.resumeSection.type === 'experience') {
      const newRole: Role = {
        title: this.newSectionTitle,
        dates: this.newSectionDates,
        bullets: [],
      };
      
      const newExperience: Experience = {
        organization: this.newSectionOrganization,
        location: this.newSectionLocation,
        roles: [newRole],
      };
      
      this.resumeSection.experiences.push(newExperience);
      this.editExperience.emit(this.resumeSection.experiences.length - 1);
    }
    this.isAddingSection = false;
    this.newSectionOrganization = '';
    this.newSectionTitle = '';
    this.newSectionDates = '';
    this.newSectionLocation = '';
  }

  cancelAddSection() {
    this.isAddingSection = false;
    this.newSectionOrganization = '';
    this.newSectionTitle = '';
    this.newSectionDates = '';
    this.newSectionLocation = '';
  }

  delete(index: number) {
    if (this.resumeSection && this.resumeSection.type === 'bullet') {
      this.resumeSection.bullets.splice(index, 1);
    } else if (this.resumeSection && this.resumeSection.type === 'experience') {
      this.resumeSection.experiences.splice(index, 1);
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}