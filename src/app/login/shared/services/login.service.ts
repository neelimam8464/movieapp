import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { allowedUsers, loginDetails } from '../models/login-model';
import { MovieService } from 'src/app/shared/services/movie.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class LoginService {
    currentUserId = new BehaviorSubject<number>(null);
    constructor(private router: Router) {}

    // check login
    authLogin(body: loginDetails): boolean {
        const loginedUser = this.getUserDetails(body);
        if (loginedUser) {
            this.currentUserId.next(loginedUser.userId);
            if (loginedUser.role === 'user') {
                this.router.navigate(['/user']);
            } else {
                this.router.navigate(['/admin']);
            }
            return true;
        } else {
            return false;
        }
    }

    // check user valid or not
    getUserDetails(body: loginDetails): loginDetails {
        const loginedUser = allowedUsers.find(
            (item) =>
                item.userName === body.userName &&
                item.password === body.password
        );
        return loginedUser;
    }
    getUserDetailsByUserId(userId) {
        return allowedUsers.find(x => x.userId === Number(userId));
    }
}
