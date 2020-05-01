import { Component, OnInit } from "@angular/core";
import { CoverSheetSerivce } from "../service/cover-sheet.service";

@Component({
  selector: "app-cover-sheet",
  templateUrl: "./cover-sheet.component.html",
  styleUrls: ["./cover-sheet.component.css"]
})
export class CoverSheetComponent implements OnInit {
  private records: any[];
  constructor(private coverSheetService: CoverSheetSerivce) {}

  ngOnInit() {
    this.records = this.coverSheetService.getCoverSheets();
  }
}
