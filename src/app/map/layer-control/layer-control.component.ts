import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.css']
})
export class LayerControlComponent implements OnInit {

  constructor(
    private markers: MarkerService,
    private sharedService: SharedService

  ) { }


  public accordion_basemaps: boolean = false
  public accordion_islands: boolean = false

  public islands: any;
  public selectedIsland: any;
  public filteredNameIslands: any[] = [];
  public test: any[] = []
  stateOptions!: any[];
  public openLyC!: any 

  public natural: boolean = true 
  public natural_park: boolean = true
  public private: boolean = true
  public prison: boolean = true
  public military: boolean = true
  public industrial: boolean = true
  public selectedCountries: any
  public selectedBasemap: any
  public basemaps = [
    { title: 'OpenStreetMap_Mapnik' },
    { title: 'OpenTopoMap' },
    { title: 'OpenStreetMap_HOT' }

  ]

  public countries = [
    { name: 'Italy', code: 'it' },
    { name: 'France', code: 'fr' },
    { name: 'Spain', code: 'es' },
    { name: 'Greece', code: 'gr' },
    { name: 'Algeria', code: 'dz' },
    { name: 'Tunisia', code: 'tn' },
    { name: 'Turkey', code: 'tr' },
    { name: 'Libia', code: 'ly' },
    { name: 'Lebanon', code: 'lb' },
    { name: 'Albania', code: 'al' },
    { name: 'Croatia', code: 'hr' },
  ]

  ngOnInit(): void {
    this.selectedBasemap = this.basemaps[0]
    this.stateOptions = [{ label: 'Off', value: false }, { label: 'On', value: true }];


    this.sharedService.openLCSidebar().subscribe(res=>{
      this.openLyC=res
    })
  }


  changeSelector(e: any, type: number) {
      this.sharedService.getValuelayerControlButton().next({ status: e.value, type: type })
  }

  changeBasemap(e: any) {
    console.log(e.value.title)
    this.sharedService.getValuelayerControlButton().next({ title: e.value.title })
  }

  changeMultiSelector(e: any) {
    this.sharedService.getFilterByCountry().next(e.value)
    this.natural=true
    this.natural_park=true
    this.private=true
    this.prison=true
    this.military=true
    this.industrial=true
  }

  


  selectIsland() {
    this.sharedService.getIslandFromAutocomplete().next(this.selectedIsland)
  }


  filterCountry(event: any) {
    let filteredName: any[] = [];

    let query = event.query;
    this.markers.getMarkerIslands()
      .subscribe(res => {
        this.islands = res.features
        for (let f of res.features) {
          if (f.properties.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filteredName.push(f.properties.name);
          }
        }
        this.filteredNameIslands = filteredName
      })
  }

hideSidebar(){
  this.accordion_basemaps=false
  this.accordion_islands=false
}




}



