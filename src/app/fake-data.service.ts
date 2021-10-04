import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  fakeData = [
    ['18394', 'Lorem ipsum dolor', 'Atacado'],
    ['18395', 'Cras mollis ut nunc', 'Varejo'],
    ['18396', 'Dapibus mi accumsan sagittis ', 'Varejo'],
    ['18397', 'Velit nec nulla rutrum', 'Internacional'],
    ['18398', 'Suspendisse finibus', 'Internacional'],
    ['18399', 'Donec ac dui at elit', 'Internacional'],
    ['18300', 'Vestibulum sollicitudin', 'Internacional'],
    ['18301', 'Cras pharetra', 'Atacado'],
    ['18302', 'Nullam rhoncus ultrices lacus', 'Atacado'],
    ['18303', 'Maecenas quis nulla', 'Varejo'],
    ['18304', 'Nullam tempor mi vel mi', 'Varejo'],
    ['18305', 'Maecenas sit amet', 'Atacado'],
    ['18306', 'Nulla consectetur eros', 'Atacado']
  ]

  constructor() { }


  getData(): Observable<any> {
    const data = of(this.fakeData);
    return data
  }

  setProduct(item:string[]) {
    this.fakeData.push(item);
  }

  changeProduct(item:any, id:number ){

    this.fakeData[id][1] = item.nome;
    this.fakeData[id][2] = item.categoria;
  }

}
