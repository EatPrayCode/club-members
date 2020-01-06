import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IClubMember } from 'src/app/shared/models/club-member.model';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { ZipcodeService } from '../../services/zipcode.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  memberModel: IClubMember;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  selected: boolean;
  // filtered: any;
  teams = [];
  teamList: any;
  selectedTeam;
  // index: number;

  constructor(
    private httpService: HttpService,
    private router: Router,
    public zipcodeService: ZipcodeService
  ) {}

  ngOnInit() {
    console.log('running init');
    this.zipcodeService.getCityState().subscribe(addressResponse => {
      let cityName = addressResponse[0].city_states[0].city;
      let stateAbbreviation = addressResponse[0].city_states[0].state_abbreviation;
      console.log(cityName + ', ' + stateAbbreviation);

    })

    // this.httpService.getTeams().subscribe(teams => {
    //   this.teams = teams;
    //   this.selectedTeam = ''
    //   console.log("teams", this.teams);
    //   console.log('member is', this.httpService.member);

      //  if (this.httpService.member != undefined) {
      //    this.memberModel = this.httpService.member;
      //  }
    // });
  }

  cancelEdit() {
    // this.httpService.member = undefined;
    this.router.navigate(["members"]);
  }

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    if (this.httpService.editMemberMode) {
      this.httpService.updateMember(this.memberModel, this.httpService.currentId);
      // this.httpService.member = undefined;
    }
    else {
      console.log('submitted ', this.memberModel);
      this.httpService.addMember(this.memberModel);
    }
  }
}
