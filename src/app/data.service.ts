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

  getDataDefinition(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-definitions/${id}`);
  }

  createDataDefinition(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data-definitions`, data);
  }

  updateDataDefinition(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/data-definitions/${id}`, data);
  }

  deleteDataDefinition(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/data-definitions/${id}`);
  }

  // Data Lists
  getDataLists(): Observable<any> {
      return this.http.get(`${this.apiUrl}/data-list`);
  }

  getDataListWithPagination(pageNumber?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-list?page=${pageNumber}`); 
  }

  createDataList(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data-list`, data);
  }

  updateDataList(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/data-list/${id}`, data);
  }

  deleteDataList(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/data-list/${id}`);
  }

  addRecordToDataList(dataListId: string, record: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/data-list/${dataListId}/records`,
      record
    );
  }

  getRecordsFromDataList(dataListId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-list/${dataListId}/records`);
  }

  getDataDefinitionStructure(dataListId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/data-list/${dataListId}/structure`);
  }

  deleteRecord(dataListId: string, recordId: string): Observable<any> {
    ///:dataListId/records/:recordId
    return this.http.delete(
      `${this.apiUrl}/data-list/${dataListId}/records/${recordId}`
    );
  }

  findRecordById(dataListId: string, recordId: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/data-list/${dataListId}/records/${recordId}`
    );
  }

  updateRecord(
    dataListId: string,
    recordId: string,
    data: any
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/data-list/${dataListId}/records/${recordId}`,
      data
    );
  }

  getWebContent(prefix: any) {
    // return this.http.delete(`${this.apiUrl}/data-list/${dataListId}/records/${recordId}`);
    return this.http.get(`${this.apiUrl}/data-list/content`);
  }
}
