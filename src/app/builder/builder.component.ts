import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Components, FormBuilderComponent, FormioForm, FormioModule, FormioOptions } from '@formio/angular';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, FormioModule, FormsModule],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css'
})
export class BuilderComponent {
  @Input() formData: any;
  @Output() formChanges = new EventEmitter();
  // form = [];
  form: any = { components: [] }// Formio form object
  arrayComponents = [];
  refreshForm = new EventEmitter();
  rebuildEmitter = new EventEmitter();
  e: any;
  @ViewChild('json', { static: false }) jsonElement?: ElementRef;
  @ViewChild('formBuilder', { static: true }) formBuilder: any;
  oldParentForm: any;
  builderOptions: any = {
    builder: {
      // Specify only the components you want to include
      basic: {
        title: 'Basic Components',
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
        }
      },
      data: false,
      layout: false,
      custom: false,
      premium: false
      // Add other categories if needed
    },
    noDefaultSubmitButton: true
  };
  formJsonVal: any;
  DataDefinitionInputValue = '';
  action: any;
  id:any;



  constructor(private cdRef: ChangeDetectorRef, private dataService: DataService,
    private router: Router, private route: ActivatedRoute
  ) {
    // this.onChange();
    // this.form = {components: []};
    // Initialize your form object using the JSON schema
  }

  //   ngAf() {
  // console.log("2" , this.formData)
  //     if (this.formData) {
  //       let arrayComponents = JSON.parse(this.formData) || [];
  //       // console.log("7777777", this.form);
  //       // this.form = arrayComponents;
  //       this.form.components = arrayComponents;
  //     }

  //   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.dataService.getDataDefinition(this.id).subscribe(
          (data) => {
            this.action = 'update';
            console.log("data", data)
            this.DataDefinitionInputValue = data[0]?.NAME;
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

  ngOnChanges() {
    console.log("onchanges");
    if (this.formData) {
      this.triggerTextAreaSource();
    }
  }

  triggerTextAreaSource() {
    let arrayComponents = JSON.parse(this.formData);
    console.log("r", arrayComponents);
    if (arrayComponents.length >= 0) {
      try {

        // console.log("first", this.form.components)
        while (this.form.components.length > 0) {
          this.form.components.pop();
        }

        // console.log("second", this.form.components)

        console.log("external", arrayComponents);
        if (this.form.components.length == 0) {
          for (let i = 0; i < arrayComponents.length; i++) {
            // console.log("key", arrayComponents[i])
            this.form.components.push(arrayComponents[i]);
          }
        }


        // this.form = { ...this.form };
        //       //       this.cdRef.detectChanges();
        // this.rebuildEmitter.next({});

        // Restore form and options after a short delay
        console.log("8888" , this.form);
        setTimeout(() => {
          this.formJsonVal = arrayComponents;
          this.form = { ...this.form }; // Or set to any form structure you want
          this.rebuildEmitter.next({});
          // this.rebuildEmitter.emit();
        }, 0);


      } catch (e) {
        console.error('Invalid JSON array input', e);
      }
    }
  }

  onChange($event: any) {
    let val;
    // console.log("new form" , $event?.parent?.components)
    console.log("inside change event")
    // this.handleFormChange($event);
    if ($event.type == "change") {

      console.log("inside change event 1")
      val = this.setDefaultValue($event?.srcElement?.
        widget
        ?.component?.key, $event?.target?.value)
    } else {
      this.oldParentForm = $event?.parent?.components;
      val = this.oldParentForm;
    }
    // let oldForm = ;
    // console.log("2222", $event?.srcElement?.
    //   widget
    //   ?.component?.key);
    // // this.e = $event;
    // $event.type == "change" ? console.log("ssss", $event, $event?.target?.value) : '';
    // let val = ($event.type == "change") ? this.setDefaultValue($event , $event?.srcElement?.
    //   widget
    //   ?.component?.key, $event?.target?.value)
    //   : $event?.parent?.components;

    console.log("1111", val);
    this.formJsonVal = val;
    console.log("2222", val);
    this.formChanges.emit(val);
    // this.jsonElement!.nativeElement.innerHTML = '';
    // this.jsonElement?.nativeElement.appendChild(document.createTextNode(JSON.stringify($event.form, null, 4)));
    //   this.form.valueChanges
    //     .subscribe(($event:any) => {
    //       this.formChanges.emit($event.form.components);
    // });
  }

  setDefaultValue(key: any, value: any) {
    console.log("values", key, value, this.form.components);

    let data = this.oldParentForm.map((item: any) => {
      if (item?.key === key) {
        // Update the key if it exists, or add the key if it doesn't
        // item['defaultValue'] = value; 
        return { ...item, 'defaultValue': value };
      }
      return item;
    });

    const obj = this.oldParentForm.find((item: any) => item?.key === key); // Adjust the condition as needed

    console.log("oni", obj);

    // if (obj) {
    //   // Check if the key exists and update its value, otherwise add the key with the new value
    //   // if (obj.hasOwnProperty('defaultValue')) {
    //   //   obj['defaultValue'] = value;
    //   // } else {
    //   //   obj['defaultValue'] = value;
    //   // }
    //   obj['defaultValue'] = value;
    // } else {
    //   // If the object is not found, you can handle it here (optional)
    //   console.log('Object not found');
    // }

    this.oldParentForm = data;

    // console.log('Updated Data:', this.data);
    // console.log("22" , this.form.components);
    return data;

  }

  getArrayAsTypeScriptString(array: any[]): string {
    return array.map(item => JSON.stringify(item, null, 2)).join(',\n');
  }

  ngOninit() {

  }

  onSubmit(submission: any) {
    if (this.action == 'update') {
      this.dataService.updateDataDefinition(this.id, { name: this.DataDefinitionInputValue, structure: { ...this.formJsonVal } }).subscribe(
        () => {
          this.router.navigate(['content/dataDefinitions'])
        },
        (error) => console.error(error)
      );
    }

    else {
      console.log("submit")
      // Handle the form submission data
      // console.log('Form submitted with data:', this.DataDefinitionInputValue, this.formJsonVal);
      console.log("ee",this.formJsonVal )
      this.dataService.createDataDefinition({ name: this.DataDefinitionInputValue, structure: { ...this.formJsonVal } }).subscribe(
        () => {
          // this.loadDataDefinitions();
          // this.newDefinition = { name: '', structure: {} };
          console.log("sucesssssssssss")
          this.router.navigate(['content/dataDefinitions'])
        },
        (error) => console.error(error)
      );
    }
  }


  // updateDataDefinition() {
  //   
  // }

  switchLanguage(language: string) {
    // this.currentLanguage = language; // Set the selected language

    // // Update the form fields' labels and predefined options based on the selected language
    // this.builder.schema.components.forEach((component: any) => {
    //   if (component.key === 'textField') {
    //     component.label = this.predefinedValues[language].textFieldLabel;
    //   }
    //   if (component.key === 'selectField') {
    //     component.label = this.predefinedValues[language].selectFieldLabel;
    //     component.data.values = this.predefinedValues[language].selectOptions;
    //   }
    // });

    // // Rebuild the form with updated options
    // this.builder.instance.redraw();
  }

}
