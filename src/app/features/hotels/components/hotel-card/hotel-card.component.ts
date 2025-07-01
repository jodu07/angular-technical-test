import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Hotel } from '../../models/hotel.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.scss',
})
export class HotelCardComponent {
  @Input({ required: true }) hotel!: Hotel;
}
