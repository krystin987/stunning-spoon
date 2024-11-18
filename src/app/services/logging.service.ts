// logging.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  info(message: string, data?: any): void {
    console.log('Info:', message);
    if (data) {
      console.log('Data:', data);
    }
  }

  warn(message: string, data?: any): void {
    console.warn('Warning:', message);
    if (data) {
      console.warn('Data:', data);
    }
  }

  error(message: string, data?: any): void {
    console.error('Error:', message);
    if (data) {
      console.error('Data:', data);
    }
  }

}
