import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatModuleRoutingModule } from './chat-module-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ChatModuleRoutingModule
  ]
})
export class ChatModuleModule { }
