import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

// fournit le service dans l'app -- permet l'ajout dans un constructor
@Injectable({
  providedIn: "root",
})
export class OlympicService {
  private olympicUrl = "./assets/mock/olympic.json";
  // Behavior : observable spécial stoquant la dernière valeur
  // permet d'éviter autre composant de moficier cette valeur ?
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

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
