import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _auth:AuthService) { }

  ngOnInit(): void {
  }
  handleLogout(){
    this._auth.logout().subscribe(
      (res)=>{this._auth.userData = null},
      (e)=>{},
      ()=>{ 
        this._auth.flag=false
      }
    )
  }
}
