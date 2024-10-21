import { Component } from "@angular/core";

@Component({
  selector: "Ngx",
  templateUrl: "./ngx.component.html",
})
// Chart variables
export class Ngx {
  single: any[] = [
    { name: "Germany", value: 40632 },
    { name: "United States", value: 49737 },
    { name: "France", value: 36745 },
    { name: "United Kingdom", value: 36240 },
    { name: "Spain", value: 33000 },
  ];
  view: [number, number] = [700, 400];
  //
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = "below";
  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  // constructor(
  //   // private olympicService: OlympicService
  // ) {}
  ngOnInit(): void {
    // this.olympics$ = this.olympicService.getOlympics();
  }
  onSelect(data: any): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }
  onActivate(data: any): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }
  onDeactivate(data: any): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }
}
