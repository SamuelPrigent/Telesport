import { Component, OnInit } from "@angular/core";
// Data (from service)
import { Observable, of, Subscription } from "rxjs"; // observable
import { OlympicService } from "src/app/core/services/olympic.service"; // to get data
// models
import { Participation } from "src/app/core/models/Participation";
import { Country } from "src/app/core/models/Country";
import { Data } from "src/app/core/models/Utillity";
import { FormattedDataPie } from "src/app/core/models/Utillity";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
})
export class Home implements OnInit {
  constructor(private olympicService: OlympicService) {}
  // Types
  olympicsData: FormattedDataPie[] = [];
  olympics$: Observable<Country[]> = of([]);
  olympicSub: Subscription | null = null;
  countryNumber: number = 0;
  gamesNumber: number = 0;

  // -------------------------------------------------
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    // Souscrire et formater les données
    this.olympicSub = this.olympics$.subscribe((data) => {
      if (data) {
        this.olympicsData = this.formatData(data);
        this.countryNumber = data.length;
        if (data[0].participations) {
          this.gamesNumber = data[0].participations.length;
        }
      }
    });
  }

  // Functions
  formatData(data: Country[]): FormattedDataPie[] {
    let formatedData: FormattedDataPie[] = [];
    console.log(data);
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
      formatedData = formatedData.sort((a: Data, b: Data) => a.value - b.value);
      return formatedData;
    } else {
      return formatedData;
    }
  }

  // -------------------------------------------------
  ngOnDestroy(): void {
    // unsubscribe
    if (this.olympicSub) {
      this.olympicSub.unsubscribe();
    }
  }
}
