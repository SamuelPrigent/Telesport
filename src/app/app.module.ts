import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
// componnent
import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
// pages
import { HomeModule } from "./pages/home/home.module";
import { DetailsModule } from "./pages/details/details.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // Test to fix err

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HomeModule,
    DetailsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
