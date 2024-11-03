import { Component  , ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from '../../Shared/Components/search/search.component';
import { PaginationComponent } from '../../Shared/Components/pagination/pagination.component';
import { ConvertXmlToJson } from '../../Utilities/HelperFunctions/xmlToJson';
@Component({
  selector: 'app-datalists',
  standalone: true,
  imports: [CommonModule , HttpClientModule , SearchComponent , PaginationComponent] ,
  providers:[DataService],
  templateUrl: './datalists.component.html',
  styleUrl: './datalists.component.css'
})

export class DatalistsComponent {

  dataLists: any = [] ;
  fullDataList : any = []
  filteredData : any = []
  pageNumber : any = 1
  xmlToJson : any = ConvertXmlToJson
  constructor(private router: Router, private route: ActivatedRoute , private dataService: DataService ) { }

  navigate(route: string) {
    this.router.navigate([route]);
  }
  
  newDataList: any = { name: '', dataDefinitionId: {} };


  ngOnInit(): void {
    console.log("hereeeeeeeeeeee")
    this.loadDataLists();
    this.loadAllDataLists()
    console.log(this.dataLists)
    const ff = "<?xml version='1.0' encoding='UTF-8'?><root ><Name >wifiPasswordReset</Name></root>"
    const gg = "Rashad"
    console.log(ConvertXmlToJson(ff))
    console.log(ConvertXmlToJson(gg))
  }

  ngOnChanges(): void {
    //this.loadDataLists();
  }

  loadDataLists(pageNumber ?: any) {
    console.log("test" , this.pageNumber)
    this.dataService.getDataListWithPagination(this.pageNumber).subscribe(
      (data) => this.dataLists = data.data,
      (error) => console.error(error)
    );
  }

  loadAllDataLists() {
    this.dataService.getDataLists().subscribe((data) => {
      this.fullDataList = data?.data
    })
  }

  editDataList(id: string) {
    this.router.navigate(['content/dataListRecords', id]);
    // this.dataService.getDataDefinition(id).subscribe(
    //   (data) => this.editingDefinition = data,
    //   (error) => console.error(error)
    // );
  }

  deleteDataList(id: string) {
    this.dataService.deleteDataList(id).subscribe(
      () => this.loadDataLists(),
      (error) => console.error(error)
    );
  }

  handleSearchResult(searchData : any) {
    this.filteredData = searchData
  }

  handlePaginationResult(pageNumber : any) {
    this.pageNumber = pageNumber
    this.loadDataLists(pageNumber)
    console.log(pageNumber)
  }

}
