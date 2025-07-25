import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeData } from '../../services/resume.service';
import { FormsModule } from '@angular/forms';
import { DndModule, DndDropEvent } from 'ngx-drag-drop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-resume-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, DndModule, MatIconModule],
  templateUrl: './edit-resume-overview.component.html',
})
export class EditResumeOverviewComponent implements OnInit {
  @Input() resumeData: ResumeData | null = null;
  @Output() editSection = new EventEmitter<number>();
  draggingIndex: number | null = null;

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
}