import { Component, OnInit } from "@angular/core";
import { CoverSheetService } from "../service/cover-sheet.service";

@Component({
  selector: "app-cover-sheet",
  templateUrl: "./cover-sheet.component.html",
  styleUrls: ["./cover-sheet.component.css"],
})
export class CoverSheetComponent implements OnInit {
  records: any[];
  page = 1;
  pageSize = 5;
  totalRecords: number = 0;
  pageCount: number = 0;

  constructor(private coverSheetService: CoverSheetService) {}

  ngOnInit() {
    this.getAllCoverSheets(this.page, this.pageSize, this.pageCount);
  }

  onPageChange(page: number) {
    this.page = page;

    this.getAllCoverSheets(this.page, this.pageSize, this.pageCount);
  }

  getAllCoverSheets(pageIndex: number, pageSize: number, pageCount: number) {
    this.coverSheetService.getCoverSheets(pageIndex, pageSize, pageCount).subscribe((data: any) => {
      this.records = data.coverSheets;
      this.totalRecords = data.maxPage * this.pageSize;
      this.pageCount = data.maxPage;
    });
  }

  deleteCoverSheet(id: string) {
    const _record = this.records.find((item) => item.id === id);
    this.coverSheetService.deleteCoverSheet(_record).subscribe((data) => {
      alert("Cover Sheet deleted successfully!");
      this.getAllCoverSheets(this.page, this.pageSize, this.pageCount);
    });
  }
}
