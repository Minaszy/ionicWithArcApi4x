import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) private mapViewEl: ElementRef;
  view: any;
  constructor() { }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  async initializeMap() {
    // ----------------load 2d Map---------
    // try {
    //   const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView', 'esri/config', 'esri/WebScene', 'esri/views/SceneView']);

    //   const mapProperties = {
    //     basemap: 'streets'
    //   };

    //   const map = new Map(mapProperties);

    //   const mapViewProperties = {
    //     container: this.mapViewEl.nativeElement,
    //     center: [0.1278, 51.5074],
    //     zoom: 10,
    //     map: map
    //   };

    //   this.view = new MapView(mapViewProperties);

    //   return this.view;
    // } catch (error) {
    //   console.log('EsriLoader: ', error);
    // }
    // ----------------load 3d Map---------
    loadModules(['esri/config', 'esri/WebScene', 'esri/views/SceneView'])
      .then(([esriConfig, WebScene, SceneView]) => {
        esriConfig.portalUrl = 'https://kalends.maps.arcgis.com';
        const scene = new WebScene({
          portalItem: {
            id: '3a9976baef9240ab8645ee25c7e9c096'
            // id: 'f1d22c6947114e5e834adce10a0e8743'
          }
        });

        this.view = new SceneView({
          map: scene,
          container: this.mapViewEl.nativeElement
        });
        return this.view;
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  }
}
