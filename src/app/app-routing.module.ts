import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThankYouComponent } from "./thank-you/thank-you.component";
import { HomeComponent } from "./home/home.component";
import { UnknownPageComponent } from "./unknown-page/unknown-page.component";

const routes: Routes = [
  { path: 'enter', component: HomeComponent },
  { path: 'thankyou', component: ThankYouComponent },
  { path: '', 
    redirectTo: '/enter',
    pathMatch: 'full'
  },
  { path: '**', component: UnknownPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
