import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { HttpErrorResponse, HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class ZipcodeService {

  // mockData = [{
  //   "input_index": 0,
  //   "city_states": [{
  //     "city": "Providence",
  //     "state_abbreviation": "NC",
  //     "state": "North Carolina",
  //     "mailable_city": true
  //   }],
  //   "zipcodes": [{
  //     "zipcode": "27315",
  //     "zipcode_type": "S",
  //     "default_city": "Providence",
  //     "county_fips": "37033",
  //     "county_name": "Caswell",
  //     "state_abbreviation": "NC",
  //     "state": "North Carolina",
  //     "latitude": 36.51034,
  //     "longitude": -79.39197,
  //     "precision": "Zip5"
  //   }]
  // }];

  zipcodeInput: string = '27315';
  addressResponse: any;
  cityResponse: string = '';
  stateResponse: string = '';

  cityName: string = '';
  stateAbbreviation: string = '';

  // zipRestApi =

  constructor(
    private httpClient: HttpClient
  ) { }

  getCityState(zipCode: string) {
    const url: string = 'https://us-zipcode.api.smartystreets.com/lookup';

    // const authId: string = '47ab0b94-03c7-8ae5-415f-39deff6564dd';
    // const authToken: string = '1H7uK4MAlSOuLQib7WwT';
    const siteKey: string = '7244818133150296'

    // const headerKey1 = "Content-Type";
    // const headerValue1 = "application/json; charset=utf-8";
    // const headerKey2 = "Host";
    // const headerValue2 = "us-zipcode.api.smartystreets.com";

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json; charset=utf-8',
    //   'Host': 'us-zipcode.api.smartystreets.com:443'
    // })

    let params = new HttpParams()
      .set('zipcode', zipCode)
      .append('key', siteKey);

      // .set('auth-id', authId)
      // .append('auth-token', authToken)
      // .append('zipcode', zipCode)

    // const options = {params, headers}

    // console.log('headers', headers);
    console.log('paramaters', params);

    return this.httpClient
      .get(`${url}`, {params: params});
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("Error occurred: ", error.error.message);
    } else {
      console.error(
        `Server error ${error.status} ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
