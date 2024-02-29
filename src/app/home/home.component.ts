import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataBridgeService } from '../data-bridge.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private readonly dataBridge: DataBridgeService) {}
  // ngOnInit() {
  //   let res = this.dataBridge.testbackend()
  //   console.log(typeof(res))
  //   console.log(res)
  // }
}
