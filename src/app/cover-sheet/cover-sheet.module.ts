import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { CoverSheetComponent } from "./cover-sheet.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CoverSheetEditComponent } from "./cover-sheet-edit/cover-sheet-edit.component";
import { CoverSheetAddComponent } from "./cover-sheet-add/cover-sheet-add.component";
import { PickListModule } from "../pick-list/pick-list.module";

const routes: Routes = [
  {
    path: "cover-sheet",
    component: CoverSheetComponent
  },
  {
    path: "cover-sheet/edit/:id",
    component: CoverSheetEditComponent
  },
  {
    path: "cover-sheet/add",
    component: CoverSheetAddComponent
  }
];

@NgModule({
  declarations: [
    CoverSheetComponent,
    CoverSheetEditComponent,
    CoverSheetAddComponent
  ],
  imports: [CommonModule, PickListModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule],
  exports: [CoverSheetComponent]
})
export class CoverSheetModule {}
