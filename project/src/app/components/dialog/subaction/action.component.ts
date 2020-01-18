
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SubActionDialogData } from './actionDialogData';
import { APIService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'action-app-dialog',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
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

  addAction(): void{
    this.apiService.makeSubAction(this.data.name, 
    (resp) => {
        this.dialogRef.close(resp);
    },
    (err) => {
        console.log(err);
        alert("Error");
        this.dialogRef.close(false);
    });
  }

  editAction(): void {
    this.apiService.editSubAction(
        this.data._id, 
        this.data.name, 
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
