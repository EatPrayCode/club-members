import { Component, OnInit, Inject, Input, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IClubMember } from '../../../../shared/models/club-member.model'
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { ZipcodeService } from '../../../services/zipcode.service';
import { ViewEncapsulation } from '@angular/core';
import { PhonePipe } from '../../../../shared/pipes/phone-format.pipe';
import { Subscription } from 'rxjs';
import { ActivityListService } from '../../../services/activities.service'

@Component({
  selector: 'app-member-detail-dialog',
  templateUrl: './member-detail-dialog.component.html',
  styleUrls: ['./member-detail-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberDetailDialogComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  memberModel: IClubMember;
  memberForm: FormGroup;
  submitted = false;
  isEditMode: boolean = false;
  memberSince: string;
  memberNumber: any;
  zipcodeResult: string = "";
  cityName: string = "";
  stateAbbr: string = "";
  activities: any;
  actionType: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MemberDetailDialogComponent>,
    private httpService: HttpService,
    public zipcodeService: ZipcodeService,
    private phoneFormatPipe: PhonePipe,
    private activityListService: ActivityListService
  ) { }

  ngOnInit() {
    // console.log('data is', this.data);
    this.initForm();

    if (this.data != null) {
      if (this.data.editMode) {
        // console.log('edit mode is true');
        this.isEditMode = true;
        this.memberNumber = this.data.id;
        this.memberSince = this.data.memberSince;
        this.actionType = "Edit";
        this.loadEditValues(this.data);
      }
    }
    else { // adding a new record
      this.isEditMode = false;
      this.memberNumber = 'Pending';
      this.actionType = "Add New"
      this.memberSince = new Date().toLocaleDateString();
      // console.log('date is', this.memberSince);
    }
    this.activities = this.activityListService.getActivities();
    console.log(this.activities);
  }

  initForm() {
    this.memberForm = new FormGroup({
      'id': new FormControl('Pending'),
      'editMode': new FormControl(null),
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

  loadEditValues(data) {
    let newValues = {
      id: data.id,
      editMode: data.editMode,
      firstName: data.firstName,
      lastName: data.lastName,
      memberSince: data.memberSince,
      favoriteActivity: data.favoriteActivity,
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        zipcode: data.address.zipcode,
        phoneNumber: this.phoneFormatPipe.transform(data.address.phoneNumber)
      }
    }
    this.memberForm.setValue(newValues);
  }

  lookupZipcode(zipcode: string) {
    console.log('zip code in detail is', zipcode);
    // zipcode = '21715';
    this.subscriptions.push(
      this.zipcodeService.getCityState(zipcode).subscribe(data => {
        this.cityName = data.city;
        this.stateAbbr = data.state;
        this.zipcodeResult = data.zip_code;
        console.log('zip result is', this.cityName + ", " + this.stateAbbr + " " + this.zipcodeResult);
      })
    )
  }

  onSubmit() {
    // this.memberForm.patchValue({ memberSince: new Date().toLocaleDateString() });
    // TODO: test for errors before closing the dialog?
    if (this.isEditMode) {
      this.httpService.updateMember(this.memberForm.value, this.memberForm.value.id);
    }
    else { //adding a new record
      this.memberForm.patchValue({ memberSince: new Date().toLocaleDateString() });
      this.memberForm.patchValue({ id: null });
      this.httpService.addMember(this.memberForm.value);
    }
    this.httpService.refreshTable();
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
