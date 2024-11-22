import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormattedDataPie } from "src/app/core/models/Utillity";

// === Component
@Component({
  selector: "NgxPie",
  templateUrl: "./ngx-pie.component.html",
  styleUrl: "./ngx-pie.component.scss",
})

// === Class variables
export class NgxPie {
  constructor(private router: Router) {}
  // parents props
  @Input() data: FormattedDataPie[] = [];
  @Input() gamesNumber: number = 0;
  @Input() countryNumber: number = 0;

  // component props
  view: [number, number] = [700, 400];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  // === Ngx method
  onSelect(data: { name: string; value: number; label: string }): void {
    this.router.navigate(["/details/", data.name]);
  }
}
