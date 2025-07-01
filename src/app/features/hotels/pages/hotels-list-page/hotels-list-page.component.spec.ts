import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { HotelsListPageComponent } from './hotels-list-page.component';
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Hotel A',
    image: 'image-a.jpg',
    address: 'Address A',
    stars: 4,
    rate: 4.5,
    price: 200,
  },
  {
    id: '2',
    name: 'Hotel B',
    image: 'image-b.jpg',
    address: 'Address B',
    stars: 3,
    rate: 3.7,
    price: 150,
  },
  {
    id: '3',
    name: 'Budget Inn',
    image: 'image-c.jpg',
    address: 'Address C',
    stars: 2,
    rate: 2.5,
    price: 80,
  },
];

describe('HotelsListPageComponent', () => {
  let component: HotelsListPageComponent;
  let fixture: ComponentFixture<HotelsListPageComponent>;
  let hotelServiceSpy: jasmine.SpyObj<HotelService>;

  beforeEach(async () => {
    hotelServiceSpy = jasmine.createSpyObj('HotelService', ['getHotels']);
    hotelServiceSpy.getHotels.and.returnValue(of(mockHotels));
    await TestBed.configureTestingModule({
      imports: [HotelsListPageComponent, HttpClientModule],
    })
      .overrideComponent(HotelsListPageComponent, {
        set: {
          providers: [{ provide: HotelService, useValue: hotelServiceSpy }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HotelsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filters when onFiltersChanged is called', () => {
    const newFilters = {
      name: 'budget',
      stars: [2],
      minRating: 2,
      maxPrice: 100,
    };

    component.onFiltersChanged(newFilters);
    expect(component.filters()).toEqual(newFilters);
  });

  it('should load hotels on init', fakeAsync(() => {
    fixture = TestBed.createComponent(HotelsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    tick();

    expect(component.allHotels()).toEqual(mockHotels);
    expect(hotelServiceSpy.getHotels).toHaveBeenCalled();
  }));

  it('should return all hotels if no filters are applied', fakeAsync(() => {
    tick();
    const filtered = component.filteredHotels();
    expect(filtered.length).toBe(3);
  }));

  it('should filter hotels based on filters', fakeAsync(() => {
    tick();
    const filters = {
      name: 'hotel',
      stars: [3, 4],
      minRating: 3,
      maxPrice: 250,
    };

    component.onFiltersChanged(filters);
    const filtered = component.filteredHotels();

    expect(filtered.length).toBe(2);
    expect(
      filtered.every((hotel) => hotel.name.toLowerCase().includes('hotel'))
    ).toBeTrue();
    expect(
      filtered.every((hotel) => filters.stars.includes(hotel.stars))
    ).toBeTrue();
  }));
});
