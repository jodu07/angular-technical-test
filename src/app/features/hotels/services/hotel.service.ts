import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { computed, signal as createSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private baseUrl = 'http://localhost:3000/hotels';
  constructor(private http: HttpClient) {}

  private _hotels = createSignal<Hotel[]>([]);
  hotels = computed(() => this._hotels());

  fetchHotels() {
    this.http.get<Hotel[]>(this.baseUrl).subscribe({
      next: (data) => this._hotels.set(data),
      error: (err) => {
        this._hotels.set([]);
      },
    });
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.baseUrl);
  }
}
