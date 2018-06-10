import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {MessageComponent} from "./message.component/message.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpClientModule ],
    declarations: [AppComponent, MessageComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
