import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper = new JwtHelperService();
  const router = inject(Router);
  const toastrService = inject(CustomToastrService);
  const spinnerService = inject(NgxSpinnerService); 

  spinnerService.show(SpinnerType.SquareJellyBox);

  if (!_isAuthenticated) {
    // Token süresi dolmuşsa veya geçersizse, kullanıcıyı login sayfasına yönlendir
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Kullanıcıyı login sayfasına yönlendir, state.url ile geri dönülecek URL'yi ekle
    toastrService.message("You must login to access this page.", "Authentication Required", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }
  spinnerService.hide(SpinnerType.SquareJellyBox); 
  return true; // Eğer token geçerliyse, true döner ve kullanıcı istenen sayfaya erişebilir
}; 