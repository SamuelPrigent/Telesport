import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// component
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { Home } from "./pages/home/home.component";
import { Details } from "./pages/details/details.component";

const routes: Routes = [
  {
    path: "",
    component: Home,
  },
  {
    path: "details/:country",
    component: Details,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
