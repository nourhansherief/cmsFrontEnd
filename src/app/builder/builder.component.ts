import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Components, FormBuilderComponent, FormioForm, FormioModule, FormioOptions } from '@formio/angular';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConvertXmlToJson } from '../../Utilities/HelperFunctions/xmlToJson';
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

  currentLanguage : string = 'en'
  persistentVal: any = null;
  testData : any = [];
  gg:any;
  data:any;

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
    //console.log("9999999999");
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.dataService.getDataDefinition(this.id).subscribe(
          (data) => {
            this.action = 'update';
            // Object.freeze([...originalArray]);
            let x:any = JSON.parse(JSON.stringify(data));
            this.data = data;
            //console.log("data in hereeeee", data)
            this.DataDefinitionInputValue = ConvertXmlToJson(x[0]?.NAME);
            this.testData = JSON.parse(JSON.stringify(data));
            // console.log("sss", data?.structure)
             //this.formData = JSON.stringify([data[0]?.DEFINITION?.fields[0]]);

            //  this.formData = data[0]?.DEFINITION.fields.map((field : any) => {
            //    return JSON.stringify(field)
            //   })
            //  this.formData = JSON.stringify(data[0])
            // this.formData = JSON.stringify(data[0]?.DEFINITION?.fields)
            // this.gg = ;
            // console.log("ff" , this.formData)
            // this.triggerTextAreaSource(JSON.stringify(data[0]?.DEFINITION?.fields));
            // console.log("aaaa" , data[0]?.DEFINITION?.fields)
            this.triggerTextAreaSource(x[0]?.DEFINITION?.fields);
            this.formChanges.emit(data[0]?.DEFINITION?.fields);

            // this.formData = data[0]?.DEFINITION?.fields;
            //this.dataList = data;
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
    // console.log("onchanges");
    // if (this.formData) {
      // this.triggerTextAreaSource();
    // }
  }

  triggerTextAreaSource(arrayComponents?:any) {
    // console.log(this.formData)
    //let arrayComponents = this.formData.map((field : any ) => {return JSON.parse(field)})
    // let ff = JSON.parse(this.formData)?.DEFINITION?.fields
    // arrayComponents =  JSON.parse(arrayComponents);
    //("arrC" , arrayComponents);

    //console.log("formC"  ,this.form.components);
    arrayComponents = arrayComponents.map((item : any) => {
      return {
        ...item,
        defaultValue : this.currentLanguage == 'en' ? item.defaultValue : item.defaultValueAr
      }
    })


    if (arrayComponents) {
      try {
        this.form.components = arrayComponents ;
        // console.log("first", this.form.components)
        // while (this.form.components.length > 0) {
          // this.form.components.pop();
        // }

        // console.log("second", this.form.components)

        // console.log("external", arrayComponents);


        if (this.form.components.length == 0) {
        //   // console.log("eeee" , arrayComponents)
        //   for (let i = 0; i < arrayComponents.length; i++) {
        //     console.log("key", arrayComponents[i])
        //     this.form.components.push(arrayComponents[i]);
        //   }
        // this.form.parent.components  = 
        let x =  arrayComponents;
        // The Objects the Form render in the UI (The Large Object)
        
        //console.log("bb" , this.form.components)

        }
        
        // this.form = { ...this.form };
        //       //       this.cdRef.detectChanges();
        // this.rebuildEmitter.next({});

        // Restore form and options after a short delay
        // console.log("8888" , this.form);
        setTimeout(() => {
        //   // this.formJsonVal = arrayComponents;
        //   // this.form = { ...this.form }; // Or set to any form structure you want
          this.rebuildEmitter.next({});
          // this.rebuildEmitter.emit();
        }, 0);


      } catch (e) {
        console.error('Invalid JSON array input', e);
      }
    }
  }

  onChange($event: any) {
    //console.log("ssss" , $event);
    let val;
    // console.log("new form" , $event?.parent?.components)
    // console.log("inside change event")
    // this.handleFormChange($event);
    if ($event.type == "change") {
     // console.log("rrrrr" ,   )
      this.oldParentForm = !this.oldParentForm ? this.data[0]?.DEFINITION?.fields : this.oldParentForm;
      //console.log("inside change event 1" , $event)
      val = this.setDefaultValue($event?.srcElement?.
        widget
        ?.component?.label
        , $event?.target?.value)
    } else {
      //console.log("000000000")
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




    //console.log("1111", val);
    this.formJsonVal = val;
    // console.log("2222", this.formJsonVal);
    this.formChanges.emit(val);
    if (this.currentLanguage == 'en') {
      console.log(this.persistentVal)
      this.persistentVal = (this.persistentVal != null? this.persistentVal : val).map((item : any) => {
        return {
          ...item,
          defaultValue : item.defaultValue,
          defaultValueAr : (this.currentLanguage == 'ar') && item.defaultValueAr
        }
      });
      // console.log("persistentVal set:", this.persistentVal);
    } else {
      console.log("preeeeeeeeee" , this.persistentVal)
      console.log("Valllllll" , val)
      for(let i = 0 ; i < val.length ; i++){

        this.persistentVal = this.persistentVal.map((item : any) => {
          return {
            ...item,
            // val[i].key == item.key && val[i].defaultValue
            defaultValueAr : ( val[i].key === item.key) && val[i].defaultValue
          }
        });
      }
      }
  }
  

  setDefaultValue(key: any, value: any) {
    // console.log("values", key, value, this.form.components);
    //console.log("in default " , this.oldParentForm  , key , value)
    let data = this.oldParentForm.map((item: any) => {
      if (item?.label === key) {
        // Update the key if it exists, or add the key if it doesn't
        // item['defaultValue'] = value; 
        return { ...item, 'defaultValue': value};
      }
      // console.log(item)
      return item;
    });

    const obj = this.oldParentForm.find((item: any) => item?.key === key); // Adjust the condition as needed

    // console.log("oni", obj);

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


  onSubmit(submission: any) {
    let submitObj : any = {
      NAME : this.DataDefinitionInputValue,
      DEFINITION : {
        defaultLanguageId : "en_US",
        fields : this.formJsonVal
      }
    }
    // console.log("wwwwwwwww" , submitObj);
    // Update Data Definition
    if (this.action == 'update') {
      // let x = {
      //   this.currentLanguage :"jjj"
      // };


      if(this.currentLanguage == 'en') {
        // this.gg.push(JSON.parse(this.formData))
        // console.log(this.gg)
      } else {
        // submitObj = {
        //   ...submitObj,
        //   DEFINITION : {
        //     ...submitObj.DEFINITION,
        //     fields : submitObj?.DEFINITION?.fields.map((field  :any) => {
        //       return {
        //         ...field,
        //         defaultValueAr : "رشاد"
        //       }
        //     })
        //   }
        // }
        // console.log("cd" , this.testData.DEFINITION.fields)
        // console.log("ds" , this.persistentVal)

        //for(let i = 0 ; i < this.testData.DEFINITION.fields?.length ; i++){
          console.log("Pre" , this.persistentVal)

          // for(let j = 0 ; j < this.persistentVal.length ; j++){
          //   //if(this.testData.DEFINITION.fields[i].key == this.formJsonVal[j].key){
          //     // console.log(this.persistentVal[j].key)
          //     // console.log("Be5")
          //     submitObj = {
          //       ...submitObj,
          //       DEFINITION : {
          //         ...submitObj.DEFINITION,
          //         fields : this.data[0].DEFINITION.fields.map((field  :any) => {
          //           // console.log({defaultValueAr : (this.currentLanguage == 'en' && field.key == this.persistentVal[j].key) &&  this.persistentVal[j].defaultValue})
          //           return {
          //             ...field,
          //             defaultValue : (this.currentLanguage == 'en' ) && this.persistentVal[j].defaultValue ,
          //             defaultValueAr : (this.currentLanguage == 'ar')&& this.persistentVal[j].defaultValue ,
          //           }
          //         })
          //       }
          //     }
          //   //}
          // }
        //}
      }
      
      console.log(submitObj)

      // Send Updated Data

      // this.dataService.updateDataDefinition(this.id, submitObj).subscribe(
      //   () => {
      //     this.router.navigate(['content/dataDefinitions'])
      //   },
      //   (error) => console.error(error)
      // );
    }
    // Create Data Definition
    else {
      // console.log("submit")
      // Handle the form submission data
      // console.log('Form submitted with data:', this.DataDefinitionInputValue, this.formJsonVal);
      submitObj = {...submitObj , USERNAME : "Ahmed Rashad"}
      // console.log("ee",submitObj )
      //Last Step call the API
      this.dataService.createDataDefinition({...submitObj}).subscribe(
        (data) => {
          // this.loadDataDefinitions();
          // this.newDefinition = { name: '', structure: {} };
          // console.log(data)
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
     this.currentLanguage = language; // Set the selected language
     this.triggerTextAreaSource(this.testData[0]?.DEFINITION?.fields)
    //  console.log(this.currentLanguage)
    //  console.log(JSON.parse(this.formData))
    if(this.currentLanguage == 'ar') {
      // console.log(this.oldParentForm)
      // this.oldParentForm.map((item: any) => {
      //   return { ...item, 'defaultValue': '' };
      // });
    }
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
