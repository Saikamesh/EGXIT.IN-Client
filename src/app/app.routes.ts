import { Routes } from '@angular/router';
import { MainReasonsComponent } from './main-reasons/main-reasons.component';
import { HomeComponent } from './home/home.component';
import { OverallWorkExperienceComponent } from './overall-work-experience/overall-work-experience.component';
import { AdditionalThoughtsComponent } from './additional-thoughts/additional-thoughts.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { InsightsComponent } from './insights/insights.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'step1',
    component: MainReasonsComponent,
    title: 'Main Reasons',
  },
  {
    path: 'step2',
    component: OverallWorkExperienceComponent,
    title: 'Overall Work Experience',
  },
  {
    path: 'step3',
    component: AdditionalThoughtsComponent,
    title: 'Additional Thoughts',
  },
  {
    path: 'completed',
    component: ThankyouComponent,
    title: 'Thank You!',
  },
  {
    path: 'insights',
    component: InsightsComponent,
    title: 'Insights',
  },
];
