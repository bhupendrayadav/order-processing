import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "multi-select-box",
  templateUrl: "./multi-select-box.component.html",
  styleUrls: ["./multi-select-box.component.css"]
})
export class MultiSelectBoxComponent implements OnInit {
  @Input() private selectBoxLabel: string = 'Please Select';
  @Input() private size: number = 8;
  @Input() private options: any[] = [];
  @Input() public name: string = 'select';

  @Output() afterSelections = new EventEmitter();

  handleSelection(selectedValues: any[]) {
    const emitSelection = {
      selectedValues,
      type: this.name
    };

    this.afterSelections.emit(emitSelection);
  }

  ngOnInit() {

  }
}
