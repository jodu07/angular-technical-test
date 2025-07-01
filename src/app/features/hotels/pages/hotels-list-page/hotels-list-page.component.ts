import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { HotelCardComponent } from '../../components/hotel-card/hotel-card.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
/**
 * HotelsListPageComponent.
 */
@Component({
  selector: 'app-hotels-list-page',
  standalone: true,
  imports: [
    CommonModule,
    FilterPanelComponent,
    HotelCardComponent,
    PaginatorComponent,
  ],
  templateUrl: './hotels-list-page.component.html',
  styleUrl: './hotels-list-page.component.scss',
})
export class HotelsListPageComponent {
  /** Injects the HotelService for fetching hotel data. */
  private hotelService = inject(HotelService);
  /** Holds the currently selected page number for pagination. */
  readonly currentPage = signal(1);
  /** Maximum number of hotels shown per page. */
  readonly pageSize = 9;
  /**
   * Calculates the hotels to show on the current page.
   * based on pagination and the filtered list.
   */
  readonly paginatedHotels = computed(() => {
    const hotels = this.filteredHotels();
    const start = (this.currentPage() - 1) * this.pageSize;
    return hotels.slice(start, start + this.pageSize);
  });

  /**
   * Total number of pages based on the size of the filtered hotel list.
   */
  readonly totalPages = computed(() => {
    return Math.ceil(this.filteredHotels().length / this.pageSize);
  });

  /**
   * Updates the current page number (used by the paginator).
   * @param page - The new page to navigate to.
   */
  setPage(page: number) {
    this.currentPage.set(page);
  }

  /** Reactive signal holding all hotels fetched from the API. */
  allHotels = signal<Hotel[]>([]);

  /** Filters applied to the hotel list, driven by the filter panel. */
  filters = signal({
    name: '',
    stars: [] as number[],
    minRating: 0,
    maxPrice: 1000,
  });

  /**
   * Computes the list of hotels that match the current filter criteria.
   */
  readonly filteredHotels = computed(() => {
    const list = this.allHotels();
    if (!list || list.length === 0) return [];

    const filters = this.filters();
    return list.filter((hotel) => {
      const nameMatch = hotel.name?.toLowerCase().includes(filters.name || '');
      const starMatch =
        filters.stars.length === 0 || filters.stars.includes(hotel.stars);
      const ratingMatch = hotel.rate >= filters.minRating;
      const priceMatch = hotel.price <= filters.maxPrice;
      return nameMatch && starMatch && ratingMatch && priceMatch;
    });
  });

  /**
   * Initializes the component by fetching all hotels from the service.
   */
  constructor() {
    this.hotelService.getHotels().subscribe((data) => this.allHotels.set(data));
  }

  /**
   * Updates the filters state and resets the paginator to page 1.
   * @param filters - New filter settings from the filter panel.
   */
  onFiltersChanged(filters: any) {
    this.filters.set(filters);
    this.currentPage.set(1);
  }
}
