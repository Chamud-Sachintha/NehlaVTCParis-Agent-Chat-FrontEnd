import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Agent } from '../models/agent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentServiceService {

  constructor(private http: HttpClient) { }

  validateAgentDetails(agentDetails: Agent):Observable<any> {
    const path = environment.app_uri + "agent/validate";
    return this.http.post<any>(path, agentDetails);
  }
}
