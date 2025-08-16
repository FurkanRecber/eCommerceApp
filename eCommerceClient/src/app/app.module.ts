import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule for notifications
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component'; // Import NgxSpinnerModule for loading spinner
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, //Component değiştirirken ekranın direkt değişmesini sağlamak içim import etmeliyiz
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({ 
      config: {
        tokenGetter: () => {
          return localStorage.getItem('accessToken'); // JWT token'ı localStorage'dan al 
        },
        allowedDomains: ["localhost:7143"], // API'nin domaini
      }  
    })
  ],
  providers: [
    {provide: "baseUrl", useValue: "https://localhost:7143/api", multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
