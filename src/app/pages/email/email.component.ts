import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-email",
  templateUrl: "./email.component.html",
  styleUrls: ["./email.component.css"],
})
export class EmailComponent implements OnInit {
  dataset: Details = {
    recipient: "",
    subject: "",
    msgBody: "",
  };
  constructor(private https: HttpClient) {}

  ngOnInit() {}

  onSubmit() {
    this.https
      .post<Details>("http://localhost:8081/api/sendMail", this.dataset)
      .subscribe((res) => {
        this.dataset = res;
        this.dataset.recipient = "";
        this.dataset.subject = "";
        this.dataset.msgBody = "";
      });
  }
}

interface Details {
  recipient: string;
  subject: string;
  msgBody: string;
}
