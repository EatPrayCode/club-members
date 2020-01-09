import { Injectable, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MemberDetailDialogComponent } from '../components/dialogs/member-detail-dialog/member-detail-dialog.component'
import { IClubMember } from '../../shared/models/club-member.model';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@Injectable({
  providedIn: 'root'
})

export class DialogService implements OnInit {

  private subscriptions: Subscription[] = [];
  public rows: Array<IClubMember> = [];
  private detailDialogRef;
  public memberNumber: BehaviorSubject<any>;
  public rowNumber;
  public memberSinceDate;
  public todaysDate;

  constructor(
    private dialog: MatDialog,
    public httpService: HttpService,
    private dateFormatPipe: DateFormatPipe
  ) {
    this.memberNumber = new BehaviorSubject(null);
  }

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
    console.log('row is', this.rowNumber);
  }

  openAddMemberDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '690px';
    dialogConfig.height = '590px';
    dialogConfig.disableClose = false;
    this.detailDialogRef = this.dialog.open(MemberDetailDialogComponent, dialogConfig);
    this.subscriptions.push(
      this.detailDialogRef.afterClosed().subscribe(() => {
        // this.httpService
        //   .getMembers()
        //   .subscribe(members => (this.rows = members));
      }));
  }

  closeMemberDetailDialog() {
    this.detailDialogRef.close();
  }

  onDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}