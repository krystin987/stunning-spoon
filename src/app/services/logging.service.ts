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

  // Additional method to send logs to an external server (optional)
  sendLogToServer(level: string, message: string, data?: any): void {
    // Implement an HTTP call to send log data to a server
    // e.g., this.http.post('https://logging-server.com/log', { level, message, data });
  }
}
