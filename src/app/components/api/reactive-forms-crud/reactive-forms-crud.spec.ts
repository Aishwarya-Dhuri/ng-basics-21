import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsCrud } from './reactive-forms-crud';

describe('ReactiveFormsCrud', () => {
  let component: ReactiveFormsCrud;
  let fixture: ComponentFixture<ReactiveFormsCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
