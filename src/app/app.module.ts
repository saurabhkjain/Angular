import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { PersonService } from './person.service';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleSearchComponent } from './people-search/people-search.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonDetailComponent,
    PeopleListComponent,
    PeopleSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule                                                                                                                                                                        
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
