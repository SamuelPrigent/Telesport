import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  HostListener,
} from "@angular/core";
import { FormattedDataLine } from "src/app/core/models/FormattedData";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router"; // to main ticks

@Component({
  selector: "NgxLine",
  templateUrl: "./ngx-line.component.html",
  styleUrls: ["./ngx-line.component.scss"], // Correction du `styleUrls` (pluriel)
})
export class NgxLine implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private router: Router) {}

  // Props from parent
  @Input() data: FormattedDataLine[] = [];
  @Input() country: string | null = "";
  @Input() participationsNumber: number = 0;
  @Input() medalsNumber: number = 0;
  @Input() athletesNumber: number = 0;

  // Component props
  view: [number, number] = [700, 300];
  xAxisLabel: string = "Dates";
  yAxisMax: number = 0; // Max Y value for the graph
  yAxisTicks: number[] = []; // Custom ticks for Y axis

  // Subscription to manage queryParams
  private queryParamsSub: Subscription | null = null;

  ngOnInit(): void {
    // Update view for responsiveness
    this.updateView();

    // Maintain (yAxisMax + yAxisTicks) with params
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
      // Generate yAxisTicks
      this.yAxisTicks = this.generateYAxisTicks(this.yAxisMax, 20);
    });
  }

  // Update view size dynamically
  @HostListener("window:resize", [])
  onResize(): void {
    this.updateView();
  }

  private updateView(): void {
    const width = window.innerWidth;
    if (width < 768) {
      this.view = [width - 50, 250]; // Mobile
    } else if (width < 1024) {
      this.view = [600, 300]; // Tablet
    } else {
      this.view = [700, 300]; // Desktop
    }
  }

  // Generate Y-axis ticks
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
