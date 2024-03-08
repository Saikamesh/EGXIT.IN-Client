import { Component } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataBridgeService } from '../services/data-bridge.service';
import { Thoughts } from '../models/thoughts';
@Component({
  selector: 'app-additional-thoughts',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './additional-thoughts.component.html',
  styleUrl: './additional-thoughts.component.css',
})
export class AdditionalThoughtsComponent {
  constructor(private location: Location, private router: Router, private dataBridge: DataBridgeService) {}

  hasError: boolean = false;
  offlineInterview: boolean = true;
  workExperience: string =
    'Please share any additional thoughts about your work experience at the college, your sense of belonging, or connection to the college and the worcester community.';
  collegeExperience: string =
    'Please share any additional thoughts about experiences while at the college and your decision to leave. Your feedback is valued and will be used to make improvements to the work experience at Clark. If you would like to provide additional in-person comment to someone at the college, please contact Person, email, with your contact information.';
  inPersonInterview: string =
    'Would you like to participate in a virtual, or in person, interview with someone outside of HR to provide Clark with more information about your decision to leave the college?';
  participation: string =
    'Thank you for your willingness to participate! Please provide us with your contact information so we can reach out to you to schedule a time to talk further.';

  ngOnInit(): void {
    this.additionalThoughtsForm.get('inPersonInterview')?.valueChanges.subscribe((value) => {
      if (value === 'Yes') {
        this.additionalThoughtsForm
          .get('fullName')
          ?.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
        this.additionalThoughtsForm.get('email')?.setValidators([Validators.required, Validators.email]);
        this.additionalThoughtsForm
          .get('phone')
          ?.setValidators([
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
            Validators.pattern('^[0-9]*$'),
          ]);
      } else {
        this.additionalThoughtsForm.get('fullName')?.clearValidators();
        this.additionalThoughtsForm.get('email')?.clearValidators();
        this.additionalThoughtsForm.get('phone')?.clearValidators();
      }
      this.additionalThoughtsForm.get('fullName')?.updateValueAndValidity();
      this.additionalThoughtsForm.get('email')?.updateValueAndValidity();
      this.additionalThoughtsForm.get('phone')?.updateValueAndValidity();
    });
  }

  goBack(): void {
    this.location.back();
  }

  offlineInterviewYes(): void {
    this.offlineInterview = false;
  }
  offlineInterviewNo(): void {
    this.offlineInterview = true;
  }

  additionalThoughtsForm = new FormGroup({
    WorkExpDesc: new FormControl<string>('', [Validators.pattern('^[a-zA-Z0-9 ]*$')]),
    CollegeExpDesc: new FormControl<string>('', [Validators.pattern('^[a-zA-Z0-9 ]*$')]),
    InPersonInterview: new FormControl<string>('', [Validators.required]),
    FullName: new FormControl<string>('', [Validators.pattern('^[a-zA-Z]+(?: [a-zA-Z]+)*$'), Validators.maxLength(50)]),
    Email: new FormControl<string>('', [Validators.email]),
    Phone: new FormControl<string>('', [
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern('^[0-9]{10}$'),
    ]),
  });

  onSubmit(): void {
    if (
      this.additionalThoughtsForm.valid &&
      (this.offlineInterview ||
        (this.additionalThoughtsForm.controls.FullName.value &&
          this.additionalThoughtsForm.controls.Email.value &&
          this.additionalThoughtsForm.controls.Phone.value))
    ) {
      let thoughtsData = {} as Thoughts;
      if (!this.offlineInterview) {
        thoughtsData = {
          WorkExpDesc: this.additionalThoughtsForm.value.WorkExpDesc ?? '',
          CollegeExpDesc: this.additionalThoughtsForm.value.CollegeExpDesc ?? '',
          InPersonInterview: this.additionalThoughtsForm.value.InPersonInterview ?? '',
          FullName: this.additionalThoughtsForm.value.FullName ?? '',
          Email: this.additionalThoughtsForm.value.Email ?? '',
          Phone: this.additionalThoughtsForm.value.Phone ?? '',
        };
      } else {
        thoughtsData = {
          WorkExpDesc: this.additionalThoughtsForm.value.WorkExpDesc ?? '',
          CollegeExpDesc: this.additionalThoughtsForm.value.CollegeExpDesc ?? '',
          InPersonInterview: this.additionalThoughtsForm.value.InPersonInterview ?? '',
          FullName: '',
          Email: '',
          Phone: '',
        };
      }
      let status: Promise<Response> = this.dataBridge.submitAdditionalResponseForm(thoughtsData);
      this.router.navigate(['/completed']);
    } else {
      this.hasError = true;
    }
  }
}
