import { Component } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-overall-work-experience',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './overall-work-experience.component.html',
  styleUrl: './overall-work-experience.component.css',
})
export class OverallWorkExperienceComponent {
  constructor(private location: Location, private router: Router) {}

  hasError: boolean = false;

  sectionDisclaimer: string =
    'Please rate the extent to which you agree with the following statements about your overall work experience at the college.';

  formItems: { key: string; value: string }[] = [
    {
      key: 'Support_Professional_Development',
      value: 'Support for my professional Development',
    },
    {
      key: 'Career_Growth_Opportunities',
      value: 'Opportunities for career growth',
    },
    {
      key: 'Accomplishment_Recognition',
      value: 'Recognition for my accomplishments',
    },
    {
      key: 'Work_Life_Balance_Consideration',
      value: 'Consideration of work/life balance',
    },
    { key: 'Collegial_Work_Environment', value: 'Collegial work environment' },
    {
      key: 'DEI_Commitment',
      value: 'commitment to diversity, equity and inclusion',
    },
    { key: 'College_Diversity', value: 'Diversity of college' },
    { key: 'Department_Diversity', value: 'Diversity within my department' },
    { key: 'Mentoring_Opportunities', value: 'Mentoring Opportunities' },
    {
      key: 'Social_Networking_Support',
      value: 'Social support/networking opportunities',
    },
    {
      key: 'Contribution_Recognition',
      value: 'Valued my contributions to college',
    },
    {
      key: 'Experience_Valuation',
      value: 'Values my experiences and what I bring to the college',
    },
    {
      key: 'Collaboration_Opportunities',
      value: 'Opportunities to collaborate',
    },
    {
      key: 'Openness_to_New_Ideas',
      value: 'Openness to new ideas/oppurtunities',
    },
    {
      key: 'Integration_into_Community',
      value: 'Opportunities to integrate into worcester community',
    },
    { key: 'Compensation', value: 'Compenstation' },
    { key: 'Health_Benefits', value: 'Health Benifits' },
    { key: 'Other_College_Benefits', value: 'Other college benifits' },
  ];

  ratings: string[] = [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree',
  ];

  ratingScore: Map<number, string> = new Map<number, string>([
    [1, 'Strongly Disagree'],
    [2, 'Disagree'],
    [3, 'Neutral'],
    [4, 'Agree'],
    [5, 'Strongly Agree'],
  ]);

  goBack(): void {
    this.location.back();
  }

  overallWorkExperienceForm = new FormGroup({
    Support_Professional_Development: new FormControl('', [
      Validators.required,
    ]),
    Career_Growth_Opportunities: new FormControl('', [Validators.required]),
    Accomplishment_Recognition: new FormControl('', [Validators.required]),
    Work_Life_Balance_Consideration: new FormControl('', [Validators.required]),
    Collegial_Work_Environment: new FormControl('', [Validators.required]),
    DEI_Commitment: new FormControl('', [Validators.required]),
    College_Diversity: new FormControl('', [Validators.required]),
    Department_Diversity: new FormControl('', [Validators.required]),
    Mentoring_Opportunities: new FormControl('', [Validators.required]),
    Social_Networking_Support: new FormControl('', [Validators.required]),
    Contribution_Recognition: new FormControl('', [Validators.required]),
    Experience_Valuation: new FormControl('', [Validators.required]),
    Collaboration_Opportunities: new FormControl('', [Validators.required]),
    Openness_to_New_Ideas: new FormControl('', [Validators.required]),
    Integration_into_Community: new FormControl('', [Validators.required]),
    Compensation: new FormControl('', [Validators.required]),
    Health_Benefits: new FormControl('', [Validators.required]),
    Other_College_Benefits: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.overallWorkExperienceForm.valid) {
      for (let item of this.formItems) {
        let ratingString =
          this.overallWorkExperienceForm.value[
            item.key as keyof typeof this.overallWorkExperienceForm.value
          ];
        let ratingNumber = Array.from(this.ratingScore.entries()).find(
          ([key, value]) => value === ratingString
        )?.[0];
        console.log(ratingNumber);
      }

      this.router.navigate(['/step3']);
    } else {
      this.hasError = true;
      console.log('Required filed unfilled - please fill them!');
    }
  }
}
