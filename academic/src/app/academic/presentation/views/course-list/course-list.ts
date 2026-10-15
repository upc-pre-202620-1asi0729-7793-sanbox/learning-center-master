import {Component, computed, inject, viewChild} from '@angular/core';
import {LearningStore} from '../../../application/academic.store';
import {Router} from '@angular/router';
import {MatError} from '@angular/material/form-field';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Displays the course collection with table actions.
 */
@Component({
  selector: 'app-course-list',
  imports: [
    MatError,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatProgressSpinner,
    MatIcon,
    MatIconButton,
    MatSort,
    MatSortHeader,
    MatPaginator,
    TranslatePipe
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {
  readonly store = inject(LearningStore);
  protected router = inject(Router);

  /**
   * Columns to display in the table.
   */
  displayedColumns: string[] = ['id', 'courseName', 'student', 'actions'];

  readonly sort = viewChild(MatSort);
  readonly paginator = viewChild(MatPaginator);

  /**
   * Computed data source for the table.
   */
  readonly dataSource = computed(() => {
    const source = new MatTableDataSource(this.store.courses());
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
   * Navigates to the edit page for a course.
   * @param id - The ID of the course to edit.
   */
  editCourse(id: number) {
    this.router.navigate(['academic/enrollments', id, 'edit']).then();
  }

  /**
   * Deletes a course by ID.
   * @param id - The ID of the course to delete.
   */
  deleteCourse(id: number) {
    this.store.deleteCourse(id);
  }

  /**
   * Navigates to the new course form.
   */
  navigateToNew() {
    this.router.navigate(['academic/enrollments/new']).then();
  }
}
