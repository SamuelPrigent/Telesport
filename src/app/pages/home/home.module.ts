import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// component
import { Home } from "./home.component";
// module
import { NgxModule } from "src/app/components/ngx/ngx.module";

@NgModule({
  declarations: [Home],
  imports: [CommonModule, NgxModule],
  exports: [Home],
})
export class HomeModule {}
