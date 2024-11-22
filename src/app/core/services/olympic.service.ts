import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
// models
import { Country } from "../models/Country";

@Injectable({
  providedIn: "root",
})
export class OlympicService {
  private olympicUrl = "./assets/mock/olympic.json";
  private olympics$ = new BehaviorSubject<any>(undefined); // type d'observable
  // private olympics$ = new BehaviorSubject<Country[]>([]); // type d'observable

  constructor(private http: HttpClient) {}

  // TEST
  // loadInitialData() {
  //   return this.http.get<Country[]>(this.olympicUrl).pipe(
  //     tap((value) => this.olympics$.next(value)),
  //     catchError((error, caught) => {
  //       // TODO: improve error handling
  //       console.error(error);
  //       // can be useful to end loading state and let the user know something went wrong
  //       this.olympics$.next([
  //         {
  //           id: 1,
  //           country: "Unknow country",
  //           participations: [
  //             {
  //               athleteCount: 0,
  //               city: "Unknow city",
  //               id: 0,
  //               medalsCount: 0,
  //               year: 0,
  //             },
  //           ],
  //         },
  //       ]);
  //       return caught;
  //     })
  //   );
  // }

  // OLD;

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
