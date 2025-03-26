import { Routes } from '@angular/router';
import { LatestSightingsComponent } from './latest-sightings/latest-sightings.component';
import { SightingDetailsComponent } from './sighting-details/sighting-details.component';
import { SubmitSightingComponent } from './submit-sighting/submit-sighting.component';
import { SubmitBirdComponent } from './submit-bird/submit-bird.component';
import { LatestBirdsComponent } from './latest-birds/latest-birds.component';
import { BirdDetailsComponent } from './bird-details/bird-details.component';
import { loginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: '', component: LatestSightingsComponent, pathMatch:'full'},
    {path: 'login', component: LoginComponent, pathMatch:'full'},
    {path: 'register', component: RegisterComponent, pathMatch:'full'},
    {path: 'sightings', redirectTo: '/', pathMatch:'full'},
    {path: 'sightings/:id', component: SightingDetailsComponent, pathMatch:'full'},
    {path: 'submit', component: SubmitSightingComponent, pathMatch:'full', canActivate: [loginGuard]},
    {path: 'submit-bird', component: SubmitBirdComponent, pathMatch:'full', canActivate: [loginGuard]},
    {path: 'birds', component: LatestBirdsComponent, pathMatch:'full'},
    {path: 'birds/:id', component: BirdDetailsComponent, pathMatch:'full'}
];
