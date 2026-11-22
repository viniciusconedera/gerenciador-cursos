import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CourseServie } from '../../../core/services/course.service';
import { course } from '../../../core/services/course.interfaces';

@Component({
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  selector: 'app-delete-course',
  styleUrl: './delete-course.css',
  templateUrl: './delete-course.html',
})
export class DeleteCourse {
  readonly course = inject<course>(MAT_DIALOG_DATA);
  readonly deleting = signal(false);
  readonly errorMessage = signal('');

  private readonly dialogRef = inject(MatDialogRef<DeleteCourse>);
  private readonly courseService = inject(CourseServie);

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.deleting.set(true);
    this.errorMessage.set('');

    this.courseService.deleteCourse(this.course.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {
        this.deleting.set(false);
        this.errorMessage.set('Nao foi possivel excluir o curso.');
      },
    });
  }
}
