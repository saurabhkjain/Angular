import { Component, OnInit,PipeTransform, Pipe } from '@angular/core';
import { Person } from '../person';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
@Pipe({name: 'yesno'})
export class PeopleListComponent implements OnInit, PipeTransform {

  private apiURL = 'http://colours-test.answerappcloud.com/api/people';

  data: any = {};
  users: Person[];

  constructor(private http: Http, private personService: PersonService) {
    console.log('Hello World');
   // this.getData();
  }
  ngOnInit() {
    this.getPeople();
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

  transform(value) {
    return value ? 'Yes' : 'No';
  }
  
 

}
