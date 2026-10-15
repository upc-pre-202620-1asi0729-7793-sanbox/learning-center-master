import {computed, inject, Service, Signal, signal} from '@angular/core';
import {StudentsEntity} from '../domain/model/students.entity'; //category
import {EnrollmentsEntity} from '../domain/model/enrollments.entity'; //course
import {AcademicService} from '../infrastructure/academic.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

@Service()
export class LearningStore {
  private readonly learningService = inject(AcademicService);

  /**
   * Computed signal for the count of courses.
   */
  readonly courseCount = computed(() => this.courses().length);

  /**
   * Computed signal for the count of categories.
   */
  readonly categoryCount = computed(() => this.categories().length);

  private readonly coursesSignal = signal<EnrollmentsEntity[]>([]);

  /**
   * Readonly signal for the list of courses.
   */
  readonly courses = this.coursesSignal.asReadonly();

  private readonly categoriesSignal = signal<StudentsEntity[]>([]);

  /**
   * Readonly signal for the list of categories.
   */
  readonly categories = this.categoriesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Creates an instance of LearningStore and loads initial data.
   */
  constructor() {
    this.loadCategories();
    this.loadCourses();
  }

  /**
   * Selects a category by identifier.
   * @param id - Category identifier.
   * @returns Reactive selection for the requested category.
   */
  getCategoryById = (id: number): Signal<StudentsEntity | undefined> =>
    computed(() => id ? this.categories().find(c => c.id === id) : undefined);

  /**
   * Selects a course by identifier.
   * @param id - Course identifier.
   * @returns Reactive selection for the requested course.
   */
  getCourseById = (id: number): Signal<EnrollmentsEntity | undefined> => {
    return computed(() => id ? this.courses().find(c => c.id === id) : undefined);
  }

  /**
   * adds a new course.
   * @param course - The course to add.
   */
  addCourse = (course: EnrollmentsEntity): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningService.createCourse(course).pipe(retry(2)).subscribe({
      next: createdCourse => {
        createdCourse = this.assignCategoryToCourse(createdCourse);
        this.coursesSignal.update(courses => [...courses, createdCourse]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-create-enrollment'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Updates an existing course.
   * @param updatedCourse - The course to update.
   */
  updateCourse = (updatedCourse: EnrollmentsEntity): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningService.updateCourse(updatedCourse).pipe(retry(2)).subscribe({
      next: course => {
        course = this.assignCategoryToCourse(course);
        this.coursesSignal.update(courses =>
          courses.map(c => c.id === course.id ? course : c)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-update-enrollment'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes a course by ID.
   * @param id - The ID of the course to delete.
   */
  deleteCourse = (id: number): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningService.deleteCourse(id).pipe(retry(2)).subscribe({
      next: () => {
        this.coursesSignal.update(courses => courses.filter(c => c.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-delete-enrollment'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Adds a new category.
   * @param category - The category to add.
   */
  addCategory = (category: StudentsEntity): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningService.createCategory(category).pipe(retry(2)).subscribe({
      next: createdCategory => {
        this.categoriesSignal.update(categories => [...categories, createdCategory]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-create-student'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Updates an existing category.
   * @param updatedCategory - The category to update.
   */
  updateCategory = (updatedCategory: StudentsEntity): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningService.updateCategory(updatedCategory).pipe(retry(2)).subscribe({
      next: category => {
        this.categoriesSignal.update(categories =>
          categories.map(c => c.id === category.id ? category : c)
        );
        this.assignCategoriesToCourses();
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-update-student'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes a category by ID.
   * @param id - The ID of the category to delete.
   */
  deleteCategory = (id: number): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningService.deleteCategory(id).pipe(retry(2)).subscribe({
      next: () => {
        this.categoriesSignal.update(categories => categories.filter(c => c.id !== id));
        this.assignCategoriesToCourses();
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-delete-student'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads all courses from the API.
   */
  private loadCourses = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningService.getCourses().pipe(takeUntilDestroyed()).subscribe({
      next: courses => {
        this.coursesSignal.set(courses);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
        this.assignCategoriesToCourses();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-load-enrollments'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Loads all categories from the API.
   */
  private loadCategories = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningService.getCategories().pipe(takeUntilDestroyed()).subscribe({
      next: categories => {
        this.categoriesSignal.set(categories);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
        this.assignCategoriesToCourses();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-load-students'));
        this.loadingSignal.set(false);
      }
    });
  }

  private assignCategoriesToCourses = (): void => {
    this.coursesSignal.update(courses => courses.map(course => this.assignCategoryToCourse(course)));
  };

  private assignCategoryToCourse = (course: EnrollmentsEntity): EnrollmentsEntity => {
    const studentId = course.studentId ?? 0;
    course.student = studentId ? this.getCategoryById(studentId)() ?? null : null;
    return course;
  }

  /**
   * Normalizes unknown errors into a translation key for the error message.
   * @param error - Source error.
   * @param fallback - Translation key used when details are unavailable.
   * @returns Translation key of the message to display.
   */
  private formatError = (error: unknown, fallback: string): string => {
    if (error instanceof Error && error.message.includes('Resource not found')) {
      return 'error-not-found';
    }
    return fallback;
  }
}
