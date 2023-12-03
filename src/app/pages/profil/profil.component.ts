import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, public auth: AuthService) {}

  ngOnInit() {
      this.cdr.detectChanges();
      this.auth.getProfile();
  }

}