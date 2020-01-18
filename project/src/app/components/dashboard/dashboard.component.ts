import { Component, OnInit, HostListener, Inject, ViewChild } from "@angular/core";
import { ApplicationStateService } from "src/app/services/application-state.service";
import {
  animate,
  state,
  transition,
  trigger,
  style,
  keyframes
} from "@angular/animations";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormBuilder, Validators } from "@angular/forms";
import { APIService } from "src/app/services/api.service";
import { DiffEditorModel } from "ngx-monaco-editor";
import { ActionModalDialog } from '../dialog/action/action.component';
import { MatDialog, MatSnackBar, MAT_SNACK_BAR_DATA, MatSelect } from '@angular/material';
import { SubActionModalDialog } from '../dialog/subaction/sub-action.component';
import { TemplateModalDialog } from '../dialog/template/template.component';

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public isLoading: Boolean = true;

  public actions: {};
  public sub_actions: {};
  public languages: {};

  public current_action: {} = null;
  public current_sub_action: {} = null;
  public current_language: {} = null;

  @ViewChild('action_select',{static:false}) action_select: MatSelect;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public applicationStateService: ApplicationStateService,
    public apiService: APIService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  setAction(event, action: {}) {
    this.current_sub_action = null;
    this.sub_actions = null;

    this.languages = null;
    this.current_language = null;

    this.code = null;

    //if (event.isUserInput) {
      console.log(event);
      this.current_action = action;
      this.updateSubActions();
    //}
  }
  setSubAction(event, sub_action: {}) {
    this.languages = null;
    this.current_language = null;

    this.code = null;

    if (event.isUserInput) {
      console.log(event);
      this.current_sub_action = sub_action;
      this.updateLanguages();
    }
  }

  setLanguage(event, template: {}) {
    if (event.isUserInput) {
      console.log(event);
      this.current_language = template;
      this.editorOptions.language = this.current_language["language"].toLowerCase();
    }
  }

  updateLanguages() {
    this.isLoading = true;

    console.log("Updating");
    console.log(this.current_sub_action);

    this.apiService.getTemplates(
      this.current_sub_action["_id"],
      languages => {
        this.isLoading = false;
        this.languages = languages;
        console.log(languages);
      },
      error => {
        this.isLoading = false;
        alert(error);
        console.log(error);
      }
    );
  }

  updateSubActions() {
    this.isLoading = true;
    console.log("Updating");
    console.log(this.current_action);

    this.apiService.getSubActions(
      this.current_action["_id"],
      sub_actions => {
        this.isLoading = false;
        this.sub_actions = sub_actions;
        console.log(sub_actions);
      },
      error => {
        this.isLoading = false;
        alert(error);
        console.log(error);
      }
    );
  }

  onActionSelect(e) {
    console.log(e);
  }
  retreiveActions() {
    this.apiService.getActions(
      actions => {
        this.isLoading = false;
        this.actions = actions;
        console.log(actions);
      },
      error => {
        this.isLoading = false;
        alert(error);
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.retreiveActions();
  }

  showSnackBar(msg: String){
    this._snackBar.openFromComponent(SnackBarTempComponent, {
      duration: 5 * 1000,
      data: {msg: msg}
    });
  }

  addAction() {
    const dialogRef = this.dialog.open(ActionModalDialog, {
      width: '500px',
      data: {
        edit: false,
        _id: null,
        name: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Back :)");
      if(result)
      {
        this.showSnackBar("Successfully added Action!");
        this.retreiveActions();
       // this.setAction(null, result);
      }
      else
      {
        this.showSnackBar("Sorry, some error occured!");
      }
    });
  }

  editAction(act) {

    const dialogRef = this.dialog.open(ActionModalDialog, {
      width: '500px',
      data: {
        edit: true,
        _id: act["_id"],
        name: act["name"]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.showSnackBar("Successfully edited Action!");
        this.retreiveActions();
      }
      else
      {
        this.showSnackBar("Sorry, some error occured!");
      }
      console.log("Back :)");
    });

  }
  deleteAction(action)
  {
    this.apiService.deleteAction(
      action._id,
      (resp)=>{
        this.showSnackBar("Successfully Deleted Action!");
        this.retreiveActions();
        this.current_action = null;
      },
      (err) => {
        console.log(err);
      });
  }

addSubAction() {
    const dialogRef = this.dialog.open(SubActionModalDialog, {
      width: '500px',
      data: {
        edit: false,
        _id: null,
        name: null,
        action_id: this.current_action["_id"]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Back :)");
      if(result)
      {
        this.showSnackBar("Successfully added Sub-Action!");
        this.retreiveActions();
       // this.setAction(null, result);
      }
      else
      {
        this.showSnackBar("Sorry, some error occured!");
      }
    });
  }

  editSubAction(act) {

    const dialogRef = this.dialog.open(SubActionModalDialog, {
      width: '500px',
      data: {
        edit: true,
        _id: act["_id"],
        name: act["name"]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.showSnackBar("Successfully edited Sub-Action!");
        this.current_sub_action = result;
        console.log(result);

        this.updateLanguages();

        //this.retreiveActions();
      }
      else
      {
        this.showSnackBar("Sorry, some error occured!");
      }
      console.log("Back :)");
    });

  }
  deleteSubAction(action)
  {
      this.apiService.deleteSubAction(
        action._id,
        (resp)=>{
          this.showSnackBar("Successfully Deleted Sub-Action!");
          //this.retreiveActions();
          this.current_sub_action = null;
        },
        (err) => {
          console.log(err);
        });
  }


addTemplate() {
  const dialogRef = this.dialog.open(TemplateModalDialog, {
    width: '500px',
    data: {
      edit: false,
      _id: null,
      language: null,
      template: null,
      instructions: null,
      action_name: this.current_action["name"],
      sub_action_name: this.current_sub_action["name"]
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log("Back :)");
    if(result)
    {
      this.showSnackBar("Successfully added Template!");
      this.retreiveActions();
     // this.setAction(null, result);
    }
    else
    {
      this.showSnackBar("Sorry, some error occured!");
    }
  });
}

editTemplate(act) {

  const dialogRef = this.dialog.open(TemplateModalDialog, {
    width: '500px',
    data: {
      edit: true,
      _id: act["_id"],
      language: act["language"],
      template: act["template"],
      instructions: act["instructions"],
      action_name: this.current_action["name"],
      sub_action_name: this.current_sub_action["name"]
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result)
    {
      this.showSnackBar("Successfully edited Template!");
      this.current_sub_action = result;
      console.log(result);
      this.updateLanguages();
      //this.retreiveActions();
    }
    else
    {
      this.showSnackBar("Sorry, some error occured!");
    }
    console.log("Back :)");
  });

}

deleteTemplate(action)
{
    this.apiService.deleteTemplate(
      action._id,
      (resp)=>{
        this.showSnackBar("Successfully Deleted Sub-Action!");
        //this.retreiveActions();
        this.current_sub_action = null;
      },
      (err) => {
        console.log(err);
      });
}

  copy() {
    //alert(this.code);
  }
  /*
    Coding-Area
    */
  editorOptions = {
    theme: "vs-dark",
    language: "javascript"
  };

  instructions: string = null;
  code: string = null;

  options = {
    theme: "vs-dark"
  };
}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: blue;
    }
  `],
})
export class SnackBarTempComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {}){

  }
}
