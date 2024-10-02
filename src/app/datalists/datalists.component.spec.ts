import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalistsComponent } from './datalists.component';

describe('DatalistsComponent', () => {
  let component: DatalistsComponent;
  let fixture: ComponentFixture<DatalistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatalistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatalistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
