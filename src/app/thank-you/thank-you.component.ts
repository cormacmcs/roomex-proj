import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { UserForm } from '../home/user-form/user-form.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  results: UserForm;
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.results = this.homeService.getFormResults();
  }
}
