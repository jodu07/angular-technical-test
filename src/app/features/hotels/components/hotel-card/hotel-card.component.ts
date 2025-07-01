import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Hotel } from '../../models/hotel.model';
import { MatCardModule } from '@angular/material/card';

/**
 * HotelCardComponent.
 */
@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.scss',
})
export class HotelCardComponent {
  /**
   * The hotel to display. Required input.
   */
  @Input({ required: true }) hotel!: Hotel;
}
