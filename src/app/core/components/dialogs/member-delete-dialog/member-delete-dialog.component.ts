import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';



@Component({
  selector: 'app-member-delete-dialog',
  templateUrl: './member-delete-dialog.component.html',
  styleUrls: ['./member-delete-dialog.component.scss']
})
export class MemberDeleteDialogComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  rowId: string;
  firstName: string;
  lastName: string;

  constructor(
    private httpService: HttpService,
    public dialogRef: MatDialogRef<MemberDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  deleteConfirmedClick() {
    console.log('calling deleteConfirmedClick from dialog', this.rowId);
    this.httpService.deleteMember(this.rowId);
    this.dialogRef.close();
  }

  ngOnInit() {
    this.rowId = this.dialogRef._containerInstance._config.data.rowId;
  }

}
