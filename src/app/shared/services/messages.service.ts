import {Injectable, OnDestroy} from '@angular/core';
import {Message} from "../classes/message";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";

@Injectable()
export class MessagesService implements OnDestroy {
    private urlPrefix = "/message";
    private baseUrl = "http://localhost:3200";
    private updateInterval;

    private messagesSubject = new Subject<Message[]>();

    constructor(private httpClient: HttpClient){
    };

    createMessage(messageTitle: string, messageBody: string){
        this.httpClient.post(
            this.baseUrl+this.urlPrefix,
            JSON.stringify({title: messageTitle, body: messageBody}),
            {headers: new HttpHeaders({'Content-Type': 'application/json'})}
        ).toPromise().then(() => {
            this.getMessages();
        }, (reason) => {
            console.error("Rejected create message: ", reason);
        })
    }

    getMessages(){
        this.httpClient.get(
            this.baseUrl+this.urlPrefix
        ).toPromise().then((value: Message[]) => {
            this.messagesSubject.next(value);
        }, (reason) => {
            console.error("Rejected retrieving message: ", reason);
        })
    }

    getMessagesObservable(){
        if(!this.updateInterval){
            this.updateInterval = setInterval(this.getMessages.bind(this), 5000);
        }
        return this.messagesSubject.asObservable();
    }

    ngOnDestroy(): void {
        clearInterval(this.updateInterval);
    }
}