import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// component
import { Home } from "./home.component";
// module
import { NgxPieModule } from "src/app/components/ngx-pie/ngx-pie.module";
import { HeaderModule } from "src/app/components/header/header.module";

@NgModule({
  declarations: [Home],
  imports: [CommonModule, NgxPieModule, HeaderModule],
  exports: [Home],
})
export class HomeModule {}
