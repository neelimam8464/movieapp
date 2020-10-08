import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-topnav",
    templateUrl: "./topnav.component.html",
    styleUrls: ["./topnav.component.scss"],
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;

    constructor(public router: Router, private translate: TranslateService) {}

    ngOnInit() {
        this.pushRightClass = "push-right";
    }

    onLoggedout() {
        localStorage.removeItem("isLoggedin");
        this.router.navigate(["/login"]);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
