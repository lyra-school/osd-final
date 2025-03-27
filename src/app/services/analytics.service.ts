import { Injectable } from '@angular/core';

declare var gtag: Function;
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  trackEvent(eventName: string, eventDetails: string, eventCategory: string) {
    gtag('event', eventName, {
      'event_category': eventCategory,
      'event_label': eventName,
      'value': eventDetails
    })
  }
}
