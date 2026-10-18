import { Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { course } from '../../../core/services/course.interfaces';

@Component({
  imports: [MatIconModule],
  selector: 'app-card-course',
  styleUrl: './card-course.css',
  templateUrl: './card-course.html',
})
export class CardCourse {
  course = input<course>();
  modulesCount = computed(() => this.course()?.modules.length ?? 0);
  lessonsCount = computed(() => {
    let lessonsTotal = 0;
    this.course()?.modules.forEach((module) => {
      lessonsTotal += module.lessons.length;
    });
    return lessonsTotal;
  });
}
