import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
//
// import { HomeComponent } from './pages/home2/home.component';
//
import { Home } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  // (when click on the pie chart)
  // {
  //   path: 'detail',
  //   component: DetailComponent,
  // },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
