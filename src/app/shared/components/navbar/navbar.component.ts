import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    MatButton,
    MatIcon,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
