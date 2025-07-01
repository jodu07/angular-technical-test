import { TestBed } from '@angular/core/testing';

import { HotelService } from './hotel.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Hotel } from '../models/hotel.model';

describe('HotelService', () => {
  let service: HotelService;
  let httpMock: HttpTestingController;

  const mockHotels: Hotel[] = [
    {
      id: '1',
      name: 'Hotel A',
      image: 'img-a.jpg',
      address: 'Address A',
      stars: 3,
      rate: 4.2,
      price: 150,
    },
    {
      id: '2',
      name: 'Hotel B',
      image: 'img-b.jpg',
      address: 'Address B',
      stars: 5,
      rate: 4.9,
      price: 390,
    },
  ];

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelService],
    });
    service = TestBed.inject(HotelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch hotels via getHotels()', () => {
    service.getHotels().subscribe((hotels) => {
      expect(hotels.length).toBe(2);
      expect(hotels).toEqual(mockHotels);
    });

    const req = httpMock.expectOne('http://localhost:3000/hotels');
    expect(req.request.method).toBe('GET');
    req.flush(mockHotels);
  });

  it('should populate the signal in fetchHotels()', () => {
    service.fetchHotels();

    const req = httpMock.expectOne('http://localhost:3000/hotels');
    expect(req.request.method).toBe('GET');
    req.flush(mockHotels);

    expect(service.hotels()).toEqual(mockHotels);
  });

  it('should handle HTTP error gracefully in fetchHotels()', () => {
    spyOn(console, 'error');

    service.fetchHotels();

    const req = httpMock.expectOne('http://localhost:3000/hotels');
    req.error(new ProgressEvent('Network error'), { status: 500 });

    expect(service.hotels()).toEqual([]);
  });
});
