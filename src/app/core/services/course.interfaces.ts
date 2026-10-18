export interface CourseListResponse {
  courses: Array<course>;
}

export interface course {
  id: string;
  name: string;
  description: string;
  category: string;
  modules: Array<module>;
}

interface module {
  id: string;
  name: string;
  lessons: Array<lesson>;
}

interface lesson {
  id: string;
  name: string;
}
