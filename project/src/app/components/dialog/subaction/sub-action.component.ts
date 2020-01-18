
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SubActionDialogData } from './sub-actionDialogData';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'sub-action-app-dialog',
  templateUrl: './sub-action.component.html',
  styleUrls: ['./sub-action.component.css']
})
export class SubActionModalDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SubActionModalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SubActionDialogData, 
    public apiService: APIService,
    ) 
    {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addSubAction(): void{
    this.apiService.makeSubAction(
      this.data.action_id,
      this.data.name, 
    (resp) => {
        this.dialogRef.close(resp);
    },
    (err) => {
        console.log(err);
        alert("Error");
        this.dialogRef.close(false);
    });
  }

  editSubAction(): void {
    this.apiService.editSubAction(
        this.data._id, 
        this.data.name, 
    (resp) => {
        this.dialogRef.close(resp);
    },
    (err) => {
        console.log(err);
        alert("Error");
    });
  }

  ngOnInit() {
  }

}
