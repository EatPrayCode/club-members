import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./core/components/login/login.component";
import { MembersComponent } from './core/components/members/members.component';
const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "**",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "members",
    component: MembersComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
