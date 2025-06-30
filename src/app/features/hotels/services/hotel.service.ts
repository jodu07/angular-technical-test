import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { computed, effect, signal as createSignal } from '@angular/core';
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
    this.http
      .get<Hotel[]>(this.baseUrl)
      .subscribe((data) => this._hotels.set(data));
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.baseUrl);
  }
}
