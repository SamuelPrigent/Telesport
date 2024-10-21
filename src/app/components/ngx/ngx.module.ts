import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// ngx
import { NgxChartsModule } from "@swimlane/ngx-charts"; // library
import { Ngx } from "./ngx.component"; // component

@NgModule({
  declarations: [Ngx],
  imports: [CommonModule, NgxChartsModule],
  exports: [Ngx],
})
export class NgxModule {}
