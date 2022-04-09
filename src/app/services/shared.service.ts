import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  nameIslandFromAutocomplete = new Subject()
  layerControlButton = new Subject()
  filterByCountry = new Subject()
  enlargeZoom = new Subject()
  openLayerControl = new Subject()

  getIslandFromAutocomplete(){
    return this.nameIslandFromAutocomplete
  }

  getValuelayerControlButton(){
    return this.layerControlButton
  }

  openLCSidebar(){
    return this.openLayerControl
  }

  getFilterByCountry(){
    return this.filterByCountry
  }

  getEnlargeZoom(){
    return this.enlargeZoom
  }

  constructor() { }
}
