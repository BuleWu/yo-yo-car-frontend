import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavbarComponent} from '../../../../shared/components/navbar/navbar.component';
import {ChatProviderService} from '../../services/chat-provider-service/chat-provider.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ChatPusherService} from '../../services/chat-pusher-service/chat-pusher.service';
import {Message} from '../../../../shared/models/chat/chat-models';
import {DatePipe, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {take} from 'rxjs';
import {User} from '../../../../shared/models/user/user-models';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ROUTES} from '../../../../shared/enums/router.enum';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-chat',
  imports: [
    NavbarComponent,
    NgClass,
    FormsModule,
    DatePipe,
    MatInput,
    MatIconButton,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  public messages!: Message[];
  public chatId!: string;
  public myUserId!: string;
  public otherUser: User | undefined;
  public newMessage: string = '';

  constructor(
    private _chatProviderService: ChatProviderService,
    private _chatPusherService: ChatPusherService,
    private _activatedRoute: ActivatedRoute,
    private _authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.myUserId = this._authenticationService.getUserId();
    this.chatId = this._activatedRoute.snapshot.paramMap.get('id') as string;

    this._chatProviderService.getChatById(this.chatId)
      .pipe(
        take(1)
      )
      .subscribe(chat => {
        this.otherUser = chat.user1Id === this.myUserId ? chat.user2 : chat.user1;
        this._chatPusherService.subscribeToChat(chat.id);
      });

    this._chatPusherService.loadMessages(this.chatId, 100); /*TODO: change to dynamically loading*/
    this._chatPusherService.messages$
      .subscribe((messages) => {
        this.messages = messages;
      });

    this._chatPusherService.scrollToBottom$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.scrollToBottom());
  }
  private scrollToBottom(): void {
    try {
      if(this.messagesContainer?.nativeElement) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  public sendMessage(): void {
    if(this.newMessage.trim() === '') return;
    this._chatPusherService.sendMessage(this.chatId, this.myUserId, this.otherUser?.id as string, this.newMessage);
    this.newMessage = '';
  }

  protected readonly ROUTES = ROUTES;
}
