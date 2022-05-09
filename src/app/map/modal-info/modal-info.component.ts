import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent implements OnInit {
  displayBasic! : boolean ;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.openInfoProject().subscribe(res=>{
      this.displayBasic=true
    })
  }

}
