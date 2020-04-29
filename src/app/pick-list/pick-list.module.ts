import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PickListComponent } from "./pick-list.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [PickListComponent],
  imports: [CommonModule, FormsModule],
  exports: [PickListComponent]
})
export class PickListModule {}
