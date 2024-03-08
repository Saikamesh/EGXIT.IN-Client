import { Injectable } from '@angular/core';
import { Reasons } from '../models/reasons';
import { Experience } from '../models/experience';
import { Thoughts } from '../models/thoughts';
@Injectable({
  providedIn: 'root',
})
export class DataBridgeService {
  constructor() {}

  private readonly backendUrl: string = 'http://127.0.0.1:8000/';

  url = this.backendUrl + 'survey/';

  async submitMainResponseForm(data: Reasons): Promise<Response> {
    let urlPath: string = this.url + 'mainreasons';
    let response = await fetch(urlPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return (await response.json()) ?? {};
  }

  async submitOverallWorkResponseForm(data: Experience): Promise<Response> {
    let urlPath: string = this.url + 'workexperiencemetrics';
    let response = await fetch(urlPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return (await response.json()) ?? {};
  }

  async submitAdditionalResponseForm(data: Thoughts): Promise<Response> {
    let urlPath: string = this.url + 'additionalresponse';
    let response = await fetch(urlPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return (await response.json()) ?? {};
  }
}
