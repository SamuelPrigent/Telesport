import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
// component
import { Details } from "./details.component";
// module
import { HeaderModule } from "src/app/components/header/header.module";
import { NgxLineModule } from "src/app/components/ngx-line/ngx-line.module";

@NgModule({
  declarations: [Details],
  imports: [CommonModule, HeaderModule, NgxLineModule, RouterModule],
  exports: [Details],
})
export class DetailsModule {}
