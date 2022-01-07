import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.redirecting()
  }

  redirecting(){
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 3000);
  }

}