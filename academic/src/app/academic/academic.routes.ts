import {Routes} from '@angular/router';

const courseList = () => import('./presentation/views/course-list/course-list').then(m => m.CourseList);
const courseForm = () => import('./presentation/views/course-form/course-form').then(m => m.CourseForm);
const categoryList = () => import('./presentation/views/category-list/category-list').then(m => m.CategoryList);
const categoryForm = () => import('./presentation/views/category-form/category-form').then(m => m.CategoryForm);

/**
 * Route tree for learning presentation views.
 */
export const academicRoutes: Routes = [
  { path: 'enrollments',              loadComponent: courseList },
  { path: 'enrollments/new',          loadComponent: courseForm },
  { path: 'enrollments/:id/edit',     loadComponent: courseForm },
  { path: 'students',           loadComponent: categoryList },
  { path: 'students/new',       loadComponent: categoryForm },
  { path: 'students/:id/edit',  loadComponent: categoryForm }
];
