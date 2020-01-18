import { Component, OnInit } from "@angular/core";
import { DiffEditorModel } from "ngx-monaco-editor";

@Component({
  selector: "app-coding-area",
  templateUrl: "./coding-area.component.html",
  styleUrls: ["./coding-area.component.scss"]
})
export class CodingAreaComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  editorOptions = { theme: "vs-dark", language: "javascript" };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  options = {
    theme: "vs-dark"
  };
  originalModel: DiffEditorModel = {
    code: "heLLo world!",
    language: "text/plain"
  };

  modifiedModel: DiffEditorModel = {
    code: "hello orlando!",
    language: "text/plain"
  };
}
