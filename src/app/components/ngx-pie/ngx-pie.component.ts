import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

// === Component
@Component({
  selector: "NgxPie",
  templateUrl: "./ngx-pie.component.html",
  styleUrl: "./ngx-pie.component.scss",
})

// === Class variables
export class NgxPie {
  constructor(private router: Router) {}
  @Input() data: any[any] = []; // data props
  @Input() gamesNumber: number = 0; // number of JOs
  @Input() countryNumber: number = 0; // number of country
  // custom props
  view: [number, number] = [700, 400];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = "below";
  barChartcustomColors = [
    { name: "Italy", value: "#16ad2d" },
    { name: "Spain", value: "#FFCC00" },
    { name: "United States", value: "#102b82" },
    { name: "Germany", value: "#121212" },
    { name: "France", value: "#0c51e6" },
  ];

  // === Ngx method
  onSelect(data: any): void {
    // console.log(data.name);
    this.router.navigate(["/details/", data.name]);
  }
}
