import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { MemberDetailComponent } from './core/components/member-detail/member-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MembersComponent } from './core/components/members/members.component';
import { PageHeaderComponent } from './core/header/page-header.component';

import { LoginService } from './core/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MemberDetailComponent,
    MembersComponent,
    PageHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
