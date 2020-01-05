import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MemberDeleteDialogComponent } from '../dialogs/member-delete-dialog/member-delete-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
// import { IName } from '../interfaces/name.interface';
import { IClubMember } from '../../../shared/models/club-member.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  // members = [];
  member: IClubMember;
  rows: Array<IClubMember> = [];

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

  openDeleteDialog(data: string, comp: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '300px';
    dialogConfig.disableClose = false;
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(MemberDeleteDialogComponent, dialogConfig);
    this.subscriptions.push(
    dialogRef.afterClosed().subscribe(() => {
      this.httpService
        .getMembers()
        .subscribe(members => (this.rows = members));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

