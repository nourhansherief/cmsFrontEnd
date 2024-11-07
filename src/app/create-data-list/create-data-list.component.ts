import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConvertXmlToJson } from '../../Utilities/HelperFunctions/xmlToJson';
@Component({
  selector: 'app-create-data-list',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule , HttpClientModule , CommonModule],
  providers:[ DataService ],
  templateUrl: './create-data-list.component.html',
  styleUrl: './create-data-list.component.css'
})
export class CreateDataListComponent {

  dataListForm: FormGroup;
  dataDefinitions: any[] = [];
  xmlToJson : any = ConvertXmlToJson
  
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.dataListForm = this.fb.group({
      name: ['', Validators.required],
      dataDefinitionId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.dataService.getDataDefinitions().subscribe(
      (data: any) => {
        this.dataDefinitions = data?.data;
      },
      (error) => {
        console.error('Error fetching data definitions', error);
      }
    );
  }

  onSubmit(): void {
    console.log("Nav")
    this.router.navigate(['content/dataLists']);
    if (this.dataListForm.valid) {
      // this.dataService.createDataList(this.dataListForm.value).subscribe(
      //   (response) => {
      //     console.log('Data list created successfully', response);
      //     this.router.navigate(['content/dataLists']);
      //   },
      //   (error) => {
      //     console.error('Error creating data list', error);
      //   }
      // );
    }
  }
}
