import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { IClubMember } from "../../shared/models/club-member.model";
// import { NgForm } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  restApi = "http://localhost:3000";
  members: IClubMember[] = [];
  member: IClubMember;
  editMemberMode: boolean;
  currentId: number;

  constructor(private http: HttpClient, private router: Router) { }

  // fetch all members
  getMembers() {
    return this.http
      .get(`${this.restApi}/members`)
      .pipe(catchError(this.handleError));
  }

  // get a specific member
  getMember(id: number) {
    return this.http
      .get(`${this.restApi}/members/` + id)
      .pipe(catchError(this.handleError));
  }

  // add a new member
  addMember(memberForm) {
    this.http.post(`${this.restApi}/members`, memberForm).subscribe(
      memberData => {
        this.router.navigate(["members"]);
      },
      error => {
        console.error("Error on add", error);
      }
    );
  }

  // delete a specific member
  deleteMember(id: number) {
    this.http.delete(`${this.restApi}/members/` + id).subscribe(
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
