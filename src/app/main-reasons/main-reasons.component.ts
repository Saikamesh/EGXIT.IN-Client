import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-main-reasons',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './main-reasons.component.html',
  styleUrl: './main-reasons.component.css',
})
export class MainReasonsComponent {
  constructor(private router: Router, private location: Location) {}

  reasons: string[] = [
    'Took another opportunity that was better fit for my skills',
    'Took another opportunity I was more interested in',
    'Took another opportunity for greater career growth',
    'Lack of mentoring opportunities',
    'Lack of social support networks',
    'My Appointment contract expired',
    "Didn't feel like I belonged at the college",
    "Didn't feel supported in my department",
    "Didn't feel welcomed in my department",
    'Work-related benefits(e.g. healthcare, dental, retirement matching, paid holidays, work location flexibility etc)',
    "Need to accomodate my partner's career",
    'Career change into another industry',
    'family obligations',
    'retirement',
  ];

  additionalReflections: string =
    'We are interested in learning more about your reasons for leaving. Please provide any additional reflections or comments you have about your decision to leave the college.';

  isOther: boolean = false;
  selectedReasons: string[] = [];

  showTextField(): void {
    this.isOther = true;
  }

  hideTextField(): void {
    this.isOther = false;
  }

  goBack(): void {
    this.location.back();
  }

  mainReasonsForm = new FormGroup({
    position: new FormControl('', [Validators.required]),
    influence: new FormControl('', [Validators.required]),
    additional_reflection: new FormControl(''),
  });

  getValues(rs: { reason: string }) {
    let reason: string = rs['reason'];
    if (this.selectedReasons.includes(reason)) {
      this.selectedReasons = this.selectedReasons.filter(
        (item) => item !== reason
      );
    } else {
      this.selectedReasons.push(reason);
    }
  }

  onSubmit(): void {
    if(this.mainReasonsForm.valid){
      console.log('Submit working');
      console.log(typeof(this.mainReasonsForm.value.position));
      console.log(typeof(this.selectedReasons));
      console.log(typeof(this.mainReasonsForm.value.additional_reflection));
      

      console.log((this.mainReasonsForm.value.position));
      console.log((this.mainReasonsForm.value.additional_reflection));
      console.log((this.selectedReasons)); 
      this.router.navigate(['/step2']);
    }else{
      console.log('Form is invalid');
    }
  }
}

// class MainReasons(models.Model):
//     EmployementType: str = models.CharField(max_length=30)
//     influence: str = models.JSONField(default=list)
//     additional_reflection: str = models.CharField(max_length=500, null=True)
