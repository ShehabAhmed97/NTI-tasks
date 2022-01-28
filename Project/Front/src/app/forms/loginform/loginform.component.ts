import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  user : any = { email:"", password:"" }
  msg : string = ""
  x : boolean = false

  constructor(private _auth:AuthService, private router: Router) { }

  ngOnInit(): void {}
  onBlur() : void { this.x=true }
  handleLogin(loginForm:NgForm): void {
    if(loginForm.valid){
      this._auth.login(this.user).subscribe(
        (res) => { localStorage.setItem("ecommerceToken", res.data.token) } ,
        (e)=>{ this.msg =  e.error.data },
        ()=>{
          this.msg=""
          this.x=false
          loginForm.resetForm()
          this.profile()
        }        
      )
    }
  }

  profile(){
    this._auth.me().subscribe(
      (data)=>{this._auth.userData = data.data},
      (e)=>{},
      ()=>{ 
        this._auth.flag=true
        this.router.navigateByUrl('/')
      }
    )
  }

}
