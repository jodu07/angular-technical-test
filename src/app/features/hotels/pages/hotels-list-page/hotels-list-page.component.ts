import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { HotelCardComponent } from '../../components/hotel-card/hotel-card.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';

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
  private hotelService = inject(HotelService);

  readonly currentPage = signal(1);
  readonly pageSize = 9;

  readonly paginatedHotels = computed(() => {
    const hotels = this.filteredHotels();
    const start = (this.currentPage() - 1) * this.pageSize;
    return hotels.slice(start, start + this.pageSize);
  });

  readonly totalPages = computed(() => {
    return Math.ceil(this.filteredHotels().length / this.pageSize);
  });

  setPage(page: number) {
    this.currentPage.set(page);
  }

  allHotels = signal<Hotel[]>([]);
  filters = signal({
    name: '',
    stars: [] as number[],
    minRating: 0,
    maxPrice: 1000,
  });

  filteredHotels = computed(() => {
    const list = this.allHotels();
    if (!list || list.length === 0) return [];

    return list.filter((hotel) => {
      const filters = this.filters();
      const nameMatch = hotel.name?.toLowerCase().includes(filters.name || '');
      const starMatch =
        this.filters().stars.length === 0 ||
        this.filters().stars.includes(hotel.stars);
      const ratingMatch = hotel.rate >= this.filters().minRating;
      const priceMatch = hotel.price <= this.filters().maxPrice;
      return nameMatch && starMatch && ratingMatch && priceMatch;
    });
  });

  constructor() {
    this.hotelService.getHotels().subscribe((data) => this.allHotels.set(data));
  }

  onFiltersChanged(filters: any) {
    this.filters.set(filters);
    this.currentPage.set(1);
  }
}
