import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./modules/auth-module/auth-module.module").then(m => m.AuthModuleModule)
      }
    ]
  },

  {
    path: 'chat',
    component: ChatLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./modules/chat-module/chat-module.module").then(m => m.ChatModuleModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
