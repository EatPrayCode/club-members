import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IClubMember } from '../../../../shared/models/club-member.model'

import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { ZipcodeService } from '../../../services/zipcode.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-member-detail-dialog',
  templateUrl: './member-detail-dialog.component.html',
  styleUrls: ['./member-detail-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberDetailDialogComponent implements OnInit {

  memberModel: IClubMember;
  memberForm: FormGroup;
  submitted = false;
  @Input() memberSince: string;
  @Input() memberNumber: any;
  zipcodeResult: string = "";
  cityName: string = "";
  stateAbbr: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MemberDetailDialogComponent>,
    private httpService: HttpService,
    private router: Router,
    public zipcodeService: ZipcodeService,
    // public memberNumberService: MemberNumberService,
    private fb: FormBuilder) { }

  ngOnInit() {
    console.log('data is', this.data);
    this.initForm();

    this.memberSince = new Date().toLocaleDateString();
    console.log('date is', this.memberSince);
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
    console.log('submitted ', this.memberForm.value);
    this.memberForm.patchValue({ memberSince: new Date().toLocaleDateString() });
    // console.log('patched ', this.memberForm.value);
    // TODO: test for errors before closing the dialog?
    this.httpService.addMember(this.memberForm.value);
    this.httpService.refreshTable();
  }

  close() {
    this.dialogRef.close();
  }


}
