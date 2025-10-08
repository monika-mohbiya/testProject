import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCMTokenComponent } from './fcm-token.component';

describe('FCMTokenComponent', () => {
  let component: FCMTokenComponent;
  let fixture: ComponentFixture<FCMTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FCMTokenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FCMTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
