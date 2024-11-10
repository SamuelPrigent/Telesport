import { Component, OnInit } from "@angular/core";
// Data (from service)
import { Observable, of, Subscription } from "rxjs"; // observable
import { OlympicService } from "src/app/core/services/olympic.service"; // to get data

// Interface
interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}

interface Country {
  id: number;
  country: string;
  participations: Participation[];
}

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
})

// -------------------------------------------------
export class Home implements OnInit {
  constructor(private olympicService: OlympicService) {}
  // Types
  olympicsData: { name: string; value: number }[] = [];
  olympics$: Observable<any[any]> = of(null);
  olympicSub: Subscription | null = null;
  // Functions
  formatData(data: Country[]): { name: string; value: number }[] {
    // Mock
    // let formatedData = [
    //   { name: "Germany", value: 40632 },
    //   { name: "United States", value: 49737 },
    //   { name: "France", value: 36745 },
    //   { name: "United Kingdom", value: 36240 },
    //   { name: "Spain", value: 33000 },
    // ];
    let formatedData: any[any] = [];
    //
    if (data) {
      data.forEach((country: any) => {
        let medalsCountTotal = 0;
        if (country.participations) {
          // console.log("participation :", country.participations);
          country.participations.forEach((element: any) => {
            medalsCountTotal = medalsCountTotal + element.medalsCount;
          });
          formatedData.push({
            name: country.country,
            value: medalsCountTotal,
          });
        }
      });
      return formatedData;
    } else {
      return formatedData;
    }
  }
  // -------------------------------------------------
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    // Souscrire et formater les données
    this.olympicSub = this.olympics$.subscribe((data) => {
      if (data) {
        console.log("Raw data:", data); // check data
        this.olympicsData = this.formatData(data); // Formate data dans le subscribe
      }
    });
  }
  // -------------------------------------------------
  ngOnDestroy(): void {
    // unsubscribe
    if (this.olympicSub) {
      this.olympicSub.unsubscribe();
    }
  }
}
