import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet'
import 'leaflet.markercluster';
import { MarkerService } from '../services/marker.service';
import { PhotoService } from '../services/photo.service';
import { SharedService } from '../services/shared.service';
import { TypologyService } from '../services/typology.service';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input()
  public initViewMap!: boolean
  private map: any
  public sidebar: boolean = false
  public islands: any = []
  public name: string = "..passa il mouse sull'isola deserta..."
  public country: string = ''
  public nation: any = []
  public typology_name: string = ''
  public video: string = ''
  public description_island: string = ''
  public photos = []
  public natural_islands: any
  public responseLCB!: any
  public basemaps: any
  public filter_by_country: any = []
  public _filter_by_country: any = []

  public layer_filter: any = []
  public _layer_filter: any = []

  public clearChartSidebar = false
  @Output()
  public closeLC = new EventEmitter()
  public openChartSidebar: boolean = false

  public markerCluster: L.MarkerClusterGroup = L.markerClusterGroup();


  iconType(type: number) {
    let tipo
    switch (type) {
      case 1: //natural
        tipo = 'circle-fill'
        break
      case 2: //natural-park
        tipo = 'flag-fill'
        break
      case 3://private 
        tipo = 'ban'
        break
      case 4://prison
        tipo = 'key'
        break
      case 5://military
        tipo = 'shield'
        break
      case 6://industrial
        tipo = 'filter'
        break
    }
    return tipo
  }

  constructor(
    private marker: MarkerService,
    private typology: TypologyService,
    private photo: PhotoService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {


    this.sharedService.getEnlargeZoom().subscribe(res => {
      if (res) {
        this.map.flyTo([40, 14], 5)
      }
    })

    this.sharedService.getIslandFromAutocomplete().subscribe((res: any) => {
      for (let f of this.islands) {
        if (f.properties.name === res) {
          let lat = f.geometry.coordinates[0][0]
          let lon = f.geometry.coordinates[0][1]
          this.map.setView([lon, lat], 14)
          this.sharedService.openLayerControl.next(false)
        }
      }
    })






    this.map = L.map('map').setView([40, 14], 5)


    let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '<a href="https://nicoladeinnocentis.it">&copy; Geopillole</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    let OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: '<a href="https://nicoladeinnocentis.it">&copy; Geopillole</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });


    let OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '<a href="https://nicoladeinnocentis.it">&copy; Geopillole</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    });



    this.basemaps = {
      'OpenStreetMap_Mapnik': OpenStreetMap_Mapnik,
      'OpenTopoMap': OpenTopoMap,
      'OpenStreetMap_HOT': OpenStreetMap_HOT
    }

    this.marker.getMarkerIslands()
      .subscribe(res => {
        this.islands = res.features
        this.natural_islands = res.features.filter((f: any) => {
          return f.properties.island_typology == 1
        })
        this.buildMarker(this.natural_islands)

        let natural_park_islands = res.features.filter((f: any) => {
          return f.properties.island_typology == 2
        })
        this.buildMarker(natural_park_islands)

        let private_islands = res.features.filter((f: any) => {
          return f.properties.island_typology == 3
        })
        this.buildMarker(private_islands)

        let prison_islands = res.features.filter((f: any) => {
          return f.properties.island_typology == 4
        })
        this.buildMarker(prison_islands)

        let miltary_islands = res.features.filter((f: any) => {
          return f.properties.island_typology == 5
        })
        this.buildMarker(miltary_islands)

        let industrial_islands = res.features.filter((f: any) => {
          return f.properties.island_typology == 6
        })
        this.buildMarker(industrial_islands)

      })


    /*     this.marker.getMarker()
          .subscribe(res => {
            for (let f of res.features) {
              let lat = f.geometry.coordinates[0]
              let lon = f.geometry.coordinates[1]
              let html = '<h1>' + f.properties.indirizzo + '</h1>'
                + '<h2>' + f.properties.city + '</h2>'
                + '<h2>' + f.properties.country + '</h2>'
                + '<h3>' + f.properties.status + '</h3>'
                + '<img width="100%" src="' + f.properties.img + '">'
    
              L.marker([lon, lat])//.addTo(this.map)
                .bindPopup(html)
            }
          }) */




