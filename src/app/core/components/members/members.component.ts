import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MemberDeleteDialogComponent } from '../dialogs/member-delete-dialog/member-delete-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
// import { IName } from '../interfaces/name.interface';
import { IClubMember } from '../../../shared/models/club-member.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription, BehaviorSubject } from 'rxjs';
// import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { MemberDetailDialogComponent } from '../dialogs/member-detail-dialog/member-detail-dialog.component';
import { DialogService } from '../../services/dialog.service'
import { ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { MemberNumberService } from '../../services/member-number.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @ViewChild('memberTable', { static: false }) table: any;

  newId: number;
  member: IClubMember;
  rows: Array<IClubMember> = [];
  expanded: any = {};
  timeout: any;

  constructor(
    public httpService: HttpService,
    private router: Router,
    private dialog: MatDialog,
    public dialogService: DialogService,
    private dateFormat: DateFormatPipe,
    private changeDetectorRef: ChangeDetectorRef,
    private memberNumberService: MemberNumberService
  ) { }

  ngOnInit() {
    // console.log('running ngInit members');
    this.subscriptions.push(
      this.httpService.getMembers().subscribe(members => {
        // console.log('subscribe ', members);
        this.rows = members;
        // console.log('members array in member', members);
        this.memberNumberService.idArray = [...members];
        // console.log('idArray in members', this.memberNumberService.idArray);
        //good to here
        this.memberNumberService.findNextAvailableId();
      }));
    this.httpService.newRows$.subscribe(value => {
      this.rows = [...value];
    })
  }

  editMemberClick(rowId) {
    this.dialogService.rowNumber = rowId;
    // console.log('row is', rowId);
    this.dialogService.openEditMemberDialog();
  }

  addMemberClick() {
    this.dialogService.openAddMemberDialog();
  }

  deleteMemberClick(row) {
    console.log('deleted called from table icon, row', row);
    this.dialogService.openDeleteDialog({ id: row.id, firstName: row.firstName, lastName: row.lastName });
    console.log('name is ', row.firstName);
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

