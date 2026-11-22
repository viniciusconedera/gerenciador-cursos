import { Component, computed, inject, input, output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { course } from '../../../core/services/course.interfaces';
import { DeleteCourse } from '../delete-course/delete-course';

@Component({
  imports: [MatDialogModule, MatIconModule],
  selector: 'app-card-course',
  styleUrl: './card-course.css',
  templateUrl: './card-course.html',
})
export class CardCourse {
  private readonly dialog = inject(MatDialog);

  course = input<course>();
  fullSize = input<boolean>();
  deleted = output<void>();

  modulesCount = computed(() => this.course()?.modules.length ?? 0);
  lessonsCount = computed(() => {
    let lessonsTotal = 0;
    this.course()?.modules.forEach((module) => {
      lessonsTotal += module.lessons.length;
    });
    return lessonsTotal;
  });

  openDeleteModal() {
    const selectedCourse = this.course();
    if (!selectedCourse) return;

    this.dialog
      .open(DeleteCourse, {
        data: selectedCourse,
        width: '420px',
        panelClass: 'delete-course-dialog',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((deleted) => {
        if (deleted) this.deleted.emit();
      });
  }
}
