import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// component
import { Details } from "./details.component";
// module
import { HeaderModule } from "src/app/components/header/header.module";
import { NgxLineModule } from "src/app/components/ngx-line/ngx-line.module";

@NgModule({
  declarations: [Details],
  imports: [CommonModule, HeaderModule, NgxLineModule],
  exports: [Details],
})
export class DetailsModule {}
