import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Message {
  text: string;
  user: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private messages: Message[] = [];
  private apiUrl = 'http://localhost:3000/app/respond';

  constructor(private http: HttpClient) {
    // Dummy initialization for demonstration
    this.messages = [
      { text: 'Hello! How can I help you today?', user: false },
    ];
  }

  getMessages(): Message[] {
    return this.messages;
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

  sendMessageToBackend(message: string): Observable<string> {
    // Create an observable to stream the response back
    const responseSubject = new Subject<string>();

    const body = { message }; // Create the body object for the API request

    this.http
      .post(this.apiUrl, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text', // To receive response as plain text
        observe: 'events',
        reportProgress: true,
      })
      .pipe(
        map(event => {
          if (event.type === 4) {
            // Check if it's the final response
            responseSubject.next(event.body as string);
            responseSubject.complete();
          }
        }),
        catchError(err => {
          console.error('Error while streaming:', err);
          responseSubject.error('Error occurred while fetching the response');
          responseSubject.complete();
          return [];
        })
      )
      .subscribe();

    return responseSubject.asObservable();
  }
}
