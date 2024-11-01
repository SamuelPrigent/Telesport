import { Component, OnInit } from "@angular/core";
// Data (from service)
import { Observable, of } from "rxjs"; // observable
import { OlympicService } from "src/app/core/services/olympic.service"; // to get data

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
})
export class Home implements OnInit {
  olympicsData: any[] = []; // -- For data
  // --- Data (from service)
  olympics$: Observable<any[any]> = of(null);
  constructor(private olympicService: OlympicService) {}
  ngOnInit(): void {
    // --- Set mock data in (for the moment)
    this.olympicsData = [
      { name: "Germany", value: 40632 },
      { name: "United States", value: 49737 },
      { name: "France", value: 36745 },
      { name: "United Kingdom", value: 36240 },
      { name: "Spain", value: 33000 },
    ];
    // --- Real data
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data) => {
      console.log("Data from service :", data);
    });
  }
}
