// import { Component, OnInit } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// // Data (from service)
// import { Observable, of, Subscription } from "rxjs"; // observable
// import { OlympicService } from "src/app/core/services/olympic.service"; // to get data

// // Interface
// interface Participation {
//   id: number;
//   year: number;
//   city: string;
//   medalsCount: number;
//   athleteCount: number;
// }

// interface Country {
//   id: number;
//   country: string;
//   participations: Participation[];
// }

// @Component({
//   selector: "app-details",
//   templateUrl: "./details.component.html",
//   styleUrl: "./details.component.scss",
// })

// // -------------------------------------------------
// export class Details implements OnInit {
//   constructor(
//     private olympicService: OlympicService,
//     private route: ActivatedRoute
//   ) {}
//   // Types
//   olympics$: Observable<any[any]> = of([]); // ?? : off(null) // ?? : Observable<Country[]>
//   olympicSub: Subscription | null = null;
//   detailsData: Country = { id: 0, country: "country", participations: [] }; // peut créer des erreur
//   // detailsData: Country | null = null;
//   // Types : props for ngx line
//   country: string | null = null;
//   detailsFormatedData: {
//     name: string;
//     series: { name: string; value: number }[];
//   }[] = [
//     {
//       name: "",
//       series: [],
//     },
//   ];
//   participationsNumber: number = 0;
//   medalsNumber: number = 0;
//   athletesNumber: number = 0;

//   // Functions
//   formatData(data: Country): any {
//     // ??
//     // let newArray: { name: string; series: { name: string; value: number }[] }[] = [
//     //   { name: "Medailles", series: [] },
//     // ];
//     let newArray: any[any] = [{ name: "Medailles", series: [] }];

//     if (data && data.participations) {
//       data.participations.forEach((element: Participation) => {
//         let newObject = { name: element.year, value: element.medalsCount };
//         newArray[0].series.push(newObject);
//       });
//       console.log("Formated data :", newArray[0]);
//     }
//     return newArray;
//   }

//   // -------------------------------------------------
//   ngOnInit(): void {
//     // route id
//     this.country = this.route.snapshot.params["country"];
//     // console.log(this.country);
//     // data
//     this.olympics$ = this.olympicService.getOlympics(); // get all data
//     this.olympicSub = this.olympics$.subscribe((data) => {
//       if (data) {
//         const foundData = data.find(
//           (element: Country) => element.country === this.country
//         );
//         if (foundData) {
//           this.detailsData = foundData;
//           this.detailsFormatedData = this.formatData(this.detailsData);
//         } else {
//           console.error(`Country ${this.country} not found in data.`);
//         }
//         // this.detailsData = data.find(
//         //   (element: any) => element.country == this.country
//         // );
//         // this.detailsFormatedData = this.formatData(this.detailsData); // attribue les data formaté
//       }
//     });
//     // mock data
//     // this.detailsFormatedData = {
//     //   name: "Medailles",
//     //   series: [
//     //     {
//     //       name: "2012",
//     //       value: 20,
//     //     },
//     //     {
//     //       name: "2016",
//     //       value: 15,
//     //     },
//     //     {
//     //       name: "2020",
//     //       value: 17,
//     //     },
//     //   ],
//     // };
//   }
//   // -------------------------------------------------
//   ngOnDestroy(): void {
//     // unsubscribe
//     if (this.olympicSub) {
//       this.olympicSub.unsubscribe();
//     }
//   }
// }

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription, of } from "rxjs";
import { OlympicService } from "src/app/core/services/olympic.service";

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
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class Details implements OnInit, OnDestroy {
  olympics$: Observable<Country[]> = of([]);
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
    private route: ActivatedRoute
  ) {}

  // functions
  formatData(
    data: Country
  ): { name: string; series: { name: string; value: number }[] }[] {
    let newArray: {
      name: string;
      series: { name: string; value: number }[];
    }[] = [{ name: "Medailles", series: [] }];
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

  getParticipationsNumber(data: Country): number {
    let participationsNumber = 0;
    if (data && data.participations) {
      participationsNumber = data.participations.length;
    }
    return participationsNumber;
  }

  getAthletesNumber(data: Country): number {
    let athletesNumber = 0;
    if (data && data.participations) {
      data.participations.forEach((element) => {
        athletesNumber = athletesNumber + element.athleteCount;
      });
    }
    return athletesNumber;
  }

  getMedalsNumber(data: Country): number {
    let medalsNumber = 0;
    if (data && data.participations) {
      data.participations.forEach((element) => {
        medalsNumber = medalsNumber + element.medalsCount;
      });
    }
    return medalsNumber;
  }

  ngOnInit(): void {
    // Récupérer l'ID de la route
    this.country = this.route.snapshot.params["country"];
    // Récupérer les données depuis le service
    this.olympics$ = this.olympicService.getOlympics();
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
          console.error(`Country ${this.country} not found in data.`);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.olympicSub) {
      this.olympicSub.unsubscribe();
    }
  }
}
