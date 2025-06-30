import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormField,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
  ],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      stars: this.fb.group({
        1: [false],
        2: [false],
        3: [false],
        4: [false],
        5: [false],
      }),
      minRating: [0],
      maxPrice: [1000],
    });

    this.form.valueChanges.subscribe((value) => {
      const selectedStars = Object.entries(value.stars)
        .filter(([_, v]) => v)
        .map(([k, _]) => +k);

      this.filtersChanged.emit({
        name: value.name.toLowerCase(),
        stars: selectedStars,
        minRating: value.minRating,
        maxPrice: value.maxPrice,
      });
    });
  }
}
