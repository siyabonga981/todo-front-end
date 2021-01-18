import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Task } from './shared/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  task: any[] = [];
  tasks: Task[];

  serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  genericGet(key, params?, query?, headers?) {
    let url = `${this.serverUrl}/${key}`;

    if (params && query) {
      url += `?params=${JSON.stringify(params)}&query=${JSON.stringify(query)}`;
    } else if (params || query) {
      url += params ? `?params=${JSON.stringify(params)}` : `?query=${JSON.stringify(query)}`;
    };

    let options = { headers: {} };

    if (headers) {
      options.headers['additionals'] = JSON.stringify(headers);
    } else {
      options.headers['responseType'] = 'json';
    }

    return this.http.get(url, options).pipe(map(res => res));
  }

  addTodo(key, payload, params?, query?, headers?) {
    let url = `${this.serverUrl}/${key}`;

    if (params && query) {
      url += `?params=${JSON.stringify(params)}&query=${JSON.stringify(query)}`;
    }
    else if (params || query) {
      url += params ? `?params=${JSON.stringify(params)}` : `?query=${JSON.stringify(query)}`;
    }
    // tslint:disable-next-line: prefer-const
    let options = { headers: {} };
    if (headers) { options.headers['additionals'] = JSON.stringify(headers); }
    else {
      options.headers['responseType'] = 'json';
      return this.http.post(url, payload, options);
    }
  }

  updateTodo(key, payload, params?, query?, headers?) {
    let url = `${this.serverUrl}/${key}`;

    if (params && query) {
      url += `?params=${JSON.stringify(params)}&query=${JSON.stringify(query)}`;
    }
    else if (params || query) {
      url += params ? `?params=${JSON.stringify(params)}` : `?query=${JSON.stringify(query)}`;
    }
    // tslint:disable-next-line: prefer-const
    let options = { headers: {} };
    if (headers) { options.headers['additionals'] = JSON.stringify(headers); }
    else {
      options.headers['responseType'] = 'json';
      return this.http.put(url, payload, options);
    }
  }

  deleteTodo(key, payload, params?, query?, headers?) {
    let url = `${this.serverUrl}/${key}`;

    if (params && query) {
      url += `?params=${JSON.stringify(params)}&query=${JSON.stringify(query)}`;
    }
    else if (params || query) {
      url += params ? `?params=${JSON.stringify(params)}` : `?query=${JSON.stringify(query)}`;
    }
    // tslint:disable-next-line: prefer-const
    let options = { headers: {} };
    if (headers) { options.headers['additionals'] = JSON.stringify(headers); }
    else {
      options.headers['responseType'] = 'json';
      return this.http.delete(url, payload);
    }
  }
}

