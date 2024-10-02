import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDataListComponent } from './create-data-list.component';

describe('CreateDataListComponent', () => {
  let component: CreateDataListComponent;
  let fixture: ComponentFixture<CreateDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDataListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
