// ============ Steps ============
// 1 - Have to import make + import pieChart (component) in this page
// - edit section with real data

// 2 - Click on pieChart section should redirect to details chart page
// steps...

import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { OlympicService } from "src/app/core/services/olympic.service";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  // styleUrls: ["./home.component.css"],
})
//
export class Home implements OnInit {
  public olympics$: Observable<any> = of(null);
  city: string = "Paris";
  year: number = 2024;
  users: { id: number; name: string }[] = [
    { id: 0, name: "Sarah" },
    { id: 1, name: "Amy" },
    { id: 2, name: "Rachel" },
    { id: 3, name: "Jessica" },
    { id: 4, name: "Poornima" },
  ];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }
}
