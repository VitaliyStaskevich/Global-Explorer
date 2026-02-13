import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { TUI_DARK_MODE, TuiTitle } from '@taiga-ui/core';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [CommonModule, TuiTitle],
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorldMapComponent implements OnInit, OnDestroy {
  private root!: am5.Root;
  private darkMode = inject(TUI_DARK_MODE);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  initMap() {
    const root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoMercator(),
        paddingBottom: 20,
        paddingTop: 20,
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"] //exclude Antarctica
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(this.darkMode() ? 0x2b2b2b : 0xe0e0e0),
      stroke: am5.color(this.darkMode() ? 0x444444 : 0xffffff),
      id: undefined
    });
    polygonSeries.mapPolygons.template.adapters.add("ariaLabel", (label, target) => {
      const dataContext = target.dataItem?.dataContext as any;
      return dataContext?.id; //us br 
    });
        
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x008cff) //primary blue
    });

    //navigation
    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
    const dataItem = ev.target.dataItem;
    const countryId = (dataItem?.dataContext as any)?.id;

    if (countryId) {
        this.router.navigate(['/country', countryId]);
    }
    });

    this.root = root;
    //expose for testing
    (window as any).mapPolygonSeries = polygonSeries;
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}