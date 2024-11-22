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
  constructor(private http: HttpClient) {}
  // private
  private olympicUrl = "./assets/mock/olympic.json";
  private olympics$ = new BehaviorSubject<Country[] | undefined>(undefined); // observable
  // public default value
  getDefaultOlympicData(): Country[] {
    return [
      {
        id: 1,
        country: "Unknown Country",
        participations: [
          {
            athleteCount: 0,
            city: "Unknown City",
            id: 0,
            medalsCount: 0,
            year: 0,
          },
        ],
      },
    ];
  }

  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error("Erreur lors du chargement des données :", error);
        this.olympics$.next(this.getDefaultOlympicData()); // Return default value
        throw new Error(
          "Les données olympiques n'ont pas pu être chargées. Veuillez réessayer plus tard."
        );
      })
    );
  }
  getOlympics() {
    return this.olympics$.asObservable();
  }
}
