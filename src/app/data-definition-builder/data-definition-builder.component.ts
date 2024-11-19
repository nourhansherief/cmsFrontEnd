import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';import { BuilderComponent } from '../builder/builder.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { ConvertXmlToJson } from '../../Utilities/HelperFunctions/xmlToJson';
@Component({
  selector: 'app-data-definition-builder',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormioModule, BuilderComponent, TabsModule ,
     FormsModule , HttpClientModule 
  ],
  providers:[DataService],
  templateUrl: './data-definition-builder.component.html',
  styleUrl: './data-definition-builder.component.css'
})
export class DataDefinitionBuilderComponent {
  title = 'dynamic-form-app';
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  form = {
    components: []
  }
  textareaValue: string = '';

  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  onTextareaChange(value: string) {
    // console.log('Textarea value:', value);
  }

  setTextValue($event:any){
    console.log($event)
    // console.log("event" , $event.target.component);
    try {
      // console.log("text" ,JSON.stringify($event, null, 2));
      this.textareaValue= JSON.stringify($event, null, 2);
      //console.log("wwww" , this.textareaValue);
    } catch (e) {
      console.error('Invalid JSON array input', e);
      this.textareaValue = '';
    }
    //console.log("in here" , this.textareaValue);
  }

  onBuilderChange(formComponents: any) {
    // console.log(formComponents);
    // save form schema
  }

  submit($event: any) {
    
    console.log("eeee", $event);
  }

}
