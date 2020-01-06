import {
  Injectable
} from '@angular/core';
import {
  catchError
} from "rxjs/operators";
import {
  HttpErrorResponse,
  HttpClient
} from "@angular/common/http";


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
  url = 'https://us-zipcode.api.smartystreets.com/lookup?';
  authId = 'auth-id=47ab0b94-03c7-8ae5-415f-39deff6564dd&';
  authToken = 'auth-token=1H7uK4MAlSOuLQib7WwT&zipcode=';

  constructor(
    private http: HttpClient
  ) {}

  // requestHeaders = {
  //   'Content-Type': 'application/json; charset=utf-8',
  //   'Host': 'us-zipcode.api.smartystreets.com'
  // }

  // requestOptions = {
  //   headers: new Headers(this.requestHeaders)
  // }

  getCityState() {
    // this.zipcodeInput = zipcode;
    return this.http
      .get(`${this.url}` + this.authId + this.authToken + this.zipcodeInput)
      .pipe(catchError(this.handleError));

    console.log(this.url + this.authId + this.authToken + this.zipcodeInput);

    // console.log(this.mockData[0].city_states[0].state_abbreviation);
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
