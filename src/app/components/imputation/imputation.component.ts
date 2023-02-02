import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImputationService } from 'src/app/services/imputation.service';

@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.css']
})
export class ImputationComponent implements OnInit {

  submitted: Boolean = false;

  idProject: any;
  dailyCharge: any;
  date: any;

  form = new FormGroup({
    dailyChargeImputation: new FormControl('', [
      Validators.required,
      Validators.pattern('^(0|0\.25|0\.5|0\.75|1)$'),
    ]),
  });

  get dailyChargeImputation() {
    return this.form.get('dailyChargeImputation');
  }

  constructor(public activeModal: NgbActiveModal, private imputationService: ImputationService) { }

  arg: any;

  ngOnInit(): void {
  }

  submitForm(arg: any) {

    this.submitted = true;

    if (this.form.valid) {

      console.log('projectId  ' + arg.resource.id);
      this.idProject = arg.resource.id;

      console.log('dailyChargeImputation  ' + this.form.value.dailyChargeImputation);
      this.dailyCharge = this.form.value.dailyChargeImputation;

      console.log('date ' + arg.dateStr);
      this.date = arg.dateStr;
      // Imputation service to call Post method 
      this.imputationService.addImputation(this.idProject,this.dailyCharge,this.date).subscribe(
        result => console.log('Imputation added successfully', result),
        error => console.error('Error while adding imputation', error)
        // take into consideration later that when adding the imputation it will not be updated in the view
        // Handle that later 
      );

      this.activeModal.close('Close click');
      // the POST api call should be handled here : call of the imputation service
    }
  }

}
