import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-member-delete-dialog',
  templateUrl: './member-delete-dialog.component.html',
  styleUrls: ['./member-delete-dialog.component.scss']
})
export class MemberDeleteDialogComponent implements OnInit {

  constructor(
    private httpService: HttpService
  ) { }

  deleteMember(id) {
    this.httpService.deleteMember(id);
  }

  ngOnInit() {
  }

}
