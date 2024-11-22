export interface Data {
  value: number;
  name: string;
}

export interface FormattedDataLine {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
}

export interface FormattedDataPie {
  name: string;
  value: number;
}
