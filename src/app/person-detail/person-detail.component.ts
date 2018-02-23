import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { FormArray, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {
  @Input() person: Person;
  errorMessage: string;
  showSpinner: boolean = false;
  message: string = "Updared user's detials";

  // personForm: FormGroup;
  personForm = new FormGroup ({
    name: new FormControl(),
    Authorised: new FormControl(),
    Enabled: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.createForm();
  }



  createForm() {
    this.personForm = this.fb.group({
      IsAuthorised: '',
      IsEnabled: ''
    });
  }

  ngOnInit() {
    this.showSpinner = true;

    setTimeout( () => {
      this.getPerson();
      this.showSpinner = false;
    }, 2000)
    
  }
  
  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');

     this.personService.getPerson(id)
    .subscribe(person => this.person = person);
  }

  cancel(): void {
    
    this.location.back();
  }

  onSubmit(person: Person): void {
      console.log(this.personForm.value);

      console.log("Old authorised : "+ this.person.IsAuthorised);
      console.log("Old enabled : "+ this.person.IsEnabled);
      //Merge the form's model with the one from the database. 
    let updatedPerson = Object.assign({}, this.person, this.personForm.value);
    console.log("New authorised : "+ updatedPerson.IsAuthorised);
    console.log("New enabled : "+ updatedPerson.IsEnabled);

    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.updatePerson(updatedPerson,id) .subscribe(() => this.snackBar.open(this.message,"close",{duration: 3000}), null, ()=> this.cancel());
  }

}
