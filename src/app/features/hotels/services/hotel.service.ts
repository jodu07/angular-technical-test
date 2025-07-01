import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { computed, signal as createSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  /** Base URL for the hotel API endpoint. */
  private baseUrl = 'http://localhost:3000/hotels';

  constructor(private http: HttpClient) {}

  /**
   * Internal signal holding the list of hotels once fetched.
   */
  private _hotels = createSignal<Hotel[]>([]);

  /**
   * Public computed signal exposing the current hotel list.
   * Can be consumed reactively from components.
   */
  readonly hotels = computed(() => this._hotels());

  /**
   * Fetches hotel data from the API and updates the internal signal.
   * On error, resets the hotel list to an empty array.
   */
  fetchHotels() {
    this.http.get<Hotel[]>(this.baseUrl).subscribe({
      next: (data) => this._hotels.set(data),
      error: (err) => {
        this._hotels.set([]);
      },
    });
  }

  /**
   * Alternative method that returns hotel data as an Observable.
   * Can be used for non-signal-based patterns or legacy interop.
   */
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.baseUrl);
  }
}
