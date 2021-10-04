import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeDataService } from 'src/app/fake-data.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent implements OnInit {
  fakeData:any;
  editable = false;
  edit = false;
  id!:number;
  title = "Cadastro de novo produto";
  codeValidation = false

  formNovo = new FormGroup({
    nome : new FormControl('', [
      Validators.required
    ]),
    codigo : new FormControl('', [
      Validators.required
    ]),
    categoria: new FormControl('Atacado')
  })

  constructor( private router: Router, private dataService: FakeDataService ) { }

  ngOnInit(): void {
    this.dataService.getData()
      .subscribe( data => { 
        this.fakeData = data;
      } )

    let retorno = JSON.parse(sessionStorage.getItem("selected")!);

    if(retorno){
      this.title = "Edição de produto"
      this.id = retorno.itemId
      this.edit = true;
      this.formNovo.setValue({
        nome: retorno[1],
        codigo: retorno[0],
        categoria: retorno[2]
      })
      
      this.formNovo.get('codigo')?.disable()
    }
  }

  onSubmit() {
    if(this.edit){
      let retornoEdit = {
        nome: this.formNovo.value.nome,
        categoria: this.formNovo.value.categoria
      }
      this.dataService.changeProduct(retornoEdit, this.id)
      this.router.navigate([''])
    } else {
      this.checkCode(this.formNovo.value)
    }
  }

  checkCode(formData:any){
    let repetido = false;
    this.fakeData.forEach( (el: any[]) => {
      if(el[0] === formData.codigo.toString()){
        repetido = true
      } 
    })

    if(!repetido){
      let item = [formData.codigo.toString(), formData.nome, formData.categoria]
      this.dataService.setProduct(item);
      this.router.navigate([''])
    } else {
      this.codeValidation = true
      setTimeout( () => {
        this.codeValidation = false
      }, 2000)
    }
  }

  return(){
    this.router.navigate([''])
  }

}
