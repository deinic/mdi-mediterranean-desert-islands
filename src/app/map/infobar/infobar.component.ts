import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.css']
})
export class InfobarComponent implements OnInit {

  @Input() public name: string = ''
  @Input() public country: string = ''
  @Input() public typology_name: string = ''
  @Input() public description_island: string = ''
  @Input() public photos: any[] = []
  @Input() public video: any = ''

  public html: any
  public displayVideo: boolean=false
  constructor(
    private sanitazer:DomSanitizer
  ) { }

  goToLinkVideo() {
    //window.open(this.video, '_blank');
    this.displayVideo=true
    let iframe = '<iframe src="'+this.video+'" width=640" height="361" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen ></iframe>'
    this.html = this.sanitazer.bypassSecurityTrustHtml(iframe)
  
  }

  ngOnInit(): void {
  }

}
