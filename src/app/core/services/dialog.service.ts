import { Injectable, Inject, OnInit, ApplicationRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MemberDetailDialogComponent } from '../components/dialogs/member-detail-dialog/member-detail-dialog.component'
import { MemberDeleteDialogComponent } from '../components/dialogs/member-delete-dialog/member-delete-dialog.component'
import { MemberDetailReactiveComponent } from '../components/member-detail-reactive/member-detail-reactive.component';
import { IClubMember } from '../../shared/models/club-member.model';
import { HttpService } from './http.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { Router } from '@angular/router';

export interface IDialogData {
  rowId: string,
  firstName?: string,
  lastName?: string
}

@Injectable({
  providedIn: 'root'
})
export class DialogService implements OnInit {

  private subscriptions: Subscription[] = [];
  public rows: Array<IClubMember> = [];
  private detailDialogRef;
  private deleteDialogRef;
  public rowNumber;
  public memberSinceDate;
  public todaysDate;
  // public memberNumber;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    public httpService: HttpService,
    private dateFormatPipe: DateFormatPipe,
    private applicationRef: ApplicationRef
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.httpService.getMembers().subscribe(members => {
        this.rows = members;
      }));
  }

  formatMemberSinceDate(value: Date) {
    this.todaysDate = this.dateFormatPipe.transform(value);
  }

  openEditMemberDialog() {
    // console.log('row is', this.rowNumber);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '690px';
    dialogConfig.height = '590px';
    dialogConfig.disableClose = false;
    this.detailDialogRef = this.dialog.open(MemberDetailDialogComponent, dialogConfig);
  }

  openAddMemberDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '690px';
    dialogConfig.height = '590px';
    dialogConfig.disableClose = true;
    this.detailDialogRef = this.dialog.open(MemberDetailDialogComponent, dialogConfig);
    this.subscriptions.push(
      this.detailDialogRef.afterClosed().subscribe(() => {

      }));
  }

  closeMemberDetailDialog() {
    this.detailDialogRef.close();
  }

  openDeleteDialog(data: any) {
    //got row here, get it to dialog for confirm click
    console.log('called from members component, row', data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '220px';
    dialogConfig.disableClose = false;
    dialogConfig.data = data;
    this.deleteDialogRef = this.dialog.open(MemberDeleteDialogComponent, dialogConfig);
    this.subscriptions.push(
      this.deleteDialogRef.afterClosed().subscribe(() => {
        this.httpService
          .getMembers()
          .subscribe(members => (this.rows = members));
      }));
  }

  closeDeleteDialog() {
    this.deleteDialogRef.close();
  }

  onDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}