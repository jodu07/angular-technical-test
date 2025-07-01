import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

/**
 * FilterPanelComponent.
 */
@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
  ],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent {
  /**
   * Emits updated filter values whenever any field changes.
   */
  @Output() filtersChanged = new EventEmitter<any>();
  /**
   * Reactive form instance containing all filter controls.
   */
  form: FormGroup;
  /**
   * List of available star categories for the checkbox filter.
   */
  starCategory = [1, 2, 3, 4, 5];

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
