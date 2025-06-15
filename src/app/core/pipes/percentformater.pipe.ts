import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that formats a number as a percentage string with two decimal places.
 * 
 * Adds a "+" sign for positive values and appends a "%" sign.
 * Negative values are displayed with a "-" sign automatically by the number formatting.
 */
@Pipe({
  name: 'percentformater',
  standalone: true
})
export class PercentformaterPipe implements PipeTransform {
  /**
   * Transforms a numeric value into a formatted percentage string.
   * 
   * @param value The numeric value to format.
   * @returns The formatted percentage string, e.g. "+12.34%" or "-5.00%".
   */
  transform(value: number): string {
    const percent = value.toFixed(2);
    let result = "";

    if (value > 0) {
      result += "+" + percent + "%";
    } else {
      result += percent + "%";
    }
    return result;
  }
}