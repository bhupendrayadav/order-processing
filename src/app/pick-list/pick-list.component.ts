import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-pick-list",
  templateUrl: "./pick-list.component.html",
  styleUrls: ["./pick-list.component.css"]
})
export class PickListComponent implements OnInit {
  selectedSource: any[] = [];
  selectedTarget: any[] = [];

  @Input() sourceLabel: string;
  @Input() targetLabel: string;

  @Input() target: any[] = [];
  @Input() isDisable: boolean = false;

  @Output() selectedValues = new EventEmitter<any[]>();

  private _source = new BehaviorSubject<any[]>([]);
  private updatedSource: any[] = [];

  @Input()
  set source(value) {
    this._source.next(value);
  }

  get source() {
    return this._source.getValue();
  }

  add() {
    if (this.selectedSource.length) {
      this.selectedSource.forEach(record => {
        const removedFromSource = this.updatedSource.filter(item => item.id === record);

        this.target = removedFromSource.concat(this.target);

        //this.target.push(this.source.find(item => record === item.id));
      });

      this.updatedSource = this.updatedSource.filter(itemFromSource => {
          return !this.selectedSource.includes(itemFromSource.id)
      });
      this.selectedSource = [];
      this.selectedTarget = [];
      this.selectedValues.emit(this.target);
    }
  }

  addAll() {
    if (this.updatedSource.length) {
      this.target = this.target.concat(this.updatedSource);
      this.updatedSource = [];
      this.selectedValues.emit(this.target);
    }
  }

  removeAll() {
    if (this.target.length) {
      this.updatedSource = this.updatedSource.concat(this.target);
      this.target = [];
      this.selectedValues.emit(this.target);
    }
  }

  remove() {
    if (this.selectedTarget.length) {
      this.selectedTarget.forEach(ids => {
        const removedFromTarget = this.target.filter(item => item.id === ids);

        this.updatedSource = removedFromTarget.concat(this.updatedSource);
        //this.updatedSource.push(this.source.find(item => ids === item.id));
      });

      this.target = this.target.filter(
        item => !this.selectedTarget.includes(item.id)
      );
      this.selectedTarget = [];
      this.selectedSource = [];
      this.selectedValues.emit(this.target);
    }
  }

  ngOnInit() {
    this._source.subscribe(value => (this.updatedSource = value));
  }
}
