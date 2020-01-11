import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IClubMember } from 'src/app/shared/models/club-member.model';


@Injectable({
  providedIn: 'root'
})

export class MemberNumberService implements OnInit {

  public nextAvailableMemberNumber$ = new BehaviorSubject<number>(0);
  public idArray: Array<IClubMember> = [];

  ngOnInit() {}

  // get the next unused id (member ID)
  findNextAvailableId() {
    // console.log('running findNextAvailableId');
    // console.log('id array', this.idArray);
    let result = 0;
    Math.max.apply(Math, this.idArray.map(records => {
      // console.log('array is', this.idArray);
      // console.log('records from getNext', records);
      result = records.id + 1;
      // console.log('number result is', result);
      this.nextAvailableMemberNumber$.next(result);
    }));
  }

}
