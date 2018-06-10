import {Component, Input} from '@angular/core';
import {Message} from "../shared/classes/message";

@Component({
    moduleId: module.id,
    selector: 'message-cmp',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent {
    @Input() value: Message;
}
