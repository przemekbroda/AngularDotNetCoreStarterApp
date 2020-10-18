import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  username: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.authService.username.subscribe(username => this.username = username);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
