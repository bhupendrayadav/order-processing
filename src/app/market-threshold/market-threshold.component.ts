import { Component, OnInit } from '@angular/core';
import { MarketThresholdService } from '../service/market-threshold.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ThresholdValue {
  MKT_VAL_FROM: number;
  MKT_VAL_TO: number;
  VAR_THRESHOLD: number;
  REPDEL_INCL: boolean;
  Client: string;
  CREATED_ON?: any;
  CREATED_BY?: any;
  UPDATED_BY?: any;
  UPDATED_ON?: any;
}

@Component({
  selector: 'app-market-threshold',
  templateUrl: './market-threshold.component.html',
  styleUrls: ['./market-threshold.component.css']
})
export class MarketThresholdComponent implements OnInit {
  page = 1;
  pageSize = 3;
  mvtData: Array<ThresholdValue> = [];
  modalReference: NgbModalRef;

  isFormSubmitted = false;
  mvtForm: FormGroup;
  selectedRecord: ThresholdValue;
  selectedRecordIndex: number;
  submitButtonLabel: string = 'Add';
  editableData: any;

  constructor(private marketThresholdService: MarketThresholdService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getMarketThresholds();
  }

  get marketValueThreshold(): ThresholdValue[] {
    if (this.mvtData && this.mvtData.length) {
      return this.mvtData
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }

  getMarketThresholds() {
    // this.marketThresholdService.getMarketThreshold().subscribe(res => {
    //   this.mvtData = res;
    // });

    this.marketThresholdService.getMarketThresholdList().subscribe(res => {
      if (res && res.items) {
        this.mvtData = res.items;
      }
    });
  }

  onRefresh() {
    this.page = 1;
    this.pageSize = 3;
    this.getMarketThresholds();
  }

  addNewRecord(content, data?: ThresholdValue) {
    this.isFormSubmitted = false;
    this.submitButtonLabel = 'Add';
    this.mvtForm = this.fb.group({
      mkt_Val_From: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      mkt_Val_To: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      var_Threshold: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      client: 'Test',
      repdel_Incl: 0,
      created_By: 'Test'
    });
    if (data) {
      this.submitButtonLabel = 'Update';
      this.mvtForm.patchValue(data);
    } else {
      this.selectedRecordIndex = null;
      this.selectedRecord = null;
    }
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  closeModal() {
    this.modalReference.close();
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.mvtForm.valid) {
      if (this.selectedRecordIndex !== null) {
        this.mvtData[this.selectedRecordIndex] = this.mvtForm.value;
        this.marketValueThreshold[this.selectedRecordIndex] = this.mvtForm.value;
        this.selectedRecordIndex = null;
        this.selectedRecord = null;

        this.marketThresholdService.editThreshold(this.editableData.mkt_Val_Threshold_Id, this.mvtForm.value).subscribe(res => {
          console.log('success');
          this.getMarketThresholds();
        });
      } else {
        this.marketThresholdService.addThreshold(this.mvtForm.value).subscribe(res => {
          console.log('success');
          this.getMarketThresholds();
        });
        this.mvtData.push(this.mvtForm.value);
        this.marketValueThreshold.push(this.mvtForm.value);
      }
      this.closeModal();
    }
  }

  onDelete(threshold: any) {
    this.marketThresholdService.deleteThresholdByID(threshold.mkt_Val_Threshold_Id).subscribe(res => {
      this.getMarketThresholds();
    });
  }

  onEdit(threshold: any, content, index) {
    console.log(content);

    this.selectedRecordIndex = ((this.page - 1) * this.pageSize) + (index);
    this.selectedRecord = this.mvtData[this.selectedRecordIndex];
    this.editableData = threshold;
    // this.selectedRecord = _value;
    this.addNewRecord(content, this.selectedRecord);
  }

}
