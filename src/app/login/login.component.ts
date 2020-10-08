import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/shared/services/login.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    InvalidCredential = false;
    constructor(
        private router: Router,
        private loginService: LoginService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.createForm();
    }

    // create form group
    createForm() {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    // login click
    onLogin() {
        if (this.loginForm.valid) {
            if (this.loginService.authLogin(this.loginForm.value)) {
                this.InvalidCredential = false;
            } else {
                this.InvalidCredential = true;
            }
        }
    }
}
