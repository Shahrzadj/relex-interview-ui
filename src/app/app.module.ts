import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import {SelectButtonModule} from 'primeng/selectbutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';import { AppComponent } from './app.component';
@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ConfirmDialogModule,
        InputNumberModule,
        DropdownModule,
        ButtonModule,
        SelectButtonModule,
        MessagesModule,
        MessageModule,
        ToastModule
    ],
    providers: [ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
