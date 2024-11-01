import { Component, Input } from "@angular/core";
// import { Observable, of } from "rxjs"; // observable
// import { OlympicService } from "src/app/core/services/olympic.service"; // to get data

// === Component
@Component({
  selector: "Ngx",
  templateUrl: "./ngx.component.html",
})

// === Class variables
export class Ngx {
  @Input() data: any[] = []; // props data from home
  // library custom props
  view: [number, number] = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = "below";
  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  // custom colors
  barChartcustomColors = [
    { name: "Germany", value: "#000000" },
    { name: "France", value: "#0c51e6" },
    { name: "United States", value: "#00247D" },
    { name: "United Kingdom", value: "#B22234" },
    { name: "Spain", value: "#f6af08" },
  ];

  //
  // olympics$: Observable<any> = of(null); // -- data observable
  //
  // constructor(private olympicService: OlympicService) {}

  // ngOnInit(): void {
  // // use the service i put in via constructor
  // this.olympics$ = this.olympicService.getOlympics();
  // // abonnement à l'observable
  // this.olympics$.subscribe((data) => {
  //   console.log("Data :", data);
  // });
  // }
  // === Ngx method -- (data from the props)
  onSelect(data: any): void {
    console.log("Mock data :", JSON.parse(JSON.stringify(data)));
    // redirect on details page ?
  }
  onActivate(data: any): void {
    // console.log("Activate", JSON.parse(JSON.stringify(data)));
  }
  onDeactivate(data: any): void {
    // console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }
}
