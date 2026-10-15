import {inject, Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';

/**
 * Provides paginator labels that follow the active application language.
 */
@Injectable()
export class TranslatedPaginatorIntl extends MatPaginatorIntl {
  private readonly translate = inject(TranslateService);

  /**
   * Creates an instance of TranslatedPaginatorIntl and refreshes labels on language changes.
   */
  constructor() {
    super();
    this.updateLabels();
    this.translate.onLangChange.subscribe(() => this.updateLabels());
    this.translate.onTranslationChange.subscribe(() => this.updateLabels());
  }

  /**
   * Builds the range label for the current page.
   * @param page - Zero-based page index.
   * @param pageSize - Number of items per page.
   * @param length - Total number of items.
   * @returns Localized range label.
   */
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant('paginator-range-empty', {length});
    }
    const start = page * pageSize;
    const end = Math.min(start + pageSize, length);
    return this.translate.instant('paginator-range', {start: start + 1, end, length});
  };

  /**
   * Reloads every paginator label from the active translation set.
   */
  private updateLabels = (): void => {
    this.itemsPerPageLabel = this.translate.instant('paginator-items-per-page');
    this.nextPageLabel = this.translate.instant('paginator-next-page');
    this.previousPageLabel = this.translate.instant('paginator-previous-page');
    this.firstPageLabel = this.translate.instant('paginator-first-page');
    this.lastPageLabel = this.translate.instant('paginator-last-page');
    this.changes.next();
  };
}
