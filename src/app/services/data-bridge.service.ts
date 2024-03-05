import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataBridgeService {

  constructor() { }

  readonly backendUrl: string = "http://127.0.0.1:8000/"

  url = this.backendUrl +'survey/';

  async testbackend(){
    let data = fetch(this.url);
    return data
  }







  
  // async getAllHousingLocations(): Promise<Housinglocation[]> {
  //   const data = await fetch(this.url);
  //   return (await data.json()) ?? [];
  // }
  // async getHousingLocationById(
  //   id: number
  // ): Promise<Housinglocation | undefined> {
  //   const data = await fetch(`${this.url}/${id}`);
  //   return (await data.json()) ?? {};
  // }

  // submitApplication(firstName: String, lastName: string, email: string) {
  //   console.log(
  //     `Homes application received: firstname: ${firstName}, lastname:${lastName}, email:${email}.`
  //   );
  // }
  

}
