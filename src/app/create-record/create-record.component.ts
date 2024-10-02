import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-record',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule , CommonModule , HttpClientModule],
  providers:[DataService],
  templateUrl: './create-record.component.html',
  styleUrl: './create-record.component.css'
})
export class CreateRecordComponent {
  @Input() dataListId: any;
  formStructure: any[] = [];
  dynamicForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dynamicForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dataListId = params.get('id');
      this.loadFormStructure();
    });
  }

  loadFormStructure(): void {
    this.dataService.getDataDefinitionStructure(this.dataListId).subscribe(
      (structure) => {
        console.log("s" , structure);
        this.formStructure = Object.values(structure);
        this.createForm();
      },
      (error) => console.error(error)
    );
  }

  createForm(): void {
    this.formStructure.forEach(field => {
      this.dynamicForm.addControl(
        field.key,
        this.fb.control({ value: field.defaultValue || '', disabled: false }, this.getValidators(field?.validate))
      );
    });
  }

  getValidators(field:any): any[] {
    const validators = [];
    if (field?.required) {
      validators.push(Validators.required);
    }
    if (field?.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field?.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    return validators;
  }

  onSubmit(): void {
    if (this.dynamicForm.valid) {
      this.dataService.addRecordToDataList(this.dataListId, this.dynamicForm.value).subscribe(
        () => {
          console.log('Record added successfully');
          this.router.navigate(['content/dataListRecords' , this.dataListId])
        },
        (error) => console.error(error)
      );
    }
  }

}
