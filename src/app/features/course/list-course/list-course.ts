import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseServie } from '../../../core/services/course.service';
import { CardCourse } from '../card-course/card-course';
import { FilterCourse } from '../filter-course/filter-course';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [CardCourse, FilterCourse, MatIconModule],
  selector: 'app-list-course',
  styleUrl: './list-course.css',
  templateUrl: './list-course.html',
})
export class ListCourse {
  private readonly courseService = inject(CourseServie);
  courseTitle = signal('');
  listType = signal('card');

  coursesResource = rxResource({
    params: () => true,
    stream: () => this.courseService.getCourses(),
  });

  courses = linkedSignal(() => {
    if (!!this.coursesResource.error()) return [];
    const courses = this.coursesResource.value() ?? [];
    const titleSearch = this.courseTitle().toLowerCase().trim();
    if (!titleSearch) {
      return courses;
    }
    const filteredMovies = courses.filter((course) => {
      return course.name.toLowerCase().includes(titleSearch);
    });
    return filteredMovies;
  });
}
