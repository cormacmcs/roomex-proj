import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { UserForm } from './user-form/user-form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private homeService: HomeService) {}

  ngOnInit() {}

  public handleFormSubmit(formValue: UserForm) {
    this.homeService.setFormResults(formValue);
    this.router.navigate(['/thankyou']);
  }
}
