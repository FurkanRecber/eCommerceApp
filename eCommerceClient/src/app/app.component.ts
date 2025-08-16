import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
declare var $: any; // jQuery


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eCommerceClient';
  constructor(private customToastrService: CustomToastrService, public authService: AuthService, private router: Router) {
    this.customToastrService.message("Welcome to eCommerceClient!", "Welcome", {messageType: ToastrMessageType.Info, position: ToastrPosition.TopLeft});
    authService.identityCheck(); // Check authentication status on app initialization
  }
  // Kullanıcı çıkış yapma fonksiyonu
  // Bu fonksiyon, kullanıcıyı oturumdan çıkartır ve gerekli güncellemeleri yapar
  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck(); // Update authentication status after sign out
    this.router.navigate(['']); // Redirect to home page
    this.customToastrService.message("You have been signed out.", "Sign Out", {messageType: ToastrMessageType.Info, position: ToastrPosition.TopRight});
  }
}
/*
$(document).ready(function () {
alert("jQuery is working!") 
}) // Ensure jQuery is loaded and working
*/