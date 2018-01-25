import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { FormArray, FormBuilder, FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {
  @Input() person: Person;

  // personForm: FormGroup;
  personForm = new FormGroup ({
    name: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.personForm = this.fb.group({
      Authorised: '',
      Enabled: ''
    });
  }

  ngOnInit(): void {
    this.getPerson();
  }
  
  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');

     this.personService.getPerson(id)
    .subscribe(person => this.person = person);
  }

  cancel(): void {
    this.location.back();
  }

  save(): void {
    const formModel = this.personForm.value;

    // const id = +this.route.snapshot.paramMap.get('id');
    // console.log("Person to be updated is "+ this.person.IsEnabled);
    // this.personService.updatePerson(this.person,id).subscribe(() => this.cancel());
  }

}
