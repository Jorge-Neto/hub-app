import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatNumberService {

  constructor() { }

  format(value: string): number {
    if (!value) return 0;

    console.log("value")
    console.log(typeof value)

    return Number(value?.replace(/\./g, '').replace(',', '.') || '0');
  }
}
