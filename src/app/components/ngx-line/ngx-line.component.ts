import { Component, Input, OnInit } from "@angular/core";

// === Component
@Component({
  selector: "NgxLine",
  templateUrl: "./ngx-line.component.html",
  styleUrl: "./ngx-line.component.scss",
})

// === Class variables
export class NgxLine implements OnInit {
  // props from details
  @Input() data: any[any] = [];
  @Input() country: string | null = "";
  @Input() participationsNumber: number = 0;
  @Input() medalsNumber: number = 0;
  @Input() athletesNumber: number = 0;

  //
  customColors: any;

  // custom props
  view: [number, number] = [700, 300];
  xAxisLabel: string = "Dates";
  yAxisMax: number = 0; // Max Y value for the graph
  yAxisTicks: number[] = []; // Custom ticks for Y axis

  // functions -- Custom ticks
  generateYAxisTicks(maxValue: number, interval: number): number[] {
    const ticks = [];
    for (let i = 0; i <= maxValue; i += interval) {
      ticks.push(i);
    }
    return ticks;
  }

  // Fonction pour définir les couleurs dynamiques
  setCustomColors(): void {
    const countryColors: { [key: string]: string } = {
      France: "#0c51e6",
      Germany: "#121212",
      "United States": "#102b82",
      Spain: "#FFCC00",
      Italy: "#16ad2d",
    };
    const color = countryColors[this.country || ""] || "#AAAAAA"; // Couleur par défaut
    this.customColors = this.data.map((item: any) => ({
      name: item.name,
      value: color,
    }));
  }

  // on init
  ngOnInit(): void {
    // Custom yAxisMax
    if (this.data.length === 1) {
      const maxValue = Math.max(
        ...this.data[0].series.map((e: any) => e.value)
      );
      this.yAxisMax = maxValue * 1.5;
    }
    // Custom Ticks
    this.yAxisTicks = this.generateYAxisTicks(this.yAxisMax, 20);

    // custom color
    this.setCustomColors();
  }
}
