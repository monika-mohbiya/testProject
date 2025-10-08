import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformfieldComponent } from './dynamicformfield.component';

describe('DynamicformfieldComponent', () => {
  let component: DynamicformfieldComponent;
  let fixture: ComponentFixture<DynamicformfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicformfieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicformfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
