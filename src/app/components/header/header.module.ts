import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
// Component
import { Header } from "./header.component";

@NgModule({
  declarations: [Header],
  imports: [CommonModule, RouterModule],
  exports: [Header],
})
export class HeaderModule {}
