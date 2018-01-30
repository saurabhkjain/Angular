import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailComponent } from './person-detail/person-detail.component'
import { PeopleListComponent } from './people-list/people-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'api/people/:id', component: PersonDetailComponent },
  { path: 'people', component: PeopleListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}