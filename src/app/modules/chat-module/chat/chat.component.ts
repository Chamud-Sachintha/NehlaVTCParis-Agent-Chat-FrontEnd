import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/app/environments/environment';
import { Agent } from 'src/app/models/agent';
import { AgentServiceService } from 'src/app/services/agent-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {

  messageArray: any[] = [];
  senderNamesList: any[] = [];
  loadMessagesArray: any[] = [];
  private stompClient:any = null;
  sendMessageArray: any[] = [];
  newmessage!: string;
  recieverName!: string;

  messageForm!: FormGroup;
  userName!: any;
  showChatRoom: boolean = false;

  agentDetails = new Agent();

  constructor(private agentService: AgentServiceService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createMessageSendForm();
    this.userName = sessionStorage.getItem("userName");

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

      _this.stompClient.subscribe('/user/' + _this.userName + '/private', function(hello: any){
        _this.showMessages(JSON.parse(hello.body));
      });
   }, (err: any) => {
    console.log(err);
   });
  }

  createMessageSendForm() {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required]
    })
  }

  showMessages(message: any) {
    this.loadMessagesArray.push(message);
    this.messageArray.push(message);

    let result = this.arrayValueExists(this.senderNamesList, message.senderName);

    if (result == false) {
      this.senderNamesList.push(message.senderName);
    }

    sessionStorage.setItem("recName", message.senderName);
    this.loadUserMessageList(message.senderName);
  }

  loadUserMessageList(senderName: any) {
    this.showChatRoom = true;
    this.messageArray = [];

    this.loadMessagesArray.forEach((el) => {
      if (el.senderName == senderName || el.recieverName == senderName) {
        this.messageArray.push(el);
      }
    })
  }

  arrayValueExists(array: Array<any>, value: any) {
    let isKeyExists = false;
    console.log(array);
    array.forEach((el) => {
      if (el == value) {
        isKeyExists = true;
      }
    })

    return isKeyExists;
  }

  transformArray(array: Array<any>, field: any) {
    if (array) {
      const groupedObj = array.reduce((prev, cur) => {
        if (!prev[cur[field]]) {
          prev[cur[field]] = [cur];
        } else {
          prev[cur[field]].push(cur);
        }
        return prev;
      }, {});
      return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
    }
    return [];
  }

  sendPrivateMessage() {
    const messageModel = {
      senderName:  sessionStorage.getItem("userName"),
      recieverName: sessionStorage.getItem("recName"),
      message: this.messageForm.controls['message'].value,
      status: "MESSAGE"
    }

    this.loadMessagesArray.push(messageModel);
    this.messageArray.push(messageModel);
    this.stompClient.send('/app/private-message', {}, JSON.stringify(messageModel))
    this.messageForm.controls['message'].setValue('');
    this.newmessage = "";
  }

}
