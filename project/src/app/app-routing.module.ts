import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome.component';
import { CodingComponent } from './components/code/coding.component';


const routes: Routes = [  
  { 
    path: '', 
    component: WelcomeComponent 
  },
  { 
    path: 'code', 
    component: CodingComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
