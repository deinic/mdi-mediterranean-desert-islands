import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SharedService } from '../services/shared.service';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()
  public openLC = new EventEmitter<boolean>()
  items!: MenuItem[];

  constructor(
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {

    this.items=[
      {
        label:'The Project',
        icon:'pi pi-info-circle',
        command: (event) =>{this.sharedService.openInfoProject().next(true)}

      },
      {
        label:'Layer Control',
        icon:'pi pi-map',
        command: (event) =>{ this.sharedService.openLCSidebar().next(true)}

      },
      {
        label:'Enlarge Zoom',
        icon:'pi pi-code',
        command: (event) =>{this.sharedService.getEnlargeZoom().next(true)}

      }
    ]

  }

  enlargeZoom(){
    this.sharedService.getEnlargeZoom().next(true)
  }

  openLayerControl(){
    this.sharedService.openLCSidebar().next(true)
  }

  


}
