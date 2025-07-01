import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * PaginatorComponent.
 */
@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  /**
   * Current active page (1-based index).
   * The button for this page is highlighted.
   */
  @Input() currentPage = 1;

  /**
   * Total number of available pages.
   * Determines how many page buttons are rendered.
   */
  @Input() totalPages = 1;

  /**
   * Emits the selected page number when a new page is clicked.
   */
  @Output() pageChange = new EventEmitter<number>();

  /**
   * Generates an array of page numbers from 1 to totalPages.
   * Used for rendering the pagination buttons.
   */
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  /**
   * Handles page selection.
   * Emits `pageChange` only if the selected page is not already active.
   * @param page - The new page number selected by the user.
   */
  selectPage(page: number) {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
