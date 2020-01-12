import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, DoCheck, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MemberDeleteDialogComponent } from '../dialogs/member-delete-dialog/member-delete-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { IClubMember } from '../../../shared/models/club-member.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription, BehaviorSubject } from 'rxjs';
import { MemberDetailDialogComponent } from '../dialogs/member-detail-dialog/member-detail-dialog.component';
import { DialogService } from '../../services/dialog.service'
import { ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { PhonePipe } from '../../../shared/pipes/phone-format.pipe';

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
  address_tooltip = 'Toggle address details';

  constructor(
    public httpService: HttpService,
    private router: Router,
    private dialog: MatDialog,
    public dialogService: DialogService,
    private dateFormat: DateFormatPipe,
    private changeDetectorRef: ChangeDetectorRef,
    // private memberNumberService: MemberNumberService
  ) { }

  ngOnInit() {
    // console.log('running ngInit members');
    this.subscriptions.push(
      this.httpService.getMembers().subscribe(members => {
        this.rows = members;
      }));
    this.httpService.newRows$.subscribe(value => {
      this.rows = [...value];
    })
  }

  editMemberClick(rowId) {
    // console.log('row is', rowId);
    this.subscriptions.push(
      this.httpService.getMember(rowId).subscribe(info => {
        this.dialogService.memberInfo = info;
        this.dialogService.isEditMode = true;
        this.dialogService.openMemberDetailDialog(this.dialogService.memberInfo);
      })
    );
  }

  addMemberClick() {
    this.dialogService.isEditMode = false;
    this.dialogService.openMemberDetailDialog();
  }

  deleteMemberClick(row) {
    this.dialogService.openDeleteDialog({ id: row.id, firstName: row.firstName, lastName: row.lastName });
    console.log('name is ', row.firstName);
  }

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

