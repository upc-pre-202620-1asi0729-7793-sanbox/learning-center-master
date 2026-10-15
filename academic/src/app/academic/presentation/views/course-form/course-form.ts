import {Component, effect, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningStore} from '../../../application/academic.store';
import {EnrollmentsEntity} from '../../../domain/model/enrollments.entity';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Creates and edits course entities.
 */
@Component({
  selector: 'app-course-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInput,
    TranslatePipe,
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css'
})
export class CourseForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(LearningStore);

  /**
   * Form-group for the course form.
   */
    form = this.fb.group({
    id:  new FormControl<number | null>(null),
    studentId:  new FormControl<number | null>(null, { validators: [Validators.required] }),
    courseName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  /**
   * Signal for the list of categories.
   */
  categories = this.store.categories;

  /**
   * Indicates if the form is in edit mode.
   */
  isEdit = false;

  /**
   * The ID of the course being edited, or null for new courses.
   */
  courseId: number | null = null;

  /**
   * Creates an instance of CourseForm and initializes the form based on route parameters.
   */
  constructor() {
    this.route.params.subscribe(params => {
      this.courseId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.courseId;
    });
    effect(() => {
      const courses = this.store.courses();
      if (!this.isEdit || this.form.dirty) return;
      const course = courses.find(c => c.id === this.courseId);
      if (course) {
        this.form.patchValue({
          id: course.id,
          studentId: course.studentId,
          courseName: course.courseName,
        });
      }
    });
  }

  /**
   * Submits the form to create or update the course.
   */
  submit() {
    if (this.form.invalid) return;
    const course: EnrollmentsEntity = new EnrollmentsEntity({
      id: this.courseId ?? 0,
      studentId: this.form.value.studentId!,
      courseName: this.form.value.courseName!,
      student: null
    });

    if (this.isEdit) {
      this.store.updateCourse(course);
    } else {
      this.store.addCourse(course);
    }

    this.router.navigate(['academic/enrollments']).then();
  }
}
