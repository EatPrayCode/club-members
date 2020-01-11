import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { IClubMember } from "../../shared/models/club-member.model";
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberNumberService } from './member-number.service';

@Injectable({
  providedIn: "root"
})
export class HttpService {
  restApi = "http://localhost:3000";
  members: IClubMember[] = [];
  member: IClubMember;
  newRows$ = new BehaviorSubject<Array<any>>([]);

  constructor(
    private http: HttpClient,
    private router: Router,
    public memberNumberService: MemberNumberService
  ) { }

  // fetch all members
  getMembers(): Observable<IClubMember[]> {
    // console.log('running getMembers in service');
    return this.http
      .get<IClubMember[]>(`${this.restApi}/members`)
      .pipe(
        tap(data => console.log('')),
        catchError(this.handleError)
      );
  }

  // get a specific member
  getMember(id: number) {
    return this.http
      .get(`${this.restApi}/members/` + id)
      .pipe(catchError(this.handleError));
  }

  // add a new member
  addMember(memberForm) {
    // console.log('starting addMember', memberForm);
    this.http.post(`${this.restApi}/members`, memberForm).subscribe(
      memberData => {
        this.memberNumberService.findNextAvailableId();
      },
      error => {
        console.error("Error on add", error);
      }
    );
  }

  getAllIds() {
    return this.http
      .get(`${this.restApi}/ids`)
      .pipe(catchError(this.handleError));
  }

  // delete a specific member
  deleteMember(row) {
    console.log('delete row is', row)
    this.http.delete(`${this.restApi}/members/` + row).subscribe(
      memberData => {
        console.log("Delete successful");
      },
      error => {
        console.error("Error on delete", error);
      }
    );
  }

  updateMember(memberForm, id) {
    this.http.put(`${this.restApi}/members/` + id, memberForm).subscribe(
      data => { this.router.navigate(["members"]) },
      error => { console.log("Error", error) }
    );
  }

  // call this to update the table after adding, editing or deleting
  // as change detection doesn't fire when the db.json is changed
  refreshTable() {
    setTimeout(() => {
      this.getMembers()
        .subscribe(members => {
          this.newRows$.next(members);
          console.log('detail-members are', members);
          this.memberNumberService.idArray = [...members];
          this.memberNumberService.findNextAvailableId();
        });
    }, 800);
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
