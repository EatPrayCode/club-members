import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IClubMember } from 'src/app/shared/models/club-member.model';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { ZipcodeService } from '../../services/zipcode.service';
import { ViewEncapsulation } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  encapsulation: ViewEncapsulation.None;
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

  zipcodeResult: string = "";
  cityName: string = "";
  stateAbbr: string = "";

  constructor(
    private httpService: HttpService,
    private router: Router,
    public zipcodeService: ZipcodeService,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    console.log('running init');
    const zipcode = '27315'
    // this.lookupZipcode(zipcode);
    // this.zipcodeService.getCityState('27315').subscribe(addressResponse => {
    //   let cityName = addressResponse[0].city_states[0].city;
    //   let stateAbbreviation = addressResponse[0].city_states[0].state_abbreviation;
    //   console.log('response', addressResponse);
    //   console.log(cityName + ', ' + stateAbbreviation);

    // })
  }

  cancel() {
    console.log('calling cancel');
    // this.dialogService.closeMemberDetailDialog()
  }

  cancelEdit() {
    // this.httpService.member = undefined;
    console.log('calling cancelEdit');
    this.router.navigate(['/members']);
  }

  lookupZipcode(zipcode: string) {
    console.log('zip code in detail is', zipcode);
    zipcode = '21715';
    this.zipcodeService.getCityState(zipcode).subscribe(data => {
      this.cityName = data.city;
      this.stateAbbr = data.state;
      this.zipcodeResult = data.zip_code;
      console.log('zip result is', this.cityName + ", " + this.stateAbbr + " " + this.zipcodeResult);
    })
  }

  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    console.log('memberModel is', this.memberModel);
    // if (this.httpService.editMemberMode) {
    //   this.httpService.updateMember(this.memberModel, this.httpService.currentId);
    //   // this.httpService.member = undefined;
    // }
    // else {
      console.log('submitted ', this.memberModel);
      this.httpService.addMember(this.memberModel);
      this.dialogService.closeMemberDetailDialog();
    // }
  }
}
