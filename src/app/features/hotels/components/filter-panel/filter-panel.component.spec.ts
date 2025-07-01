import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPanelComponent } from './filter-panel.component';

fdescribe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    const form = component.form.value;
    expect(form.name).toBe('');
    expect(form.minRating).toBe(0);
    expect(form.maxPrice).toBe(1000);
    expect(form.stars['1']).toBeFalse();
    expect(form.stars['5']).toBeFalse();
  });

  it('should emit transformed filters when form changes', () => {
    spyOn(component.filtersChanged, 'emit');

    component.form.patchValue({
      name: 'Hilton',
      stars: { 3: true, 4: true },
      minRating: 3.5,
      maxPrice: 600,
    });

    fixture.detectChanges();

    const expected = {
      name: 'hilton',
      stars: [3, 4],
      minRating: 3.5,
      maxPrice: 600,
    };

    expect(component.filtersChanged.emit).toHaveBeenCalledWith(expected);
  });

  it('should emit empty stars array if no category is selected', () => {
    spyOn(component.filtersChanged, 'emit');

    component.form.patchValue({
      name: 'Soho',
      stars: { 1: false, 2: false, 3: false, 4: false, 5: false },
    });

    fixture.detectChanges();

    const lastCall = (
      component.filtersChanged.emit as jasmine.Spy
    ).calls.mostRecent().args[0];
    expect(lastCall.stars.length).toBe(0);
  });

  it('should lowercase the name before emitting', () => {
    spyOn(component.filtersChanged, 'emit');

    component.form.patchValue({ name: 'Grand Royal' });

    fixture.detectChanges();

    const result = (
      component.filtersChanged.emit as jasmine.Spy
    ).calls.mostRecent().args[0];
    expect(result.name).toBe('grand royal');
  });
});
