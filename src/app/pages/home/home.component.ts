import { Component, OnInit } from "@angular/core";
// Data
import { Observable, of, Subscription } from "rxjs";
import { OlympicService } from "src/app/core/services/olympic.service";
// models
import { Country } from "src/app/core/models/Country";
import { Participation } from "src/app/core/models/Participation";
import { FormattedDataPie } from "src/app/core/models/FormattedData";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class Home implements OnInit {
  constructor(private olympicService: OlympicService) {}
  // Types
  olympicsData: FormattedDataPie[] = [];
  olympics$: Observable<Country[] | undefined> = of([]);
  olympicSub: Subscription | null = null;
  countryNumber: number = 0;
  gamesNumber: number = 0;

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics(); // récupère l'observable service
    // Abonnement à l'observable
    this.olympicSub = this.olympics$.subscribe((data) => {
      if (data && data[0]?.participations) {
        this.olympicsData = this.formatData(data);
        this.countryNumber = data.length;
        this.gamesNumber = data[0].participations.length;
      }
    });
  }

  // Functions
  formatData(data: Country[]): FormattedDataPie[] {
    let formatedData: FormattedDataPie[] = [];
    if (data) {
      data.forEach((country: Country) => {
        let medalsCountTotal = 0;
        if (country.participations) {
          country.participations.forEach((element: Participation) => {
            medalsCountTotal = medalsCountTotal + element.medalsCount;
          });
          formatedData.push({
            name: country.country,
            value: medalsCountTotal,
          });
        }
      });
      formatedData = formatedData.sort(
        (a: FormattedDataPie, b: FormattedDataPie) => a.value - b.value
      );
      return formatedData;
    } else {
      return formatedData;
    }
  }

  ngOnDestroy(): void {
    if (this.olympicSub) {
      this.olympicSub.unsubscribe();
    }
  }
}
