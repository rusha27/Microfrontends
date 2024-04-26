import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AuthGuard } from 'src/app/services/auth/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private authGuard: AuthGuard) {}

  // login(): void {    
  //   if (this.authService.login(this.username, this.password)) {
  //     alert('ffhjfdsjfhjf')
  //   } else {
  //     alert('Invalid username or password');
  //   }
  // }

  login(): void {
    
    this.authService.login(this.username, this.password)
      .subscribe((response) => {
        // this.authService.isLoggedIn()
        // Assuming your backend responds with a JWT token
        const token = response.token;
        // Store the token in local storage or a cookie for future requests
        console.log("token");
        
        localStorage.setItem('jwt_token', token);
        // Redirect to the home page or any other page
        // this.router.navigate(['/home']);
        console.log("this.authGuard.canActivate()",this.authGuard.canActivate());
        
        window.location.href = '/users'; 
        // this.router.navigate(['/users']);
        alert("login successful")
      }, (error) => {
        // Handle login error
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      });
  }
}
