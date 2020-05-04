import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { FormsModule } from '@angular/forms';

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

  target: any[] = [];
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
        this.target.push(this.source.find(item => record === item.id));
      });
      this.updatedSource = this.source.filter(itemFromSource => {
        return !this.target.find(itemfromTarget => {
          return itemFromSource.id === itemfromTarget.id;
        });
      });
      this.selectedSource = [];
      this.selectedValues.emit(this.target);
    }
  }

  addAll() {
    if (this.updatedSource.length) {
      this.target = this.source;
      this.updatedSource = [];
      this.selectedValues.emit(this.target);
    }
  }

  removeAll() {
    if (this.target.length) {
      this.target = [];
      this.updatedSource = this.source;
      this.selectedValues.emit(this.target);
    }
  }

  remove() {
    if (this.selectedTarget.length) {
      this.selectedTarget.forEach(ids => {
        this.updatedSource.push(this.source.find(item => ids === item.id));
      });

      this.target = this.target.filter(
        item => !this.selectedTarget.includes(item.id)
      );
      this.selectedTarget = [];
      this.selectedValues.emit(this.target);
    }
  }

  ngOnInit() {
    this._source.subscribe(value => (this.updatedSource = value));
  }
}
