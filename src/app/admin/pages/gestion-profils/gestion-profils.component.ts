import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-gestion-profils',
  templateUrl: './gestion-profils.component.html',
  styleUrls: ['./gestion-profils.component.css']
})
export class GestionProfilsComponent implements OnInit {

  constructor(public users: UsersService, public auth: AuthService, public userService: UsersService, public router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers();
  }

  deleteProfile(id : string){
    this.userService.deleteProfile(id);
    this.userService.getUsers();
  }

  updateUser(id : string){
    this.router.navigateByUrl(`admin/update/${id}`);
  }

}
