import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators'; // Error Handling
import { Http, Response, Headers } from '@angular/http';
import { Person } from './person';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PersonService {
  private getPersonUrl = 'http://colours-test.answerappcloud.com/api/people'; //"http://localhost:8080/person/get"
  private peopleUrl = 'http://localhost:8080/all';
  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl)
    .pipe(
      tap(heroes => this.log(`fetched people`)),
      catchError(this.handleError('getPeople', []))
    );
  }


  /** GET hero by id. Will 404 if id not found */
getPerson(id: number): Observable<Person> {
  const url = `${this.getPersonUrl}/${id}`;
  console.log("Url = "+ url);
  
  return this.http.get<Person>(url).pipe(
    tap(_ => this.log(`fetched person id=${id}`)),
    catchError(this.handleError<Person>(`getPerson id=${id}`))
  );
}



private log(message: string) {
  console.log(message);
 }

 /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

updatePerson(person:Person,id:number): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  const url = `${this.getPersonUrl}/${id}`;

  return this.http.put(url, person,httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${person.PersonId}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}
 

}
