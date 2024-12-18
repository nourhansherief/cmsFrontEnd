import { Component, Input, signal, WritableSignal } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../data.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { formatDDFObjForMultipleLangs } from "../../Utilities/HelperFunctions/formatDDFObj";
import { LoaderComponent } from "../../Shared/Components/loader/loader.component";
import { switchMap } from "rxjs";
@Component({
  selector: "app-create-record",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    LoaderComponent,
  ],
  providers: [DataService],
  templateUrl: "./create-record.component.html",
  styleUrl: "./create-record.component.css",
})
export class CreateRecordComponent {
  @Input() dataListId: any;
  formStructure: any[] = [];
  dynamicForm: FormGroup;
  dataDefinitionFields: any = [];
  currentLanguage: any = "en";
  values: any = { en: [], ar: [] };
  isValid: Boolean = true;
  isLoading: Boolean = true;

  public loadControls: WritableSignal<boolean> = signal(false);
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dynamicForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.dataListId = params.get("id");
      console.log(this.dataListId);
      this.loadFormStructure();
    });
  }

  loadFormStructure(): void {
    this.dataService.getSingleRecordSet(this.dataListId).subscribe((data) => {
      this.isLoading = false;
      this.loadControls() && this.loadControls.set(false);
      this.formStructure = Object.values(
        data[0]?.DDMSTRUCTUREID?.DEFINITION?.fields
      );

      if (data[0]?.DDMSTRUCTUREID?.PARENTSTRUCTUREID != 0) {
        this.dataService
          .getDataDefinition(data[0]?.DDMSTRUCTUREID?.PARENTSTRUCTUREID)
          .subscribe((data) => {
            let PARENTSTRUCTUREID = data[0]?.DEFINITION?.fields[0];
            this.formStructure.unshift(PARENTSTRUCTUREID);
            this.createForm();
          });
      } else {
        this.createForm();
      }
    });
  }

  createForm(): void {
    this.formStructure.forEach((field) => {
      this.dynamicForm.addControl(
        field.key,
        this.fb.control(
          { disabled: false },
          this.getValidators(field?.validate)
        )
      );

      this.dynamicForm
        .get(field.key)
        ?.setValue(
          this.currentLanguage === "en"
            ? field.defaultValue
            : field.defaultValueAr
        );
    });

    this.storeDataForEachLang();

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
    this.createForm();
  }

  storeDataForEachLang() {
    this.dynamicForm.valueChanges.subscribe((data) => {
      if (this.currentLanguage == "en") {
        this.values?.en?.push(data);
      } else if (this.currentLanguage == "ar") {
        this.values?.ar?.push(data);
      }
    });

    this.isValid = this.values.en.length >= 1 && this.values.ar.length >= 1;
  }

  onSubmit(): void {
    this.values = { en: this.values.en.at(-1), ar: this.values.ar.at(-1) };

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

    this.dataService.addRecordToDataList(submitObj).subscribe(
      () => {
        console.log("Record added successfully");
        this.router.navigate(["content/dataListRecords", this.dataListId]);
      },
      (error) => console.error(error)
    );
  }
}
