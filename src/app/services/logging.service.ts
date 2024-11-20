// logging.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  /**
   * Logs an informational message to the console.
   * Optionally, additional data can be logged.
   * @param {string} message - The main informational message to be logged.
   * @param {any} [data] - Optional additional data to be logged with the informational message.
   */
  info(message: string, data?: any): void {
    console.log('Info:', message);
    if (data) {
      console.log('Data:', data);
    }
  }

  /**
   * Logs a warning message to the console.
   * Optionally, additional data can be logged.
   * @param {string} message - The warning message to be logged.
   * @param {any} [data] - Optional additional data to be logged with the warning message.
   */
  warn(message: string, data?: any): void {
    console.warn('Warning:', message);
    if (data) {
      console.warn('Data:', data);
    }
  }

  /**
   * Logs an error message to the console.
   * Optionally, additional data can be logged.
   * @param {string} message - The error message to be logged.
   * @param {any} [data] - Optional additional data to be logged with the error message.
   */
  error(message: string, data?: any): void {
    console.error('Error:', message);
    if (data) {
      console.error('Data:', data);
    }
  }

}
