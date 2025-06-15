import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that transforms a currency code string into its corresponding currency symbol.
 * 
 * Supported codes:
 * - "gbp" → "£"
 * - "eur" → "€"
 * - Any other value defaults to "$"
 */
@Pipe({
  name: 'currencypipe',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {

  /**
   * Transforms a currency code string into the corresponding symbol.
   * 
   * @param value Currency code string (e.g., "gbp", "eur").
   * @returns The currency symbol as a string.
   */
  transform(value: string): string {
    if (value === "gbp") {
      return "£";
    } else if (value === "eur") {
      return "€";
    } else {
      return "$";
    }
  }
}