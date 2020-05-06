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
    this.getAllCoverSheets();
  }

  getAllCoverSheets() {
    this.coverSheetService.getCoverSheets().subscribe((data) => {
      this.records = data;
    });
  }

  deleteCoverSheet(id: string) {
    const _record = this.records.find((item) => item.id === id);
    this.coverSheetService.deleteCoverSheet(_record).subscribe((data) => {
      alert("Cover Sheet deleted successfully!");
      this.getAllCoverSheets();
    });
  }
}
