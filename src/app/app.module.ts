import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { InfobarComponent } from './map/infobar/infobar.component';
import {SidebarModule} from 'primeng/sidebar';
import {ImageModule} from 'primeng/image';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { LayerControlComponent } from './map/layer-control/layer-control.component';
import { HeaderComponent } from './header/header.component';
import {ToolbarModule} from 'primeng/toolbar';
import {AvatarModule} from 'primeng/avatar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ListboxModule} from 'primeng/listbox';
import {MultiSelectModule} from 'primeng/multiselect';
import { ChartsComponent } from './map/charts/charts.component';
import {CardModule} from 'primeng/card';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InfobarComponent,
    LayerControlComponent,
    HeaderComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    ImageModule,
    AvatarModule,
    AccordionModule,
    DialogModule,
    ToolbarModule,
    CardModule,
    SelectButtonModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    ButtonModule,
    HttpClientModule,
    ListboxModule,
    FormsModule,
    ChartModule,
    MultiSelectModule,
    TieredMenuModule,
    ToggleButtonModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
