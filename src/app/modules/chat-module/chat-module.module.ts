import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatModuleRoutingModule } from './chat-module-routing.module';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatModuleRoutingModule
  ]
})
export class ChatModuleModule { }
