import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
// component
import { Error } from "./error.component";
// module
import { HeaderModule } from "src/app/components/header/header.module";

@NgModule({
  declarations: [Error],
  imports: [CommonModule, HeaderModule, RouterModule],
  exports: [Error],
})
export class ErrorModule {}
