import { Component, Input, OnInit } from "@angular/core";
import { FormattedDataLine } from "src/app/core/models/Utillity";
import { ActivatedRoute, Router } from "@angular/router"; // to main ticks

@Component({
  selector: "NgxLine",
  templateUrl: "./ngx-line.component.html",
  styleUrl: "./ngx-line.component.scss",
})
export class NgxLine implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  // props from parent
  @Input() data: FormattedDataLine[] = [];
  @Input() country: string | null = "";
  @Input() participationsNumber: number = 0;
  @Input() medalsNumber: number = 0;
  @Input() athletesNumber: number = 0;

  // component props
  view: [number, number] = [700, 300];
  xAxisLabel: string = "Dates";
  yAxisMax: number = 0; // Max Y value for the graph
  yAxisTicks: number[] = []; // Custom ticks for Y axis

  // custom y ticks
  generateYAxisTicks(maxValue: number, interval: number): number[] {
    const ticks = [];
    for (let i = 0; i <= maxValue; i += interval) {
      ticks.push(i);
    }
    return ticks;
  }

  // Versions without maintain ticks
  // ngOnInit(): void {
  //   // custom yAxisMax
  //   if (this.data.length > 0) {
  //     const maxValue = Math.max(
  //       ...this.data.flatMap((series: an*y) =>
  //         series.series.map((e: an*y) => e.value)
  //       )
  //     );
  //     this.yAxisMax = maxValue * 1.4;
  //   }
  //   // custom Ticks
  //   this.yAxisTicks = this.generateYAxisTicks(this.yAxisMax, 20);
  // }
  //
  // Maintain ticks with params
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["yAxisMax"]) {
        this.yAxisMax = parseFloat(params["yAxisMax"]);
      } else if (this.data.length > 0) {
        const maxValue = Math.max(
          ...this.data[0].series.map((e: any) => e.value)
        );
        this.yAxisMax = maxValue * 1.5;
        // Ajoute le paramètre à l'URL
        this.router.navigate([], {
          queryParams: { yAxisMax: this.yAxisMax },
          queryParamsHandling: "merge",
        });
      }
    });
    this.yAxisTicks = this.generateYAxisTicks(this.yAxisMax, 20);
  }
}
