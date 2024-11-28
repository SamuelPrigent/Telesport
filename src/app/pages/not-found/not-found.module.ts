import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
// component
import { NotFoundComponent } from "./not-found.component";
// module
import { HeaderModule } from "src/app/components/header/header.module";

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, HeaderModule, RouterModule],
  exports: [NotFoundComponent],
})
export class NotFoundModule {}
