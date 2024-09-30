import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: "app-dropdown",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./dropdown.component.html",
    styleUrls: ["../../styles/styles.scss", "./dropdown.component.scss"],
})
export class DropdownComponent {}
