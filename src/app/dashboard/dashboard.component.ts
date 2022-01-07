import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public fullName:string | undefined;
  public imageUrl:string | undefined;

  constructor(private authService: NbAuthService,private Cookies:CookieService, private http:HttpClient) { 

    this.authService.authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: any) => {
        if (authResult.isSuccess()) {
          this.getData(authResult.response.access_token)
        }
      });

  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
  }

  public requestData = (token:string):Observable<any> =>{
    return this.http.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
  }

  public getData = (token:string) => {
    this.requestData(token)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response)=>{console.log(response)
        this.imageUrl= response.picture
        this.fullName = response.name
        console.log(this.fullName)
      },
      error: (err)=>{console.log(err)},
      complete: () => {console.log("completed")}
    }
     
    )
  }

}
