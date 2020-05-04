import { Component, OnInit } from "@angular/core";
import { CoverSheetService } from "../service/cover-sheet.service";

@Component({
  selector: "app-cover-sheet",
  templateUrl: "./cover-sheet.component.html",
  styleUrls: ["./cover-sheet.component.css"],
})
export class CoverSheetComponent implements OnInit {
  records: any[];

  constructor(private coverSheetService: CoverSheetService) {}

  ngOnInit() {
    this.coverSheetService.getCoverSheets().subscribe(data => {
      this.records = data
    });
  }

  deleteCoverSheet(id: string) {
    this.coverSheetService.deleteCoverSheet(id).subscribe(data => {
      console.log(data, ' delete api response')
    });
  }
}
