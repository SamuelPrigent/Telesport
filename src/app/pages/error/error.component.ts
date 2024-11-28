import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"],
})
export class Error implements OnInit {
  constructor(private route: ActivatedRoute) {}
  errorCode: number | null = null;

  ngOnInit(): void {
    this.errorCode = this.route.snapshot.queryParams["status"];
  }
}
