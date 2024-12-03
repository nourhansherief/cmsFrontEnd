import { CommonModule } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  Components,
  FormBuilderComponent,
  FormioForm,
  FormioModule,
  FormioOptions,
} from "@formio/angular";
import { DataService } from "../data.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ConvertXmlToJson } from "../../Utilities/HelperFunctions/xmlToJson";
import { formatSourceCodeForSubmit, formatDDFObjForMultipleLangs } from "../../Utilities/HelperFunctions/formatDDFObj";
import { LoaderComponent } from "../../Shared/Components/loader/loader.component";

@Component({
  selector: "app-builder",
  standalone: true,
  imports: [CommonModule, FormioModule, FormsModule, LoaderComponent],
  templateUrl: "./builder.component.html",
  styleUrl: "./builder.component.css",
})
export class BuilderComponent {
  @Input() formData: any;
  @Output() formChanges = new EventEmitter();
  // form = [];
  form: any = { components: [] }; // Formio form object
  arrayComponents = [];
  refreshForm = new EventEmitter();
  rebuildEmitter = new EventEmitter();
  e: any;
  isLoading : Boolean = true
  @ViewChild("json", { static: false }) jsonElement?: ElementRef;
  @ViewChild("formBuilder", { static: true }) formBuilder: any;
  oldParentForm: any;
  builderOptions: any = {
    builder: {
      // Specify only the components you want to include
      basic: {
        title: "Basic Components",
        default: true,
        weight: 0,
        components: {
          textfield: true,
          textarea: true,
          number: true,
          checkbox: true,
          select: true,
          // noDefaultSubmitButton: true
          // Add other components you need
        },
      },
      data: false,
      layout: false,
      custom: false,
      premium: false,
      // Add other categories if needed
    },
    noDefaultSubmitButton: true,
  };
  formJsonVal: any;
  DataDefinitionInputValue = "";
  action: any;
  id: any;

  currentLanguage: string = "en";
  persistentVal: any = null;
  testData: any = [];
  gg: any;
  data: any;
  sourceData: any = {};

  constructor(
    private cdRef: ChangeDetectorRef,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      if (this.id) {
        this.dataService.getDataDefinition(this.id).subscribe(
          (data) => {
            this.isLoading = false
            this.data = data;
            this.action = "update";
            let cpyData: any = JSON.parse(JSON.stringify(data));
            //setting Name
            this.DataDefinitionInputValue = ConvertXmlToJson(cpyData[0]?.NAME);
            // setting fields of current lang
            let currentLangData = formatDDFObjForMultipleLangs(cpyData[0]?.DEFINITION?.fields)[this.currentLanguage];
            this.sourceData = formatDDFObjForMultipleLangs(data[0]?.DEFINITION?.fields);
            // triggereing json data
            this.form.components = currentLangData;
            this.formChanges.emit(formatDDFObjForMultipleLangs(data[0]?.DEFINITION?.fields)[this.currentLanguage]);
            // this.error = null;
          },
          (error) => {
            // this.error = error.error.message || 'An error occurred';
          }
        );
      }
    });
  }

  ngOnChanges() {
    if (this.formData && typeof this.formData === 'string' || this.formData instanceof String) {
      // console.log("ee" , JSON.parse(this.formData));
      this.sourceData[this.currentLanguage] = JSON.parse(this.formData.toString());
      this.triggerTextAreaSource(JSON.parse(this.formData.toString()));
    }
  }

  switchLanguage(language: string) {
    this.currentLanguage = language; // Set the selected language
    if (!this.sourceData['en'] && !this.sourceData['ar']) {
      this.triggerTextAreaSource(formatDDFObjForMultipleLangs(this.testData)[this.currentLanguage]);
      this.formChanges.emit(formatDDFObjForMultipleLangs(this.testData)[this.currentLanguage]);
      // } 
      // else if (this.sourceData['en'] && !this.sourceData['ar']) {
      //   console.log("s2");
      //   let x = JSON.parse(JSON.stringify(this.sourceData['en']));
      //   this.sourceData['ar'] = x;
      //   this.formChanges.emit(this.sourceData[this.currentLanguage]);
      //   this.triggerTextAreaSource(this.sourceData[this.currentLanguage]);
    }
    else {
      this.formChanges.emit(this.sourceData[this.currentLanguage]);
      this.triggerTextAreaSource(this.sourceData[this.currentLanguage]);
    }
  }





  triggerTextAreaSource(arrayComponents?: any) {
    let formComponents: any = JSON.parse(JSON.stringify(arrayComponents));
    if (formComponents) {
      try {
        this.form.components = formComponents;
        setTimeout(() => {
          // this.form = { ...this.form };
          this.rebuildEmitter.next({});
          // this.rebuildEmitter.emit();
        }, 0);
      } catch (e) {
        console.error("Invalid JSON array input", e);
      }
    }
  }

  onChange($event: any) {
    let val;
    let x: any = this.sourceData[this.currentLanguage];
    if ($event.type == "change") {
      this.oldParentForm = !this.oldParentForm
        ? this.data[0]?.DEFINITION?.fields
        : x;
      val = this.setDefaultValue(
        $event?.srcElement?.widget?.component?.key,
        $event?.target?.value
      );
    } else if ($event.type == "addComponent") {
      this.oldParentForm = $event?.form?.components;
      val = this.oldParentForm;
    }
    this.formJsonVal = val;
    this.formChanges.emit(val);
    this.sourceData[this.currentLanguage] = this.formJsonVal;
    this.matchLanguages();

  }

  matchLanguages() {
    // Handle en & ar when add new TextField
    if (this.sourceData['en']?.length > this.sourceData['ar']?.length) {
      for (let i = 0; i < this.sourceData['en'].length; i++) {
        if (i > this.sourceData['ar'].length - 1) {
          this.sourceData['ar'].push(this.sourceData['en'][i])
        }
      }
    }

    if (this.sourceData['ar']?.length > this.sourceData['en']?.length) {
      for (let i = 0; i < this.sourceData['ar'].length; i++) {
        if (i > this.sourceData['en'].length - 1) {
          this.sourceData['en'].push(this.sourceData['ar'][i])
        }
      }
    }

  }

  setDefaultValue(key: any, value: any) {
    let data = this.oldParentForm.map((item: any) => {
      if (item?.key === key) {
        return { ...item, defaultValue: value };
      }
      return item;
    });
    this.oldParentForm = data;
    return data;
  }

  getArrayAsTypeScriptString(array: any[]): string {
    return array.map((item) => JSON.stringify(item, null, 2)).join(",\n");
  }



  onSubmit(submission: any) {

    let submitObj: any = {
      NAME: this.DataDefinitionInputValue,
      DEFINITION: {
        defaultLanguageId: "en_US",
        fields: this.formJsonVal,
      },
    };
    // Update Data Definition
    if (this.action == "update") {
      this.isLoading = false
      submitObj.DEFINITION.fields = formatSourceCodeForSubmit(this.sourceData)
      console.log(submitObj)
      // Send Updated Data

      this.dataService.updateDataDefinition(this.id, submitObj).subscribe(
        () => {
          this.router.navigate(['content/dataDefinitions'])
        },
        (error) => console.error(error)
      );
    }
    // Create Data Definition
    else {
      this.isLoading = false
      submitObj = { ...submitObj, USERNAME: "Ahmed Rashad" };
      this.dataService.createDataDefinition({ ...submitObj }).subscribe(
        (data) => {
          this.router.navigate(["content/dataDefinitions"]);
        },
        (error) => console.error(error)
      );
    }
  }


}