import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { IframeComponent } from './iframe/iframe.component';
import { DataDefinitionBuilderComponent } from './data-definition-builder/data-definition-builder.component';
import { DataDefinitionsComponent } from './data-definitions/data-definitions.component';
import { DatalistsComponent } from './datalists/datalists.component';
import { CreateDataListComponent } from './create-data-list/create-data-list.component';
import { CreateRecordComponent } from './create-record/create-record.component';
import { DataListRecordsComponent } from './data-list-records/data-list-records.component';
import { ContentExampleComponent } from './content-example/content-example.component';
import { UseCaseExampleComponent } from './use-case-example/use-case-example.component';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { AllContentExampleComponent } from './all-content-example/all-content-example.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/content/siteBuilder', // Default route
    pathMatch: 'full'
  },
  {
    path: 'content',
    component: ContentComponent,
    children: [
      { path: 'siteBuilder', component: IframeComponent },
      { path: 'createDataDefinition', component: DataDefinitionBuilderComponent },
      {
        path: 'dataDefinitions', component: DataDefinitionsComponent
      },
      { path: 'createDataDefinition/:id', component: DataDefinitionBuilderComponent },
      {
        path: 'dataLists', component: DatalistsComponent
      },
      { path: 'createDataList', component: CreateDataListComponent },
      { path: 'dataListRecords/:id', component: DataListRecordsComponent },
      { path: 'createRecord/:id', component: CreateRecordComponent },
      {
        path: 'contentExample', component: ContentExampleComponent
      },
      { path: 'editRecord/:dataList/:id', component: EditRecordComponent },
      { path: 'allContentExample', component: AllContentExampleComponent },
      // { path: 'useCaseExample', component: UseCaseExampleComponent },

    ]
  }
  // { path: 'data-definitions/page1', component: ContentComponent },
  // { path: 'data-definitions/page2', component: ContentComponent },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
