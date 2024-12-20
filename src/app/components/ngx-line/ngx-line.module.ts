import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// ngx
import { NgxChartsModule } from "@swimlane/ngx-charts"; // library
import { NgxLine } from "./ngx-line.component"; // component

@NgModule({
  declarations: [NgxLine],
  imports: [CommonModule, NgxChartsModule], // Ngx... is a test to fix error
  exports: [NgxLine],
})
export class NgxLineModule {}
