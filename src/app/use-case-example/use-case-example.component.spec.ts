import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseExampleComponent } from './use-case-example.component';

describe('UseCaseExampleComponent', () => {
  let component: UseCaseExampleComponent;
  let fixture: ComponentFixture<UseCaseExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseCaseExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UseCaseExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
