import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoncardComponent } from './commoncard.component';

describe('CommoncardComponent', () => {
  let component: CommoncardComponent;
  let fixture: ComponentFixture<CommoncardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommoncardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommoncardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
