import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of page buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.totalPages = 5;
    component.currentPage = 1;
    fixture.detectChanges();

    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(5);
    expect(buttons[0].textContent?.trim()).toBe('1');
    expect(buttons[4].textContent?.trim()).toBe('5');
  });

  it('should emit pageChange event when a different page is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.totalPages = 3;
    component.currentPage = 1;
    spyOn(component.pageChange, 'emit');
    fixture.detectChanges();

    const buttons = compiled.querySelectorAll('button');
    (buttons[1] as HTMLButtonElement).click(); // page 2

    expect(component.pageChange.emit).toHaveBeenCalledOnceWith(2);
  });

  it('should not emit pageChange event when the current page is clicked again', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.totalPages = 3;
    component.currentPage = 2;
    spyOn(component.pageChange, 'emit');
    fixture.detectChanges();

    const buttons = compiled.querySelectorAll('button');
    (buttons[1] as HTMLButtonElement).click();

    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should highlight the current page with correct class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.totalPages = 4;
    component.currentPage = 3;
    fixture.detectChanges();

    const buttons = compiled.querySelectorAll('button');
    const activeButton = buttons[2];

    expect(activeButton.classList).toContain('bg-blue-600');
    expect(activeButton.classList).toContain('text-white');
  });
});
