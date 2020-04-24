import { Component, OnInit } from "@angular/core";
import { BingMapService } from "./bing-map.service";
import {} from "bingmaps";

@Component({
  selector: "app-bing-map",
  templateUrl: "./bing-map.component.html",
  styleUrls: ["./bing-map.component.css"]
})
export class BingMapComponent implements OnInit {
  map: any;
  infobox: any;
  constructor(private mapService: BingMapService) {}

  addInfoBox(): void {
    var randomLocation = Microsoft.Maps.TestDataGenerator.getLocations();
    var center = this.map.getCenter();

    var pin = new Microsoft.Maps.Pushpin(center);
    let _randomPins = Microsoft.Maps.TestDataGenerator.getPushpins();

    pin.metadata = {
      title: "Pin Title",
      description: "Pin discription"
    };
    //Add a click event handler to the pushpin.
    Microsoft.Maps.Events.addHandler(
      pin,
      "click",
      this.pushpinClicked.bind(this)
    );

    //Add pushpin to the map.
    this.map.entities.push(pin);
  }

  pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    //Set the infobox options with the metadata of the pushpin.
    this.infobox.setOptions({
      location: e.target.getLocation(),
      title: e.target.metadata.title,
      description: e.target.metadata.description,
      visible: true
    });
  }

  ngOnInit() {
    this.mapService.load().subscribe(() => {
      this.map = new Microsoft.Maps.Map("#myMap", {
        zoom: 2
      });

      //Create an infobox that doesn't have a pointer or close button.
      this.infobox = new Microsoft.Maps.Infobox(this.map.getCenter(), {
        visible: false
      });

      //Assign the infobox to a map instance.
      this.infobox.setMap(this.map);
    });
  }
}
