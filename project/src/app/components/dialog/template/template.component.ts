import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { APIService } from 'src/app/services/api.service';
import { templateDialogData } from './templateDialogData';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateModalDialog implements OnInit {

  editorOptions = {
    theme: "vs-dark",
    language: "javascript"
  };

  instructions: string = null;
  code: string = null;

  options = {
    theme: "vs-dark"
  };

  constructor(
    public dialogRef: MatDialogRef<TemplateModalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: templateDialogData,
    public apiService: APIService,
    )
    {

    }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  addTemplate(): void{
    this.apiService.makeTemplate(
      this.data.sub_action_id,
      this.data.language,
      this.data.template,
      this.data.instructions,
    (resp) => {
        this.dialogRef.close(resp);
    },
    (err) => {
        console.log(err);
        alert("Error");
        this.dialogRef.close({"error":true});
    });
  }

  editTemplate(): void {
    this.apiService.editTemplate(
        this.data._id,
        this.data.language,
        this.data.template,
        this.data.instructions,
      (resp) => {
        this.dialogRef.close(resp);
    },
    (err) => {
        console.log(err);
        alert("Error");
        this.dialogRef.close({"error":true});
    });
  }

  ngOnInit() {
  }

}
