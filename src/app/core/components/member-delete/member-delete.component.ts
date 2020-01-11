import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { HttpService } from '../../services/http.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-member-delete',
  templateUrl: './member-delete.component.html',
  styleUrls: ['./member-delete.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberDeleteComponent implements OnInit {

  @Input() rowId: number;
  @Input() firstName: string;
  @Input() lastName: string;

  constructor(
    public dialogService: DialogService,
    public httpService: HttpService
  ) { }

  ngOnInit() {
  }

  deleteConfirmedClick() {
    console.log('delete clicked in member delete, row', this.rowId);
    this.httpService.deleteMember(this.rowId);
    this.dialogService.closeDeleteDialog();
    this.httpService.refreshTable();
  }
}
