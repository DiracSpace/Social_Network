import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const template = /*html*/`
<p
  *ngIf="showLabel"
  class="font-weight-bold text-wrap m-0 mb-2"
  [ngStyle]="labelStyle"
  [ngClass]="labelClass">
  {{ label }}
</p>

<input
  *ngIf="!isTextArea"
  [type]="type"
  class="form-control"
  [placeholder]="placeholder"
  [readonly]="readonly"
  [ngStyle]="textInputStyle"
  [ngClass]="textInputClass"
  [(ngModel)]="value"
  (change)="valueChange.emit(value)"
  (keyup.enter)="enter.emit()"
/>

<textarea
  *ngIf="isTextArea"
  type="text"
  class="form-control"
  [ngStyle]="textInputStyle"
  [(ngModel)]="value"
  (change)="valueChange.emit(value)"
  rows="2">
</textarea>
`;

const styles = [/*css*/`
.form-control:focus {
  color: #999999;
  border-color: #303134;
  box-shadow: inset 0 1px 1px rgb(20, 18, 20), 0 0 8px rgb(20, 18, 20);
}

::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color:    #999999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
 color:    #999999;
 opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
 color:    #999999;
 opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color:    #999999;
}
::-ms-input-placeholder { /* Microsoft Edge */
 color:    #999999;
}

::placeholder { /* Most modern browsers support this now. */
 color:    #999999;
}
`];

@Component({
  selector: 'app-text-field',
  template,
  styles
})
export class TextFieldComponent implements OnInit {

  private _value: string;
  get value() { return this._value }
  @Input() set value(value: string) { this._value = value }
  @Output() valueChange = new EventEmitter<string>();

  @Input() isTextArea: boolean = false;
  @Input() showLabel: boolean = true;
  @Input() readonly: boolean = false;
  @Input() placeholder: string = "";
  @Input() type: string = "text";
  @Input() label: string;

  @Output() enter = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  
  get textInputClass() {
    return {

    };
  }

  get textInputStyle() {
    return {
      "background-color": "#3a3b3c",
      "border": "none"
    };
  }

  get labelStyle() {
    return {
      "color": "#999999"
    };
  }

  get labelClass() {
    return {

    };
  }
}
