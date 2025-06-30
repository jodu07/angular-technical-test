import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilterPanelComponent } from "./features/hotels/components/filter-panel/filter-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FilterPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'apps-angular-technical-test';
}
