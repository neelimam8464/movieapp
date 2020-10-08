import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Movies } from "../../../shared/services/movie.service";
@Component({
    selector: "app-stat",
    templateUrl: "./stat.component.html",
    styleUrls: ["./stat.component.scss"],
})
export class StatComponent implements OnInit {
    @Input() data: Movies;

    constructor(private router: Router) {}

    ngOnInit() {}

    movieDetails(movieId) {
        this.router.navigate(["/user/details", movieId]);
    }
}
