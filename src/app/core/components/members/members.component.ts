import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MemberDeleteDialogComponent } from '../dialogs/member-delete-dialog/member-delete-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
// import { IName } from '../interfaces/name.interface';
import { IClubMember } from '../../../shared/models/club-member.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { MemberDetailDialogComponent } from '../dialogs/member-detail-dialog/member-detail-dialog.component';
import { DialogService } from '../../services/dialog.service'
import { ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @ViewChild('memberTable', { static: false }) table: any;

  newId: number;
  nextAvailableId: number;
  member: IClubMember;
  rows: Array<IClubMember> = [];
  idArray: Array<IClubMember> = [];
  expanded: any = {};
  timeout: any;

  constructor(
    public httpService: HttpService,
    private router: Router,
    private dialog: MatDialog,
    public dialogService: DialogService,
    private dateFormat: DateFormatPipe
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.httpService.getMembers().subscribe(members => {
        this.rows = members;
        this.idArray = [...this.rows];
      }));
  }

  editMemberClick(rowId) {
    this.dialogService.rowNumber = rowId;
    console.log('row is', rowId);
    this.dialogService.openEditMemberDialog();
  }

  addMemberClick() {
    this.getNextId();
    this.dialogService.openAddMemberDialog();
    console.log('end of addMemberClick');
    console.log('rows are', this.rows);
  }

  // get the next unused id (member ID)
  getNextId() {
    this.nextAvailableId = Math.max.apply(Math, this.idArray.map(records => {
      return records.id + 1;
    }));
      this.dialogService.memberNumber.next(this.nextAvailableId);
  }

  // goToAddMemberForm() {
  //   this.httpService.editMemberMode = false;
  //   this.router.navigate(['new-member']);
  // }

  // openAddMemberDetailDialog(rowNum) {
  //   this.dialogService.openMemberDetailDialog(rowNum);
  // }

  // editMemberByID(id: any) {
  //   this.httpService.editMemberMode = true;
  //   // this.httpService.currentId = id;
  //   this.subscriptions.push(
  //   this.httpService.getMember(id).subscribe(member => {
  //     this.member = member;
  //     this.httpService.member = member;
  //     this.router.navigate(['new-member']);
  //   }));
  // }

  // openMemberDetailDialog(rowId: number) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = '700px';
  //   dialogConfig.height = '600px';
  //   dialogConfig.disableClose = false;
  //   dialogConfig.data = this.httpService.getMember(rowId);
  //   const dialogRef = this.dialog.open(MemberDetailDialogComponent, dialogConfig);

  // }

  // openDeleteDialog(data: string, comp: any) {
  //   console.log('row id', data);
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = '400px';
  //   dialogConfig.height = '250px';
  //   dialogConfig.disableClose = false;
  //   dialogConfig.data = data;
  //   const dialogRef = this.dialog.open(MemberDeleteDialogComponent, dialogConfig);
  //   this.subscriptions.push(
  //     dialogRef.afterClosed().subscribe(() => {
  //       this.httpService
  //         .getMembers()
  //         .subscribe(members => (this.rows = members));
  //     }));
  // }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

