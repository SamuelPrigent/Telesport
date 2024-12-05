import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
// data
import { Observable, Subscription, of } from "rxjs";
import { OlympicService } from "src/app/core/services/olympic.service";
// models
import { Participation } from "src/app/core/models/Participation";
import { Country } from "src/app/core/models/Country";
import { FormattedDataLine } from "src/app/core/models/FormattedData";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class Details implements OnInit, OnDestroy {
  olympics$: Observable<Country[] | undefined> = of([]);
  olympicSub: Subscription | null = null;
  detailsData: Country | null = null;
  country: string | null = null;
  detailsFormatedData: {
    name: string;
    series: { name: string; value: number }[];
  }[] = [];
  participationsNumber: number = 0;
  medalsNumber: number = 0;
  athletesNumber: number = 0;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la route
    this.country = this.route.snapshot.params["country"];
    // Récupérer les données depuis le service
    this.olympics$ = this.olympicService.getOlympics();
    // Abonnement observable et gestion des erreurs
    this.olympicSub = this.olympics$.subscribe((data) => {
      if (data) {
        const foundData = data.find(
          (element) => element.country === this.country
        );
        if (foundData) {
          this.detailsData = foundData;
          this.detailsFormatedData = this.formatData(this.detailsData);
          this.participationsNumber = this.getParticipationsNumber(
            this.detailsData
          );
          this.athletesNumber = this.getAthletesNumber(this.detailsData);
          this.medalsNumber = this.getMedalsNumber(this.detailsData);
        } else {
          console.error(`Country "${this.country}" not found.`);
          this.router.navigate([""]); // Redirection si le pays n'existe pas
        }
      }
    });
  }

  /**
   * Formate les données pour un graphique de type "line".
   * @param {Country} data - Données d'un pays spécifique.
   * @returns {FormattedDataLine[]} - Données formatées pour le graphique.
   */
  formatData(data: Country): FormattedDataLine[] {
    let newArray: FormattedDataLine[] = [{ name: "Medailles", series: [] }];
    if (data && data.participations) {
      data.participations.forEach((element: Participation) => {
        let newObject = {
          name: element.year.toString(),
          value: element.medalsCount,
        };
        newArray[0].series.push(newObject);
      });
    }
    return newArray;
  }

  /**
   * Calcule le nombre total de participations aux Jeux.
   * @param {Country} data - Données d'un pays spécifique.
   * @returns {number} - Nombre total de participations.
   */
  getParticipationsNumber(data: Country): number {
    let participationsNumber = 0;
    if (data && data.participations) {
      participationsNumber = data.participations.length;
    }
    return participationsNumber;
  }

  /**
   * Calcule le nombre total d'athlètes ayant participé pour un pays.
   * @param {Country} data - Données d'un pays spécifique.
   * @returns {number} - Nombre total d'athlètes.
   */
  getAthletesNumber(data: Country): number {
    let athletesNumber = 0;
    if (data && data.participations) {
      data.participations.forEach((element) => {
        athletesNumber = athletesNumber + element.athleteCount;
      });
    }
    return athletesNumber;
  }

  /**
   * Calcule le nombre total de médailles obtenues par un pays.
   * @param {Country} data - Données d'un pays spécifique.
   * @returns {number} - Nombre total de médailles.
   */
  getMedalsNumber(data: Country): number {
    let medalsNumber = 0;
    if (data && data.participations) {
      data.participations.forEach((element) => {
        medalsNumber = medalsNumber + element.medalsCount;
      });
    }
    return medalsNumber;
  }

  /**
   * Vérifie si un abonnement existe et se désabonne de l'observable pour éviter les fuites de mémoire.
   */
  ngOnDestroy(): void {
    if (this.olympicSub) {
      this.olympicSub.unsubscribe();
    }
  }
}
