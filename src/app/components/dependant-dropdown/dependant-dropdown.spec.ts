import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependantDropdown } from './dependant-dropdown';

describe('DependantDropdown', () => {
  let component: DependantDropdown;
  let fixture: ComponentFixture<DependantDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependantDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependantDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
