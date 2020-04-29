import { Component, OnInit } from "@angular/core";

type listType = {
  id: number;
  label: string;
  selected?: boolean;
};

const data: listType[] = [
  {
    id: 1,
    label: "Item 1"
  },
  {
    id: 2,
    label: "Item 2"
  },
  {
    id: 3,
    label: "Item 3"
  },
  {
    id: 4,
    label: "Item 4"
  }
];

@Component({
  selector: "app-pick-list",
  templateUrl: "./pick-list.component.html",
  styleUrls: ["./pick-list.component.css"]
})
export class PickListComponent implements OnInit {
  private rightList: listType[];

  private leftList: listType[];
  private data: listType[] = data;
  private leftSelectedValues: string[] | null;
  private rightSelectedValues: string[] | null;
  constructor() {}

  add() {
    this.data = this.data.map(item => {
      return this.leftSelectedValues.includes(item.label)
        ? { ...item, selected: true }
        : item;
    });
    this.leftSelectedValues = null;
    this.updateList();
  }

  addAll() {
    this.data = this.data.map(item => {
      return { ...item, selected: true };
    });
    this.updateList();
  }

  remove() {
    this.data = this.data.map(item => {
      return this.rightSelectedValues.includes(item.label)
        ? { ...item, selected: false }
        : item;
    });
    this.rightSelectedValues = null;
    this.updateList();
  }

  removeAll() {
    this.data = this.data.map(item => {
      return { ...item, selected: false };
    });
    this.updateList();
  }
  updateList() {
    this.rightList = this.data.filter(item => item.selected);
    this.leftList = this.data.filter(item => !item.selected);
  }
  ngOnInit() {
    this.updateList();
  }
}
