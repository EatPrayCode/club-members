import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { IClubMember } from "../../shared/models/club-member.model";
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private subscriptions: Subscription[] = [];
  restApi = "http://localhost:3000";
  members: IClubMember[] = [];
  member: IClubMember;
  newRows$ = new BehaviorSubject<Array<any>>([]);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  // fetch all members
  getMembers(): Observable<IClubMember[]> {
    return this.http
      .get<IClubMember[]>(`${this.restApi}/members`)
      .pipe(
        // tap(data => console.log('')),
        catchError(this.handleError)
      );
  }

  // get a specific member
  getMember(id: number) {
    return this.http
      .get<IClubMember>(`${this.restApi}/members/` + id)
      .pipe(
        // tap(data => console.log('from get', data)),
        catchError(this.handleError)
      );
  }

  // add a new member
  addMember(memberForm) {
    this.subscriptions.push(
      this.http.post(`${this.restApi}/members`, memberForm).subscribe(
        memberData => {
        },
        error => {
          console.error("Error on add", error);
        }
      ));
  }

  // delete a specific member
  deleteMember(row) {
    this.subscriptions.push(
      this.http.delete(`${this.restApi}/members/` + row).subscribe(
        memberData => {
          // console.log("Delete successful");
        },
        error => {
          console.error("Error on delete", error);
        }
      ));
  }

  updateMember(memberForm, id) {
    console.log('updating with ', memberForm);
    this.subscriptions.push(
      this.http.put(`${this.restApi}/members/` + id, memberForm).subscribe(
        data => { this.router.navigate(["members"]) },
        error => { console.log("Error", error) }
      ))
  }

  // call this to update the table after adding, editing or deleting
  // as change detection doesn't fire when the db.json is changed
  refreshTable() {
    setTimeout(() => {
      this.subscriptions.push(
        this.getMembers()
          .subscribe(members => {
            this.newRows$.next(members);
          }))
    }, 800);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("Error occurred: ", error.error.message);
    } else {
      console.error(
        `Server error ${error.status} ` + `body was:`+ `${error.error}`
      );
      console.log('Error object', error);
    }
    return [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
