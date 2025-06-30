import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { HotelCardComponent } from '../../components/hotel-card/hotel-card.component';

@Component({
  selector: 'app-hotels-list-page',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent, HotelCardComponent],
  templateUrl: './hotels-list-page.component.html',
  styleUrl: './hotels-list-page.component.scss',
})
export class HotelsListPageComponent {
  private hotelService = inject(HotelService);

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
  }
}

/** 
 * filteredHotels = computed(() => {
    const list = this.allHotels();
    if (!list || list.length === 0) return [];

    return list.filter((hotel) => {
      const filters = this.filters();
      const nameMatch = hotel.name?.toLowerCase().includes(filters.name || '');
      const starMatch =
        filters.stars.length === 0 || filters.stars.includes(hotel.stars);
      const ratingMatch = hotel.rate >= filters.minRating;
      const priceMatch = hotel.price <= filters.maxPrice;
      console.log('Aplicando filtros:', filters, 'Resultados:', list.length);
      return nameMatch && starMatch && ratingMatch && priceMatch;
    });
  });

  constructor() {
    this.hotelService.getHotels().subscribe((data) => {
      console.log('Hoteles recibidos:', data);
      this.allHotels.set(data);
    });
  }

  }); */
