import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContentExampleComponent } from './all-content-example.component';

describe('AllContentExampleComponent', () => {
  let component: AllContentExampleComponent;
  let fixture: ComponentFixture<AllContentExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllContentExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllContentExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
