import {inject, Service} from '@angular/core';
import {BaseApi} from '../../../shared/infrastructure/base-api';
import {StudentsEntity} from '../domain/model/students.entity'; //category
import {EnrollmentsEntity} from '../domain/model/enrollments.entity'; //course
import {HttpClient} from '@angular/common/http';
import {EnrollmentsApiEndpoint} from './../infrastructure/enrollments.api'; // course
import {StudentsApiEndpoint} from './../infrastructure/students.api';       //category
import {Observable} from 'rxjs';

/**
 * Infrastructure facade for course and category endpoint operations.
 */
@Service()
export class AcademicService extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly studentsEndpoint = new StudentsApiEndpoint(this.http);
  private readonly EnrollmentsEndpoint = new EnrollmentsApiEndpoint(this.http);

  /**
   * Retrieves all courses.
   * @returns Stream with the course collection.
   */
  getCourses = (): Observable<EnrollmentsEntity[]> =>
    this.EnrollmentsEndpoint.getAll();

  /**
   * Retrieves a single course by ID.
   * @param id - The ID of the course.
   * @returns An Observable of the Course object.
   */
  getCourse = (id: number): Observable<EnrollmentsEntity> =>
    this.EnrollmentsEndpoint.getById(id);

  /**
   * Creates a new course.
   * @param course - The course to create.
   * @returns An Observable of the created Course object.
   */
  createCourse = (course: EnrollmentsEntity): Observable<EnrollmentsEntity> =>
    this.EnrollmentsEndpoint.create(course);

  /**
   * Updates an existing course.
   * @param course - The course to update.
   * @returns An Observable of the updated Course object.
   */
  updateCourse = (course: EnrollmentsEntity): Observable<EnrollmentsEntity> =>
    this.EnrollmentsEndpoint.update(course, course.id);

  /**
   * Deletes a course by ID.
   * @param id - The ID of the course to delete.
   * @returns An Observable of void.
   */
  deleteCourse = (id: number): Observable<void> =>
    this.EnrollmentsEndpoint.delete(id);

  /**
   * Retrieves all categories.
   * @returns Stream with the category collection.
   */
  getCategories = (): Observable<StudentsEntity[]> =>
    this.studentsEndpoint.getAll();

  /**
   * Retrieves a single category by ID.
   * @param id - The ID of the category.
   * @returns An Observable of the Category object.
   */
  getCategory = (id: number): Observable<StudentsEntity> =>
    this.studentsEndpoint.getById(id);

  /**
   * Creates a new category.
   * @param category - The category to create.
   * @returns An Observable of the created Category object.
   */
  createCategory = (category: StudentsEntity): Observable<StudentsEntity> =>
    this.studentsEndpoint.create(category);

  /**
   * Updates an existing category.
   * @param category - The category to update.
   * @returns An Observable of the updated Category object.
   */
  updateCategory = (category: StudentsEntity): Observable<StudentsEntity> =>
    this.studentsEndpoint.update(category, category.id);

  /**
   * Deletes a category by ID.
   * @param id - The ID of the category to delete.
   * @returns An Observable of void.
   */
  deleteCategory = (id: number): Observable<void> =>
    this.studentsEndpoint.delete(id);
}
