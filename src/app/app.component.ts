import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { OlympicService } from "./core/services/olympic.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // take(1) donc pas besoins d'unsubscribe
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
