import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  //private apiUrl = 'http://localhost:3000'; // URL of your Express server
  private apiUrl = "http://localhost:3005"; // URL of your Express server

  constructor(private http: HttpClient) {}

  // Data Definitions
  getDataDefinitions(): Observable<any> {
    // return this.http.get(`${this.apiUrl}/data-definitions`);
    return this.http.get(`${this.apiUrl}/data-definitions`);
  }

  getDataDefinitionsWithPagination(pageNumber ?: number): Observable<any> {
    // return this.http.get(`${this.apiUrl}/data-definitions`);
    return this.http.get(`${this.apiUrl}/data-definitions?page=${pageNumber}&limit=5`);
  }

  getDataDefinition(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-definitions/${id}`);
  }

  createDataDefinition(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data-definitions`, data);
  }

  updateDataDefinition(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/data-definitions/${id}`, data);
  }

  deleteDataDefinition(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/data-definitions/${id}`);
  }

  // Data Lists
  getDataLists(): Observable<any> {
      return this.http.get(`${this.apiUrl}/data-list`);
  }

  getDataListWithPagination(pageNumber?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-list?page=${pageNumber}&limit=5`);
  }

  createDataList(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data-record-set`, data);
  }

  updateDataList(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/data-list/${id}`, data);
  }

  updateDataListName(data : any): Observable<any> {
    const {RECORDSETID , NAME} = data
    return this.http.patch(`${this.apiUrl}/data-record-set/${RECORDSETID}`, {NAME})
  }

  deleteDataList(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/data-list/${id}`);
  }

  addRecordToDataList(record: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/data-record`,
      record
    );
  }

  getRecordsFromDataList(dataListId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-list/${dataListId}`);
  }

  getDataDefinitionStructure(dataListId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-list/${dataListId}/structure`);
  }

  deleteRecord(recordId: string): Observable<any> {
    ///:dataListId/records/:recordId
    return this.http.delete(
      `${this.apiUrl}/data-record/${recordId}`
    );
  }

  findRecordById(recordId: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/data-record/${recordId}`
    );
  }

  updateRecord(
    recordId: string,
    data: any
  ): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/data-record/${recordId}`,
      data
    );
  }

  // RecordSet
  getSingleRecordSet(recordSetId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-record-set/${recordSetId}`);
  }

  getWebContent(prefix: any) {
    // return this.http.delete(`${this.apiUrl}/data-list/${dataListId}/records/${recordId}`);
    return this.http.get(`${this.apiUrl}/data-list/content`);
  }

  // Search
  searchForData(endpoint: any , term : any) {
    return this.http.get(`${this.apiUrl}/${endpoint}?term=${term}`)
  }
}
