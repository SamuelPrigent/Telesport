import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { scheduled, asyncScheduler } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Country } from "../models/Country"; // models
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler"; // error handler

@Injectable({
  providedIn: "root",
})
export class OlympicService {
  constructor(
    private http: HttpClient,
    private errorHandler: GlobalErrorHandler
  ) {}
  private olympicUrl = "./assets/mock/olympic.json";
  private olympics$ = new BehaviorSubject<Country[] | undefined>(undefined); // observable

  /**
   * Charge les données initiales des Jeux olympiques.
   * @returns Observable de données des pays ou tableau vide en cas d'erreur.
   */
  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        this.olympics$.next([]); // L'observable renvoie un tableau vide
        this.errorHandler.handleError(error); // Error handler
        return scheduled([], asyncScheduler); // fallback pour le flux
      })
    );
  }

  /**
   * Retourne les données des Jeux olympiques.
   * @returns Observable de données des pays ou tableau vide en cas d'erreur.
   */
  getOlympics() {
    return this.olympics$.asObservable();
  }
}
