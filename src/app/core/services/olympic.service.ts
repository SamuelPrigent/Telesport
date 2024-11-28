import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
// models
import { Country } from "../models/Country";
// TEST
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";

@Injectable({
  providedIn: "root",
})
export class OlympicService {
  constructor(
    private http: HttpClient,
    private errorHandler: GlobalErrorHandler
  ) {}
  // private
  private olympicUrl = "./assets/mock/olympic.json";
  private olympics$ = new BehaviorSubject<Country[] | undefined>(undefined); // observable
  // public
  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        this.olympics$.next([]); // L'observable renvoie un tableau vide
        this.errorHandler.handleError(error); // Error handler
        return []; // fallback pour le flux
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
