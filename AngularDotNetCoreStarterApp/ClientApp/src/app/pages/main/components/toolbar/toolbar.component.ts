import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  username: string;
  isInternetConnection = true;

  private usernameSubscription: Subscription;
  private internetConnectionSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private connectionService: ConnectionService
  ) { }

  ngOnInit(): void {
    this.usernameSubscription = this.authService.username.subscribe(username => this.username = username);

    this.internetConnectionSubscription = this.connectionService.monitor().subscribe(isConnected => {
      console.log(isConnected);

      this.isInternetConnection = isConnected;
    });
  }

  ngOnDestroy(): void {
    this.usernameSubscription?.unsubscribe();
    this.internetConnectionSubscription?.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
