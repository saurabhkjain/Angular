import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { PersonService } from './person.service';
import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiURL = 'http://colours-test.answerappcloud.com/api/people'; //'http://localhost:8080/all';

  data: any = {};
  users: Person[];

  constructor(private http: Http, private personService: PersonService) {
    console.log('Hello World');
    this.getData();
  }

  /*
  * Subscribe --
  * data - Success event
  */
  getData() {
    return this.http.get(this.apiURL)
    .map((res:Response) => {
      var ret = <Person[]>res.json();
      ret.sort((a,b) => a.FirstName < b.FirstName ? -1 : 1);
      return ret;
  }) // Sort the array by firstname.
    .subscribe(data => this.users = data);
  }

  getPeople(): void {
    this.personService.getPeople().subscribe(heroes => this.users = heroes);
  }
  
}
