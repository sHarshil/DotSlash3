import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { WelcomeComponent } from "./components/welcome.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { CodingComponent } from "./components/code/coding.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { DashboardComponent, SnackBarTempComponent } from './components/dashboard/dashboard.component';
import { ActionModalDialog } from './components/dialog/action/action.component';
import { SubActionModalDialog } from './components/dialog/subaction/sub-action.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CodingComponent,
    DashboardComponent,
    ActionModalDialog,
    SnackBarTempComponent,
    SubActionModalDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,

    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  entryComponents:[ActionModalDialog, SnackBarTempComponent,SubActionModalDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
