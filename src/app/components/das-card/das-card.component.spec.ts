import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasCardComponent } from './das-card.component';

describe('DasCardComponent', () => {
  let component: DasCardComponent;
  let fixture: ComponentFixture<DasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
