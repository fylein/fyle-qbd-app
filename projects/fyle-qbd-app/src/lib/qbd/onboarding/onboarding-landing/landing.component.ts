import { Component, OnInit } from '@angular/core';
import { RedirectLink } from 'fyle-integrations-ui-lib';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  RedirectLink = RedirectLink;

  isQBDSetupInProgress: boolean = false;

  isQBDConnected: boolean = false;

  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
