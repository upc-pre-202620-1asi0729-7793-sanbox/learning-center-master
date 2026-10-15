import {Component, effect, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningStore} from '../../../application/academic.store';
import {StudentsEntity} from '../../../domain/model/students.entity';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Creates and edits category entities.
 */
@Component({
  selector: 'app-category-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(LearningStore);

  /**
   * Form group for the category form.
   */
  form = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  /**
   * Indicates if the form is in edit mode.
   */
  isEdit = false;

  /**
   * The ID of the category being edited, or null for new categories.
   */
  categoryId: number | null = null;

  /**
   * Creates an instance of CategoryForm and initializes the form based on route parameters.
   */
  constructor() {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.categoryId;
    });
    effect(() => {
      const categories = this.store.categories();
      if (!this.isEdit || this.form.dirty) return;
      const category = categories.find(c => c.id === this.categoryId);
      if (category) {
        this.form.patchValue({ name: category.fullName });
      }
    });
  }

  /**
   * Submits the form to create or update the category.
   */
  submit() {
    if (this.form.invalid) return;

    const category: StudentsEntity = new StudentsEntity({
      id: this.categoryId ?? 0,
      fullName: this.form.value.name!
    });

    if (this.isEdit) {
      this.store.updateCategory(category);
    } else {
      this.store.addCategory(category);
    }

    this.router.navigate(['academic/students']).then();
  }
}
