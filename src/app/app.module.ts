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
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './core/services/login.service';
import { MemberDeleteDialogComponent } from './core/components/dialogs/member-delete-dialog/member-delete-dialog.component';
import { MemberDetailDialogComponent } from './core/components/dialogs/member-detail-dialog/member-detail-dialog.component';
import { DialogService } from '../app/core/services/dialog.service'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MemberDetailComponent,
    MembersComponent,
    PageHeaderComponent,
    MemberDeleteDialogComponent,
    MemberDetailDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    NgxDatatableModule,
    HttpClientModule
  ],
  providers: [
      {
        provide: MatDialogRef,
        useValue: {}
      },
      LoginService,
      DialogService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
      MemberDetailDialogComponent,
      MemberDeleteDialogComponent
    ]
})
export class AppModule { }
