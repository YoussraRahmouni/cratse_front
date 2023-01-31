import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.css']
})
export class ImputationComponent implements OnInit {

  submitted: Boolean = false;
  form = new FormGroup({
    dailyChargeImputation: new FormControl('', [
      Validators.required,
      Validators.pattern('^(0|0\.25|0\.5|0\.75|1)$'),
    ]),
  });

  get dailyChargeImputation() {
    return this.form.get('dailyChargeImputation');
  }

  constructor(public activeModal: NgbActiveModal) { }

  arg: any;

  ngOnInit(): void {
  }

  submitForm(arg: any) {
    this.submitted = true;
    if (this.form.valid) {
      console.log('dailyChargeImputation  ' + this.form.value.dailyChargeImputation);
      console.log('date ' + arg.dateStr);
      console.log('projectId  ' + arg.resource.id);
      this.activeModal.close('Close click');
      // the POST api call should be handled here : call of the imputation service
    }
  }

}
