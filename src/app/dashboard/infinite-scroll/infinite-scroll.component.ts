import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit {

  @ViewChild("container", { static: true }) container: ElementRef;
  rowHeight: number = 40;
  items: string[] = [];
  itemsInView: any[];
  startIndex: number = 0;
  endIndex: number = 0;

  constructor() { }

  ngOnInit() {
    this.items = this.generateItems(40);
  }

  refresh() {
    let scrollTop = this.container.nativeElement.scrollTop;
    let height = this.container.nativeElement.clientHeight;
    this.startIndex = Math.floor(scrollTop / this.rowHeight);
    this.endIndex = Math.ceil((scrollTop + height) / this.rowHeight);
    console.log('scrollTop - height ', scrollTop, height);
    console.log('S - E ', this.startIndex, this.endIndex);
    if (this.items) {
      this.itemsInView = this.items.slice(this.startIndex, this.endIndex);
    }
  }

  generateItems(n: number): string[] {
    var items: string[] = [];
    for (var i = 1; i <= n; i++) {
      items.push('Item ' + i);
    }
    return items;
  }

}
