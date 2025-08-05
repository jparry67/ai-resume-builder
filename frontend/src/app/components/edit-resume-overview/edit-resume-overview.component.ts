import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../services/resume.service';
import { FormsModule } from '@angular/forms';
import { DndModule, DndDropEvent } from 'ngx-drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-edit-resume-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, DndModule, MatIconModule, MatRadioModule],
  templateUrl: './edit-resume-overview.component.html',
})
export class EditResumeOverviewComponent implements OnInit {
  @Input() resumeData: ResumeData | null = null;
  @Output() editSection = new EventEmitter<number>();
  draggingIndex: number | null = null;
  isAddingSection: boolean = false;
  newSectionTitle: string = '';
  newSectionType: 'bullet' | 'experience' = 'bullet';

  constructor() {}

  ngOnInit() {}

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
    if (!this.resumeData || !this.resumeData.resumeSections) {
      return;
    }
    this.resumeData.resumeSections.splice(
        newIndex, 0, this.resumeData.resumeSections.splice(oldIndex, 1)[0]);
  }

  onEditSection(index: number) {
    this.editSection.emit(index);
  }

  delete(index: number) {
    if (this.resumeData) {
      this.resumeData.resumeSections.splice(index, 1);
    }
  }

  add() {
    this.isAddingSection = true;
  }

  confirmAddSection() {
    if (this.resumeData) {
      if (this.newSectionType === 'bullet') {
        this.resumeData.resumeSections.push({
          title: this.newSectionTitle,
          type: this.newSectionType,
          bullets: [],
        });
      } else {
        this.resumeData.resumeSections.push({
          title: this.newSectionTitle,
          type: this.newSectionType,
          experiences: [],
        });
      }
      this.editSection.emit(this.resumeData.resumeSections.length - 1);
    }
    this.isAddingSection = false;
    this.newSectionTitle = '';
    this.newSectionType = 'bullet';
  }

  cancelAddSection() {
    this.isAddingSection = false;
    this.newSectionTitle = '';
    this.newSectionType = 'bullet';
  }
}