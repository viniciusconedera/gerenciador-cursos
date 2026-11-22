import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [FormsModule, MatIconModule],
  selector: 'app-filter-course',
  styleUrl: './filter-course.css',
  templateUrl: './filter-course.html',
})
export class FilterCourse {
  title = model('');

  clearFilter() {
    this.title.set('');
  }
}
