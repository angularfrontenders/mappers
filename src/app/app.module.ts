import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EntityMapperService } from './mapper/entityMapper.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [EntityMapperService],
    bootstrap: [AppComponent]
})
export class AppModule { }
