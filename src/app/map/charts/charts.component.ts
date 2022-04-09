import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/chart.interface';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})



export class ChartsComponent implements OnInit {


  @Input() chart_sidebar!: boolean
  @Input() islands: any
  @Input() clearChartSidebar!: boolean
  public countries: any = []
  public total_islands: any = []

  private _country: any = []




  @Output() close_sidebar = new EventEmitter()

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {


    this.sharedService.getFilterByCountry().subscribe(res => {
      this.countries = res

      for (let filter of this.countries) {
        this._country = this.islands.filter((f: any) => {
          return f.properties.country === filter.code.toUpperCase()
        })
        filter.tot_islands = this._country.length

        //PIE CHART

        let _natural = this._country.filter((f: any) => {
          return f.properties.island_typology == 1
        })
        filter.natural = _natural.length

        let _natural_park = this._country.filter((f: any) => {
          return f.properties.island_typology == 2
        })
        filter.natural_park = _natural_park.length

        let _private = this._country.filter((f: any) => {
          return f.properties.island_typology == 3
        })
        filter.private = _private.length

        let _prison = this._country.filter((f: any) => {
          return f.properties.island_typology == 4
        })
        filter.prison = _prison.length

        let _military = this._country.filter((f: any) => {
          return f.properties.island_typology == 5
        })
        filter.military = _military.length

        let _industrial = this._country.filter((f: any) => {
          return f.properties.island_typology == 6
        })
        filter.industrial = _industrial.length

        filter.chart = {
          labels: ['Natural', 'Natural Park', 'Private', 'Prison', 'Military', 'Industrial'],
          datasets: [
            {
              data: [filter.natural, filter.natural_park, filter.private, filter.prison,filter.military,filter.industrial],
              backgroundColor: [
                "#A6BCB1", "#20C41B", "#BC1D10", "#1629BC", "#084A15", "#EAE616"
              ],
              hoverBackgroundColor: [
                "#A6BCB1", "#20C41B", "#BC1D10", "#1629BC", "#084A15", "#EAE616"
              ]
            }
          ]
        };

      }

    })


  }


  hideChart() {
    this.close_sidebar.emit(false)
  }




}
