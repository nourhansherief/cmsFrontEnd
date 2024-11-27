import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-record',
  standalone: true,
  imports: [HttpClientModule , FormsModule , ReactiveFormsModule , CommonModule],
  providers:[DataService],
  templateUrl: './edit-record.component.html',
  styleUrl: './edit-record.component.css'
})
export class EditRecordComponent {

  id:any;
  dataListId:any;
  formStructure: any[] = [];
  dynamicForm: FormGroup;
  data:any;

 

  constructor(private dataService: DataService,
    private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.dynamicForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dataListId = params.get('dataList');
      this.id = params.get('id');
      if (this.id) {
        this.dataService.findRecordById(this.id).subscribe(
          (data) => {
            console.log("data" , data);
            // console.log("s" , structure);
            this.formStructure = Object.values(data?.definition);
            this.data = data?.record;
            this.createForm();
            // this.action = 'update';
            // console.log("data", data)
            // this.DataDefinitionInputValue = data?.name;
            // console.log("sss", data?.structure)
            // this.formData = JSON.stringify(Object.values(data?.structure));
            // this.triggerTextAreaSource();
            // this.formData =[...data?.structure];
            // this.dataList = data;
            // this.error = null;
          },
          (error) => {
            // this.error = error.error.message || 'An error occurred';
          }
        );
      }
    });
  }

  createForm(): void {
    this.formStructure.forEach(field => {
      this.dynamicForm.addControl(
        field.key,
        this.fb.control({ value: this.data[field.key] || '', disabled: false }, this.getValidators(field?.validate))
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
      this.dataService.updateRecord(this.dataListId , this.id, this.dynamicForm.value).subscribe(
        () => {
          console.log('Record updated successfully');
          this.router.navigate(['content/dataListRecords' , this.dataListId])
        },
        (error) => console.error(error)
      );
    }
  }
}