let isZero=true
    //Island Layer Control 

    this.sharedService.getValuelayerControlButton().subscribe(res => {
      this.responseLCB = res

      //basemap
      if (this.responseLCB.title) {
        this.map.eachLayer((layer: any) => {
          if (layer._url) {
            this.map.removeLayer(layer);
          }
        });
        this.map.addLayer(this.basemaps[this.responseLCB.title])
      } //islands
      else {

        if (this.responseLCB.status) {



          this.map.eachLayer((layer: any) => {
            this.markerCluster.removeLayer(layer)
            if (!layer._url) {
              this.map.removeLayer(layer);
            }
          });

          console.log('filter_by_country', this.filter_by_country)

          if (this.filter_by_country.length !== 0) {
            let tmp_layer:any=[]
            for (let i = 0; i < this.filter_by_country.length; i++) {
              this.nation.push(this.filter_by_country[i].code.toUpperCase())
              this.layer_filter = this.islands.filter((f: any) => {
                return f.properties.island_typology == this.responseLCB.type && f.properties.country === this.nation[i]
              })
              tmp_layer = [...tmp_layer, ...this.layer_filter]

            }
            this._layer_filter = [...this._layer_filter, ...tmp_layer]
            this.buildMarker(this._layer_filter)
          } else {
            this.layer_filter = this.islands.filter((f: any) => {
              return f.properties.island_typology == this.responseLCB.type
            })
            
            this._layer_filter = [...this._layer_filter, ...this.layer_filter]
            this.buildMarker(this._layer_filter)
          }


          /*           this.layer_filter = this.islands.filter((f: any) => {
                      if (this.filter_by_country.length!==0) {
                        for (let c of this.filter_by_country ) {
                          //this.nation = c.code.toUpperCase()
                          this.nation.push(c.code.toUpperCase()) 
                        }
                        return f.properties.island_typology == this.responseLCB.type && f.properties.country === this.nation[0]
                      } else {
                        return f.properties.island_typology == this.responseLCB.type
                      }
                      //return f.properties.island_typology == this.responseLCB.type
          
                    }) */


        } else {

          if (this._layer_filter.length === 0 && isZero) {
            this._layer_filter = this.islands
          }
          this.map.eachLayer((layer: any) => {
            this.markerCluster.removeLayer(layer)
            if (!layer._url) {
              this.map.removeLayer(layer);
            }
          });

          this.layer_filter = this._layer_filter.filter((f: any) => {
            return f.properties.island_typology !== this.responseLCB.type
          })

          this.buildMarker(this.layer_filter)
          this._layer_filter = this.layer_filter
          isZero=false

        }
      }
    })


    //Filter by country

    this.sharedService.getFilterByCountry().subscribe(res => {
      console.log(res)
      this.filter_by_country = res
      this._layer_filter = []

      if (this.filter_by_country.length != 0) {
        this.map.eachLayer((layer: any) => {
          this.markerCluster.removeLayer(layer)
          if (!layer._url) {
            this.map.removeLayer(layer);
          }
        });

        for (let filter of this.filter_by_country) {
          this.layer_filter = this.islands.filter((f: any) => {
            return f.properties.country === filter.code.toUpperCase()
          })
          console.log(this.layer_filter)
          this.buildMarker(this.layer_filter)
          this._layer_filter = [...this.layer_filter, ...this._layer_filter]
        }

        console.log('_layer_filter', this._layer_filter)


        this.openChartSidebar = true
        this.clearChartSidebar = false

      } else {

        this.map.eachLayer((layer: any) => {
          this.markerCluster.removeLayer(layer)
          if (!layer._url) {
            this.map.removeLayer(layer);
          }
        });
        this.buildMarker(this.islands)
        this._layer_filter = this.islands
        this.openChartSidebar = false
        this.clearChartSidebar = true
      }


    })


  }






  buildMarker(markers: any) {
    for (let f of markers) {
      const customIcon = L.divIcon({
        html: '<i style="margin-bottom: -7px;margin-left: -8px;" class="icon-custom icon-color pi pi-' + this.iconType(f.properties.island_typology) + '"></i>',
        iconSize: [0, 0],
      });
      let lat = f.geometry.coordinates[0][0]
      let lon = f.geometry.coordinates[0][1]

      let mk = L.marker([lon, lat], { icon: customIcon, title: f.properties.island_typology })
      this.markerCluster.addLayer(mk)
      //this.markerCluster
      //mk.addTo(this.map)
      this.map.addLayer(this.markerCluster)


      mk.on('click', () => {
        this.sidebar = true
        this.typology.getTypologies()
          .subscribe((res) => {
            console.log(res)
            this.typology_name = res[f.properties.island_typology - 1].type_name
            this.video = res[f.properties.island_typology - 1].url_video
            this.description_island = res[f.properties.island_typology - 1].descr
          })

        this.photo.getPhotos(f.properties.id)
          .subscribe((res) => {
            this.photos = res
          })

        this.name = f.properties.name;
        this.country = f.properties.country
      })
    }


  }

  closeSidebarCharts(value: any) {
    this.openChartSidebar = value
  }


}

