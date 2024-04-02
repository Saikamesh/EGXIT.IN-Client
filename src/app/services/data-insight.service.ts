import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataInsightService {
  constructor() {}

  private readonly backendUrl: string = 'http://127.0.0.1:8000/';

  url = this.backendUrl + 'survey/';

  async get_top_influences(): Promise<Response> {
    let urlPath: string = this.url + 'topinfluences';
    let response = await fetch(urlPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) ?? {};
  }

  async get_agreed_workmetrics(): Promise<Response> {
    let urlPath: string = this.url + 'agreedworkmetrics';
    let response = await fetch(urlPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) ?? {};
  }

  async get_disagreed_workmetrics(): Promise<Response> {
    let urlPath: string = this.url + 'disagreedworkmetrics';
    let response = await fetch(urlPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) ?? {};
  }

  async get_metrics_count(): Promise<Record<string, Record<string, number>>> {
    let urlPath: string = this.url + 'metrics';
    let response = await fetch(urlPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json() as Record<string, Record<string, number>>) ?? {};
  }
}
