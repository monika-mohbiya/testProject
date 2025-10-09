import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasViewCardComponent } from './das-view-card.component';

describe('DasViewCardComponent', () => {
  let component: DasViewCardComponent;
  let fixture: ComponentFixture<DasViewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasViewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
