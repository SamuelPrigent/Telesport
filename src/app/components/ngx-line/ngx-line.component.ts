import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FormattedDataLine } from "src/app/core/models/FormattedData";
import { Subscription } from "rxjs";
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

  // Subscription to manage queryParams
  private queryParamsSub: Subscription | null = null;

  ngOnInit(): void {
    // === Maintain (yAxisMax + yAxisTicks) with params ===
    // get or calculate yAxisMax
    this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      if (params["yAxisMax"]) {
        this.yAxisMax = parseFloat(params["yAxisMax"]);
      } else if (this.data.length > 0) {
        const maxValue = Math.max(
          ...this.data[0].series.map(
            (e: { name: string; value: number }) => e.value
          )
        );
        this.yAxisMax = maxValue * 1.5;
        // Add to params
        this.router.navigate([], {
          queryParams: { yAxisMax: this.yAxisMax },
          queryParamsHandling: "merge",
        });
      }
      // generate yAxisTicks
      this.yAxisTicks = this.generateYAxisTicks(this.yAxisMax, 20);
    });
  }
  // custom y ticks
  generateYAxisTicks(maxValue: number, interval: number): number[] {
    const ticks = [];
    for (let i = 0; i <= maxValue; i += interval) {
      ticks.push(i);
    }
    return ticks;
  }

  // Unsubscribe to prevent memory leaks
  ngOnDestroy(): void {
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
  }
}

// === Versions without maintaining ticks ===
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
