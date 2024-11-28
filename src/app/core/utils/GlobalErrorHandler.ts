import { ErrorHandler, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private router: Router) {}

  handleError(error: any): void {
    // Comportement standart pour toutes les erreurs
    console.error("ErrorHandler :", error);
    const status = error?.status || 500;
    this.router.navigate(["/error"], {
      queryParams: { status: status },
    });
  }
}
