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
    this.marketThresholdService.getMarketThreshold().subscribe(res => {
      this.mvtData = res;
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
      MKT_VAL_FROM: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      MKT_VAL_TO: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      VAR_THRESHOLD: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
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
      } else {
        this.mvtData.push(this.mvtForm.value);
        this.marketValueThreshold.push(this.mvtForm.value);
      }
      this.closeModal();
    }
  }

  onDelete(index) {
    this.mvtData.splice(index, 1);
    this.marketValueThreshold.splice(index, 1);
  }

  onEdit(content, index) {
    this.selectedRecordIndex = ((this.page - 1) * this.pageSize) + (index);
    this.selectedRecord = this.mvtData[this.selectedRecordIndex];
    // this.selectedRecord = _value;
    this.addNewRecord(content, this.selectedRecord);
  }

}