import { Component, } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-overall-work-experience',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './overall-work-experience.component.html',
  styleUrl: './overall-work-experience.component.css',
})
export class OverallWorkExperienceComponent {
  constructor(private location: Location, private router: Router) {}
  
  sectionDisclaimer: string =
    'Please rate the extent to which you agree with the following statements about your overall work experience at the college.';
  
    items: string[] = [
    'Support for my professional Development',
    'Opportunities for career growth',
    'Recognition for my accomplishments',
    'Consideration of work/life balance',
    'Collegial work environment',
    'commitment to diversity, equity and inclusion',
    'Diversity of college',
    'Diversity within my department',
    'Mentoring Opportunities',
    'Social support/networking opportunities',
    'Valued my contributions to college',
    'Values my experiences and what I bring to the college',
    'Opportunities to collaborate',
    'Openness to new ideas/oppurtunities',
    'Opportunities to integrate into worcester community',
    'Compenstation',
    'Health Benifits',
    'Other college benifits',
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
    'Support_Professional_Development': new FormControl('', [Validators.required]),
    'Career_Growth_Opportunities': new FormControl('', [Validators.required]),
    'Accomplishment_Recognition': new FormControl('', [Validators.required]),
    'Work_Life_Balance_Consideration': new FormControl('', [Validators.required]),
    'Collegial_Work_Environment': new FormControl('', [Validators.required]),
    'DEI_Commitment': new FormControl('', [Validators.required]),
    'College_Diversity': new FormControl('', [Validators.required]),
    'Department_Diversity': new FormControl('', [Validators.required]),
    'Mentoring_Opportunities': new FormControl('', [Validators.required]),
    'Social_Networking_Support': new FormControl('', [Validators.required]),
    'Contribution_Recognition': new FormControl('', [Validators.required]),
    'Experience_Valuation': new FormControl('', [Validators.required]),
    'Collaboration_Opportunities': new FormControl('', [Validators.required]),
    'Openness_to_New_Ideas': new FormControl('', [Validators.required]),
    'Integration_into_Community': new FormControl('', [Validators.required]),
    'Compensation': new FormControl('', [Validators.required]),
    'Health_Benefits': new FormControl('', [Validators.required]),
    'Other_College_Benefits': new FormControl('', [Validators.required])
  });

  onSubmit(): void {

    if(this.overallWorkExperienceForm.valid){
      for (let item of this.items) {
        let ratingString = this.overallWorkExperienceForm.value[item as keyof typeof this.overallWorkExperienceForm.value];
        let ratingNumber = Array.from(this.ratingScore.entries()).find(([key, value]) => value === ratingString)?.[0];
        console.log(ratingNumber);
      }
      
      this.router.navigate(['/step3']);
    }else{

    console.log('Required filed unfilled - please fill them!');
  }
}
}


// class WorkExperienceMetrics(models.Model):
//     Support_Professional_Development: int = models.IntegerField()
//     Career_Growth_Opportunities: int = models.IntegerField()
//     Accomplishment_Recognition: int = models.IntegerField()
//     Work_Life_Balance_Consideration: int = models.IntegerField()
//     Collegial_Work_Environment: int = models.IntegerField()
//     DEI_Commitment: int = models.IntegerField()
//     College_Diversity: int = models.IntegerField()
//     Department_Diversity: int = models.IntegerField()
//     Mentoring_Opportunities: int = models.IntegerField()
//     Social_Networking_Support: int = models.IntegerField()
//     Contribution_Recognition: int = models.IntegerField()
//     Experience_Valuation: int = models.IntegerField()
//     Collaboration_Opportunities: int = models.IntegerField()
//     Openness_to_New_Ideas: int = models.IntegerField()
//     Integration_into_Community: int = models.IntegerField()
//     Compensation: int = models.IntegerField()
//     Health_Benefits: int = models.IntegerField()
//     Other_College_Benefits: int = models.IntegerField()