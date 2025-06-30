import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hotels-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotels-list-page.component.html',
  styleUrl: './hotels-list-page.component.scss',
})
export class HotelsListPageComponent {}
