import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/app/environments/environment';
import { Agent } from 'src/app/models/agent';
import { AgentServiceService } from 'src/app/services/agent-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {

  messageArray: any[] = [];
  private stompClient:any = null;
  newmessage!: string;
  recieverName!: string;

  agentDetails = new Agent();

  constructor(private agentService: AgentServiceService) {}

  ngOnInit() {
    const userName = sessionStorage.getItem("userName");

    let sock = new SockJS(environment.web_socket);
    this.stompClient = Stomp.over(sock);
    const _this = this;
  
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      _this.agentDetails.agentName = "Test Agent";
      _this.agentDetails.userName = "test_agent";

      _this.agentService.getConnectedAgentsList(_this.agentDetails).subscribe((data) => {
        console.log(data);
      })

      _this.stompClient.subscribe('/user/' + userName + '/private', function(hello: any){
        _this.showMessages(JSON.parse(hello.body));
      });
   });
  }

  showMessages(message: any) {
    this.messageArray.push(message);
  }

  sendPrivateMessage() {
    const messageModel = {
      senderName:  sessionStorage.getItem("userName"),
      recieverName: sessionStorage.getItem("userName"),
      message: this.newmessage,
      status: "MESSAGE"
    }

    this.stompClient.send('/app/private-message', {}, JSON.stringify(messageModel))
    this.newmessage = "";
  }

}
