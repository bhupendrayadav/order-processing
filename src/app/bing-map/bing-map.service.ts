import { Injectable } from "@angular/core";
import { Observable, from, Subscriber, throwError } from "rxjs";
import { delay } from "rxjs/operators";

const BING_URI =
  "https://www.bing.com/api/maps/mapcontrol?key=AjsXXWr6Bm0A7eqIOsTmPMInTq43PtPfxLa57UWFDK8bAlfl9EhNLInybu2gOicC";

@Injectable({
  providedIn: "root"
})
export class BingMapService {
  private script = { loaded: false, scr: BING_URI };
  constructor() {}
  load() {
    let observer = new Observable((subscriber: Subscriber<boolean>) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = this.script.scr;
      if (this.script.loaded) {
        subscriber.next(true);
      }
      script.onload = () => {
        this.script.loaded = true;
        subscriber.next(true);
      };
      script.onerror = (error: any) => {
        return throwError(false);
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    });
    return observer.pipe(delay(1000));
  }
}
