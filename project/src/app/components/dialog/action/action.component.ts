
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActionDialogData } from './actionDialogData';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'action-app-dialog',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionModalDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ActionModalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ActionDialogData, 
    public apiService: APIService,
    ) 
    {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addAction(): void{
    this.apiService.makeAction(this.data.name, 
    (resp) => {
        this.dialogRef.close(true);
    },
    (err) => {
        console.log(err);
        alert("Error");
    });
  }
  
  ngOnInit() {
  }

}
