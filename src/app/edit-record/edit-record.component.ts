import { Component, signal, WritableSignal } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { HttpClientModule } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "../../Shared/Components/loader/loader.component";

@Component({
  selector: "app-edit-record",
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent,
  ],
  providers: [DataService],
  templateUrl: "./edit-record.component.html",
  styleUrl: "./edit-record.component.css",
})
export class EditRecordComponent {
  recordId: any;
  dataListId: any;
  formStructure: any[] = [];
  dynamicForm: FormGroup;
  data: any;
  dataDefinitionData: any = [];
  currentLanguage: any = "en";
  values: any = { en: [], ar: [] };
  dataListValues: any;
  isValid: Boolean = true;
  isLoading: Boolean = true;
  public loadControls: WritableSignal<boolean> = signal(false);

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.dynamicForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.dataListId = params.get("dataList");
      this.recordId = params.get("id");
      if (this.recordId) {
        this.dataService.findRecordById(this.recordId).subscribe(
          (data) => {
            this.isLoading = false;
            console.log("data", data);
            // console.log("s" , structure);
            this.getDataDefinitionForRecord(data[0].RECORDSETID);
            console.log(this.dataDefinitionData);
            //this.formStructure = Object.values(data?.definition);
            this.data = data[0];

            console.log(this.formStructure);

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

  getDataDefinitionForRecord(recordSetId: any) {
    this.dataService.getSingleRecordSet(recordSetId).subscribe(
      (data) => {
        this.loadControls() && this.loadControls.set(false);
        this.formStructure = Object.values(
          data[0]?.DDMSTRUCTUREID?.DEFINITION?.fields
        );
        console.log(data);
        this.dataDefinitionData = data[0];
        if(data[0]?.DDMSTRUCTUREID?.PARENTSTRUCTUREID != 0) {
          this.dataService.getDataDefinition(
            data[0]?.DDMSTRUCTUREID?.PARENTSTRUCTUREID
          ).subscribe((data) => {
            let PARENTSTRUCTUREID = data[0]?.DEFINITION?.fields[0];
            console.log("parent" , PARENTSTRUCTUREID)
            this.formStructure.unshift(PARENTSTRUCTUREID);
            console.log("form" , this.formStructure)
            this.createForm();
          })
        } else {

          this.createForm();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createForm(): void {
    let parsingData =
      typeof this.data.DATA_ == "string"
        ? JSON.parse(this.data.DATA_)
        : this.data.DATA_;
    this.dataListValues = parsingData.fieldValues;
    console.log(this.formStructure);
    console.log(this.dataListValues);
    this.formStructure.forEach((field) => {
      this.dataListValues.forEach((ddlField: any) => {
        if (field?.key == ddlField?.name) {
          this.dynamicForm.addControl(
            field?.key,
            this.fb.control(
              {
                value:
                  this.currentLanguage === "en"
                    ? ddlField?.value?.en_US
                    : ddlField?.value?.ar_SA,
                disabled: false,
              },
              this.getValidators(field?.validate)
            )
          );
        }
      });
    });

    this.dynamicForm.valueChanges.subscribe((data) => {
      if (this.currentLanguage == "en") {
        if (data) {
          this.values.en = [];
          this.values?.en?.push(data);
          this.values.ar =
            this.values.ar.length >= 1
              ? this.values.ar
              : this.transformedObject(this.dataListValues, "ar_SA");
        }
      } else if (this.currentLanguage == "ar") {
        if (data) {
          this.values.ar = [];
          this.values?.ar?.push(data);
          this.values.en =
            this.values.en.length >= 1
              ? this.values.en
              : this.transformedObject(this.dataListValues, "en_US");
        }
      }
    });

    this.isValid = this.values.en.length >= 1 && this.values.ar.length >= 1;

    this.loadControls.set(true);
  }

  getValidators(field: any): any[] {
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

  switchLanguage(language?: string) {
    this.currentLanguage = language; // Set the selected language

    Object.keys(this.dynamicForm.controls).forEach((key) => {
      this.dynamicForm.removeControl(key); // Remove each control
    });
    this.createForm();
  }

  transformedObject(data: any, lang: any) {
    return data.reduce((result: any, item: any) => {
      result[item.name] = item.value[lang];
      return result;
    }, {});
  }

  onSubmit(): void {
    this.values = {
      en: Array.isArray(this.values.en)
        ? this.values.en.at(-1)
        : this.values.en,
      ar: Array.isArray(this.values.ar)
        ? this.values.ar.at(-1)
        : this.values.ar,
    };
    console.log(this.values);

    let submitObj: any = {
      USERNAME: "Ahmed Rashad",
      RECORDSETID: this.dataListId,
    };

    let fields: any = [];
    let field = {};
    for (let key in this.values.en) {
      field = {
        name: key,
        value: {
          en_US: this.values.en[key],
        },
      };
      fields.push(field);
    }

    for (let key in this.values.ar) {
      for (let i of fields) {
        if (i.name == key) {
          i.value.ar_SA = this.values.ar[key];
        }
      }
    }

    submitObj.DATA_ = {
      defaultLanguageId: "en_US",
      fieldValues: fields,
    };

    console.log(submitObj);
    if (this.dynamicForm.valid) {
      this.dataService.updateRecord(this.recordId, submitObj).subscribe(
        () => {
          console.log("Record updated successfully");
          this.router.navigate(["content/dataListRecords", this.dataListId]);
        },
        (error) => console.error(error)
      );
    }
  }
}
