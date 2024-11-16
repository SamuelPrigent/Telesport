import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// ngx
import { NgxChartsModule } from "@swimlane/ngx-charts"; // library
import { NgxPie } from "./ngx-pie.component"; // component

@NgModule({
  declarations: [NgxPie],
  imports: [CommonModule, NgxChartsModule],
  exports: [NgxPie],
})
export class NgxPieModule {}
