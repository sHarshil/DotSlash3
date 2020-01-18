import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./components/welcome.component";
import { CodingComponent } from "./components/code/coding.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent
  },
  {
    path: "code",
    component: CodingComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
