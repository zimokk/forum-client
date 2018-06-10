import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessagesService} from "./shared/services/messages.service";
import {HttpClient} from "@angular/common/http";
import {Message} from "./shared/classes/message";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
    moduleId: module.id,
    selector: 'forum-app',
    providers: [HttpClient, MessagesService],
    templateUrl: './app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
    messageForm: FormGroup;
    messagesList: Message[] = [];
    private messageSubscription: Subscription;
    constructor(private formBuilder: FormBuilder, private messageService: MessagesService) { }

    ngOnInit() {
        this.initForm();
        this.initMessagesSubscription();
    }

    private initForm(): void {
        this.messageForm = this.formBuilder.group({
            title: ['', [
                    Validators.required
                ]
            ],
            body:  ['', [
                    Validators.required
                ]
            ]
        });
    }

    onSubmit() {
        const controls = this.messageForm.controls;

        if (this.messageForm.invalid) {
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());

            return;
        }
        let {title, body} = this.messageForm.value;
        this.messageService.createMessage( title, body );
        this.messageForm.reset();
    }

    private initMessagesSubscription() {
        this.messageSubscription = this.messageService.getMessagesObservable().subscribe(
            (fullMessagesList) => {
                let additionalMessagesCount = fullMessagesList.length - this.messagesList.length;
                if(additionalMessagesCount > 0){
                    this.messagesList.unshift(...fullMessagesList.slice(0, additionalMessagesCount));
                }
            }, (error) => {
                console.error(error);
            }
        );
        this.messageService.getMessages();
    }

    ngOnDestroy(): void {
        this.messageSubscription.unsubscribe();
    }
}
