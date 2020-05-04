import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MultiSelectBoxComponent } from "./multi-select-box/multi-select-box.component";

@NgModule({
  declarations: [MultiSelectBoxComponent],
  imports: [CommonModule, FormsModule],
  exports: [MultiSelectBoxComponent]
})
export class CoreModule {}
