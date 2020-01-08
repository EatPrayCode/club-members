import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MemberDetailDialogComponent } from '../components/dialogs/member-detail-dialog/member-detail-dialog.component'
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  private detailDialogRef;

  constructor(
    private dialog: MatDialog,
    public httpService: HttpService
  ) {
  }

  openMemberDetailDialog(rowId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = '600px';
    dialogConfig.disableClose = false;
    dialogConfig.data = this.httpService.getMember(rowId);
    this.detailDialogRef = this.dialog.open(MemberDetailDialogComponent, dialogConfig);
  }

  closeMemberDetailDialog() {
    this.detailDialogRef.close();
  }

}