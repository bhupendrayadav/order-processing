import { Component, OnInit, Input } from '@angular/core';
import { HttpProgressState, HttpStateService, IHttpState } from '../service/http-state.service';

@Component({
  selector: 'http-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  public loading = false;
  @Input() public filterBy: string | null = null;

  constructor(private httpStateService: HttpStateService) { }

  /**
   * receives all HTTP requests and filters them by the filterBy
   * values provided
   */
  ngOnInit() {
    this.httpStateService.state.subscribe((progress: IHttpState) => {
      if (progress && progress.url) {
        if (!this.filterBy) {
          this.loading = (progress.state === HttpProgressState.start) ? true : false;
        } else if (progress.url.indexOf(this.filterBy) !== -1) {
          this.loading = (progress.state === HttpProgressState.start) ? true : false;
        }
      }
    });
  }
}
