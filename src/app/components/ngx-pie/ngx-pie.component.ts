import { Component, Input, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormattedDataPie } from "src/app/core/models/FormattedData";

@Component({
  selector: "NgxPie",
  templateUrl: "./ngx-pie.component.html",
  styleUrl: "./ngx-pie.component.scss",
})
export class NgxPie implements OnInit {
  constructor(private router: Router) {}

  // Parent props
  @Input() data: FormattedDataPie[] = [];
  @Input() gamesNumber: number = 0;
  @Input() countryNumber: number = 0;

  // Component props
  view: [number, number] = [700, 400];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  // Adapte la vue en fonction de la taille de l'écran
  ngOnInit(): void {
    this.updateView();
  }

  @HostListener("window:resize", [])
  onResize(): void {
    this.updateView();
  }

  /**
   * Met à jour la taille de la vue du graphique en fonction de la largeur de la fenêtre.
   * - Mobile petit : largeur de la fenêtre, hauteur 320px.
   * - Mobile grand : largeur de la fenêtre - 30px, hauteur 350px.
   * - Tablette : 600px par 400px.
   * - Desktop : 700px par 400px.
   */
  private updateView(): void {
    const width = window.innerWidth;
    if (width < 500) {
      this.view = [width, 320]; // Mobile small
    } else if (width < 700) {
      this.view = [width - 30, 350]; // Mobile large
    } else if (width < 1024) {
      this.view = [600, 400]; // Tablette
    } else {
      this.view = [700, 400]; // Desktop
    }
  }

  // Redirection vers la page de Détails du pays sur lequel l'utilisateur clique
  onSelect(data: { name: string; value: number; label: string }): void {
    this.router.navigate(["/details/", data.name]);
  }
}
