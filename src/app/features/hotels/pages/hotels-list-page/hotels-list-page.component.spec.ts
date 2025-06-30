import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsListPageComponent } from './hotels-list-page.component';

describe('HotelsListPageComponent', () => {
  let component: HotelsListPageComponent;
  let fixture: ComponentFixture<HotelsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
