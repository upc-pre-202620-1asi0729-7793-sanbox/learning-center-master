import {Component, computed, inject, viewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LearningStore} from '../../../application/academic.store';
import {MatError} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Displays the category collection with table actions.
 */
@Component({
  selector: 'app-category-list',
  imports: [MatTableModule,
    MatButtonModule,
    MatError,
    MatProgressSpinner,
    MatIcon,
    MatPaginator,
    MatSort,
    MatSortHeader,
    TranslatePipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList {
  readonly store = inject(LearningStore);
  protected router = inject(Router);

  /**
   * Columns to display in the table.
   */
  displayedColumns: string[] = ['id', 'fullName', 'actions'];

  readonly sort = viewChild(MatSort);
  readonly paginator = viewChild(MatPaginator);

  /**
   * Computed data source for the table.
   */
  readonly dataSource = computed(() => {
    const source = new MatTableDataSource(this.store.categories());
    const sort = this.sort();
    if (sort) {
      source.sort = sort;
    }
    const paginator = this.paginator();
    if (paginator) {
      source.paginator = paginator;
    }
    return source;
  });

  /**
   * Navigates to the edit page for a category.
   * @param id - The ID of the category to edit.
   */
  editCategory(id: number) {
    this.router.navigate(['academic/students', id, 'edit']).then();
  }

  /**
   * Deletes a category by ID.
   * @param id - The ID of the category to delete.
   */
  deleteCategory(id: number) {
    this.store.deleteCategory(id);
  }

  /**
   * Navigates to the new category form.
   */
  navigateToNew() {
    this.router.navigate(['academic/students/new']).then();
  }
}
