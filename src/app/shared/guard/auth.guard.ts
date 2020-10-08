import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { LoginService } from 'src/app/login/shared/services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private service: LoginService) {}

    canActivate() {
        if (this.service.currentUserId.getValue()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
