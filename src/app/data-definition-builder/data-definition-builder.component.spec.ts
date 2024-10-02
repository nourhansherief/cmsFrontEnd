import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDefinitionBuilderComponent } from './data-definition-builder.component';

describe('DataDefinitionBuilderComponent', () => {
  let component: DataDefinitionBuilderComponent;
  let fixture: ComponentFixture<DataDefinitionBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDefinitionBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataDefinitionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
