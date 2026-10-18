import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { course } from './course.interfaces';

@Service()
export class CourseServie {
  private baseUrl = 'http://localhost:3000';
  private readonly httpCliente = inject(HttpClient);

  getCourses() {
    return this.httpCliente.get<Array<course>>(this.baseUrl + '/courses');
  }
}
