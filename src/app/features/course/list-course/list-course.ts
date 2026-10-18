import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseServie } from '../../../core/services/course.service';
import { CardCourse } from '../card-course/card-course';

@Component({
  imports: [CardCourse],
  selector: 'app-list-course',
  styleUrl: './list-course.css',
  templateUrl: './list-course.html',
})
export class ListCourse {
  private readonly courseService = inject(CourseServie);

  courses = computed(() => {
    if (!!this.coursesResource.error()) return [];
    return this.coursesResource.value() ?? [];
  });

  coursesResource = rxResource({
    params: () => true,
    stream: () => this.courseService.getCourses(),
  });
}
