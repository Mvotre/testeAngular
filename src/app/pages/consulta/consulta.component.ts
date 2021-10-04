import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FakeDataService } from 'src/app/fake-data.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  @ViewChild('tableBody') tableBody!: ElementRef;
  
  actualList:any;
  filterableList:any;
  filteredList:any;
  zeroResults = false;
  selectedId!:any;
  category = "todos";
  modal = false;
  
  constructor( private router: Router, private dataService: FakeDataService ) { }

  ngOnInit(): void {
    this.dataService.getData()
      .subscribe( data => { 
        this.actualList = data;
        this.filterableList = data; 
      } )
  }

  onType(searchInput:Event){
    let filter = searchInput.target as HTMLInputElement;

    this.filterableList = this.actualList;
    if(filter.value){
      this.filterListB(+filter.value)
    }
  }

  onChange(deviceValue:Event) {
    let selection = deviceValue.target as HTMLInputElement;

    this.filterableList = this.actualList;

    if(selection.value === 'todos'){
      return
    } else {
      this.filterList(selection.value)
    }
  }

  filterList(value:string){
    let newArr = this.filterableList.filter((item:any) => {
      return item[2].toLowerCase() === value;
    })
   
    this.filteredList = newArr;
    this.category = value;
    this.filterableList = newArr;
  }

  filterListB(value:number){
    this.zeroResults = false

    if(this.category !== "todos"){
      let newArr = this.filteredList.filter((item:any) => {
        return item[0].includes(value);
      })
     
      if(!newArr.length){
        this.zeroResults = true
      } else {
        this.filterableList = newArr;
      }
    } else {
      let newArr = this.filterableList.filter((item:any) => {
        return item[0].includes(value);
      })
     
      if(!newArr.length){
        this.zeroResults = true
      } else {
        this.filterableList = newArr;
      }
    }
  }

  selectRow(idx:number){
    if(this.selectedId === idx){
      this.tableBody.nativeElement.rows[idx].classList.remove("selectedRow")
      this.selectedId = undefined
    } else {
      this.selectedId = idx;
      this.clearSelectedRow()
      this.tableBody.nativeElement.rows[idx].classList.add("selectedRow")
    }
  }

  clearSelectedRow(){
    let listRows = this.tableBody.nativeElement.rows;

    for(let i = 0; i < listRows.length; i++ ){
      if(listRows[i].classList.contains("selectedRow")){
        listRows[i].classList.remove("selectedRow")
      }
    }
  }

  edit(){
    let itemId = this.selectedId;
    let retornoTeste = {...this.filterableList[itemId], itemId};
    sessionStorage.setItem("selected", JSON.stringify(retornoTeste))
    this.router.navigate(['/novo'])
  }

  delete(){
    this.modal = true
  }

  openNew() {
    sessionStorage.removeItem("selected");
    this.router.navigate(['/novo'])
  }

  closeModal(){
    this.modal = false
    this.selectedId = undefined
    this.clearSelectedRow()
  }

  deleteModal(){
    this.filterableList.splice(this.selectedId, 1);
    this.selectedId = undefined
    this.modal = false
  }

}
