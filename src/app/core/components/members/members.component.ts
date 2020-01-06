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

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @ViewChild('memberTable', {static: false}) table: any;

  // members = [];
  member: IClubMember;
  rows: Array<IClubMember> = [];
  expanded: any = {};
  timeout: any;

  // columnMode = ColumnMode;

  constructor(
    public httpService: HttpService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.httpService.getMembers().subscribe(members => {
      this.rows = members;
      this.httpService.editMemberMode = false;
    }));
  }

  goToAddMemberForm() {
    this.httpService.editMemberMode = false;
    this.router.navigate(['new-member']);
  }

  editMemberByID(id: any) {
    this.httpService.editMemberMode = true;
    // this.httpService.currentId = id;
    this.subscriptions.push(
    this.httpService.getMember(id).subscribe(member => {
      this.member = member;
      this.httpService.member = member;
      this.router.navigate(['new-member']);
    }));
  }

  openMemberDetailDialog(memberInfo: IClubMember) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '600px';
    dialogConfig.disableClose = true;
    dialogConfig.data = memberInfo;
    const dialogRef = this.dialog.open(MemberDetailComponent, dialogConfig);

  }

  openDeleteDialog(data: string, comp: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '300px';
    dialogConfig.disableClose = true;
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(MemberDeleteDialogComponent, dialogConfig);
    this.subscriptions.push(
    dialogRef.afterClosed().subscribe(() => {
      this.httpService
        .getMembers()
        .subscribe(members => (this.rows = members));
    }));
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }

  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `assets/data/100k.json`);

  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };

  //   req.send();
  // }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  // onDetailToggle(event) {
  // }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

