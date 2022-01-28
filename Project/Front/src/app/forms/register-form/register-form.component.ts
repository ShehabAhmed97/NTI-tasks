import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private _data:UsersService) { }

  ngOnInit(): void {
  }

  handleRegister(addUser:NgForm){
    if(addUser.valid){
      this._data.registerUser(addUser.value).subscribe(res => null)
    }
  }
}
