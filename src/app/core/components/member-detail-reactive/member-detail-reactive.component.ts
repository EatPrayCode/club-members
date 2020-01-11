import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IClubMember } from 'src/app/shared/models/club-member.model';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { ZipcodeService } from '../../services/zipcode.service';
import { ViewEncapsulation } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { MemberNumberService } from '../../services/member-number.service';

@Component({
  selector: 'app-member-detail-reactive',
  templateUrl: './member-detail-reactive.component.html',
  styleUrls: ['./member-detail-reactive.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberDetailReactiveComponent implements OnInit {

  memberModel: IClubMember;
  memberForm: FormGroup;
  submitted = false;
  myDate = new Date();
  @Input() memberNumber: any;
  zipcodeResult: string = "";
  cityName: string = "";
  stateAbbr: string = "";

  constructor(
    private httpService: HttpService,
    private router: Router,
    public zipcodeService: ZipcodeService,
    public dialogService: DialogService,
    public memberNumberService: MemberNumberService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log('running init');
    // const zipcode = '27315'
    this.initForm();
    this.memberNumberService.nextAvailableMemberNumber$
      .subscribe(number => {
        this.memberNumber = number;
    })

    // this.dialogService.memberNumber.subscribe(idNum => {
    //   this.memberNumber = idNum;
    //   console.log('detail subscription', this.memberNumber);
    //   console.log('detail subscription id', idNum);
    //   this.memberForm.patchValue({id: this.memberNumber});
    // })
    // this.lookupZipcode(zipcode);
    // this.zipcodeService.getCityState('27315').subscribe(addressResponse => {
    //   let cityName = addressResponse[0].city_states[0].city;
    //   let stateAbbreviation = addressResponse[0].city_states[0].state_abbreviation;
    //   console.log('response', addressResponse);
    //   console.log(cityName + ', ' + stateAbbreviation);

    // })
  }

  initForm() {
    this.memberForm = new FormGroup({
      'id': new FormControl(null),
      'memberSince': new FormControl(null),
      'favoriteActivity': new FormControl(null),
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'address': new FormGroup({
        'street': new FormControl(null),
        'city': new FormControl(null),
        'state': new FormControl(null),
        'zipcode': new FormControl(null),
        'phoneNumber': new FormControl(null)
      })
    });
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
    // zipcode = '21715';
    this.zipcodeService.getCityState(zipcode).subscribe(data => {
      this.cityName = data.city;
      this.stateAbbr = data.state;
      this.zipcodeResult = data.zip_code;
      console.log('zip result is', this.cityName + ", " + this.stateAbbr + " " + this.zipcodeResult);
    })
  }

  onSubmit() {
    // console.log('submitted ', this.memberForm.value);
    // TODO: test for errors before closing the dialog?
    this.httpService.addMember(this.memberForm.value);
    this.dialogService.closeMemberDetailDialog();
    this.httpService.refreshTable();
  }
}
