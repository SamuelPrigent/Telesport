import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Component
import { Header } from "./header.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [Header],
  imports: [CommonModule, RouterModule],
  exports: [Header],
})
export class HeaderModule {}
