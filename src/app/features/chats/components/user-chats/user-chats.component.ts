import {Component, OnInit} from '@angular/core';
import {ChatProviderService} from '../../services/chat-provider-service/chat-provider.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Chat} from '../../../../shared/models/chat/chat-models';
import {NavbarComponent} from '../../../../shared/components/navbar/navbar.component';
import {DatePipe} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {ROUTES} from '../../../../shared/enums/router.enum';
import {TimeAgoPipe} from '../../../../shared/pipes/time-ago-pipe/time-ago.pipe';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-user-chats',
  imports: [
    NavbarComponent,
    MatDivider,
    MatIcon,
    RouterLink,
    TimeAgoPipe
  ],
  templateUrl: './user-chats.component.html',
  styleUrl: './user-chats.component.scss'
})
export class UserChatsComponent implements OnInit {
  public chats: Chat[] = [];
  public myUserId!: string;
  public ROUTES = ROUTES;

  constructor(
    private _chatProviderService: ChatProviderService,
    private _authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.myUserId = this._authenticationService.getUserId();

    /*TODO: emit chat created event Pusher*/
    this._chatProviderService.getChats()
      .pipe(untilDestroyed(this))
      .subscribe((chats) => {
        this.chats = chats;
      })
  }
}
