import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostApi } from './post-api';

describe('PostApi', () => {
  let component: PostApi;
  let fixture: ComponentFixture<PostApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostApi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
