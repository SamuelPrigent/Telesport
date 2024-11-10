import { Component, Input } from "@angular/core";

// === Component
@Component({
  selector: "Ngx",
  templateUrl: "./ngx.component.html",
  styleUrl: "./ngx.component.scss",
})

// === Class variables
export class Ngx {
  @Input() data: any[any] = []; // Add data props
  // custom props
  view: [number, number] = [700, 400];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = "below";
  barChartcustomColors = [
    { name: "Italy", value: "#18bc30" },
    { name: "Spain", value: "#d22a2a" },
    { name: "United States", value: "#08329c" },
    { name: "Germany", value: "#121212" },
    { name: "France", value: "#0c51e6" },
  ];

  // === Ngx method
  onSelect(data: any): void {
    console.log("Data :", JSON.parse(JSON.stringify(data)));
    // => navigate to details page with data
  }
  onActivate(data: any): void {
    // console.log("Activate", JSON.parse(JSON.stringify(data)));
  }
  onDeactivate(data: any): void {
    // console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }
}
