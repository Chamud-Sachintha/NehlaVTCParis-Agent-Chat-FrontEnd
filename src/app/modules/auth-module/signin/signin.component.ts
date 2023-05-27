import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Agent } from 'src/app/models/agent';
import { AgentServiceService } from 'src/app/services/agent-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  agentDetails = new Agent();
  signinForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private agentService: AgentServiceService, private router: Router) {}

  ngOnInit() {
    this.createSigninForm();
  }

  createSigninForm() {
    this.signinForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  onSubmitAgentSigninForm() {
    this.agentDetails.userName = this.signinForm.controls['username'].value;
    this.agentDetails.password = this.signinForm.controls['password'].value;

    this.agentService.validateAgentDetails(this.agentDetails).subscribe((data) => {
      if (data.statusCode != 0) {
        this.router.navigate(['/chat']);
      } else {

      }
    })
  }

}
