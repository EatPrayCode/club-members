import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-member-delete-dialog',
  templateUrl: './member-delete-dialog.component.html',
  styleUrls: ['./member-delete-dialog.component.css']
})
export class MemberDeleteDialogComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  rowId: string;
  firstName: string;
  lastName: string;

  constructor(
    private httpService: HttpService,
    public dialogRef: MatDialogRef<MemberDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any) {
      this.rowId = row.id;
      this.firstName = row.firstName;
      this.lastName = row.lastName;
     }

  deleteConfirmedClick() {
    console.log('calling deleteConfirmedClick from dialog', this.rowId);
    this.httpService.deleteMember(this.rowId);
    this.dialogRef.close();
    this.httpService.refreshTable();
  }

  ngOnInit() {
    // this.rowId = this.dialogRef._containerInstance._config.row.rowId;

    console.log('in dialog, row is ', this.rowId);
  }
}
