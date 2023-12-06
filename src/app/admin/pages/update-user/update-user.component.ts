import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  userId !: string;
  
  constructor (public auth: AuthService, public userService:UsersService, public route: ActivatedRoute, public router: Router) {

    this.userId = this.route.snapshot.paramMap.get('id') || '';

  }

  updateStatut(newStatut: string): void {
    this.userService.updateStatut(this.userId, newStatut)
      .then(() => {
        console.log('Statut updated successfully');
        this.router.navigate(['/admin']);
      })
      .catch((error) => {
        console.error('Error updating statut :', error);
      });
  }
}
