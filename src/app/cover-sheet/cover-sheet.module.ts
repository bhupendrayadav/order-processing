import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { CoverSheetComponent } from "./cover-sheet.component";
import { CoverSheetEditComponent } from "./cover-sheet-edit/cover-sheet-edit.component";
import { CoverSheetAddComponent } from "./cover-sheet-add/cover-sheet-add.component";
import { SpinnerComponent } from '../spinner/spinner.component';
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
    CoverSheetAddComponent,
    SpinnerComponent
  ],
  imports: [CommonModule, PickListModule, RouterModule.forChild(routes)],
  exports: [CoverSheetComponent, SpinnerComponent]
})
export class CoverSheetModule {}
