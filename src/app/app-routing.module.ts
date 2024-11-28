import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// component
import { Home } from "./pages/home/home.component";
import { Details } from "./pages/details/details.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { Error } from "./pages/error/error.component";

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
    path: "error",
    component: Error,
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
