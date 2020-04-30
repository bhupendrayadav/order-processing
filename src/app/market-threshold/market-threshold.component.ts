import { Component, OnInit } from '@angular/core';
import { MarketThresholdService } from '../service/market-threshold.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

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

function rangeValidation(from, to): ValidatorFn {
  return (form: AbstractControl): { [key: string]: boolean } | null => {
    let _fromValue = form.get(from);
    let _toValue = form.get(to);

    if (Number(_fromValue.value) < Number(_toValue.value)) {
      return null;
    }
    if (parseInt(_toValue.value)) {
      _toValue.setErrors({ validateRange: true });
    }
    return { validateRange: true };
  }
}

@Component({
  selector: 'app-market-threshold',
  templateUrl: './market-threshold.component.html',
  styleUrls: ['./market-threshold.component.css']
})
export class MarketThresholdComponent implements OnInit {
  client: string = '';
  page = 1;
  pageSize = 5;
  totalRecords: number;
  mvtData: Array<ThresholdValue> = [];
  modalReference: NgbModalRef;
  deleteModalReference: NgbModalRef;

  isLoading = false;
  isFormSubmitted = false;
  mvtForm: FormGroup;
  selectedRecord: ThresholdValue;
  selectedRecordIndex: number;
  submitButtonLabel: string = 'Save';
  editableData: any;
  isIncludeRepdel: boolean = false;
  tableTotalRecords: string = '';

  constructor(private marketThresholdService: MarketThresholdService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getMarketThresholds();
  }

  /**
   * @description Method to get Market Threshold List
   * @author Krunal
   * @date 2020-04-28
   * @memberof MarketThresholdComponent
   */
  getMarketThresholds() {
    this.mvtData = [];
    this.isLoading = true;
    const payload = `client=${this.client}&page=${this.page}&pageSize=${this.pageSize}`;
    this.marketThresholdService.getMarketThresholdList(payload).subscribe(res => {
      if (res && res['items']) {
        this.mvtData = res['items'];
        this.totalRecords = res['totalrows'];
        this.getTableTotalRecords();
        this.isLoading = false;
      }
    });
  }

  /**
   * @description Method to generate Table Total Records
   * @author Krunal Shriram Sakharkar
   * @date 2020-04-30
   * @memberof MarketThresholdComponent
   */
  getTableTotalRecords() {
    const _fromItem = ((this.page - 1) * this.pageSize) + 1;
    const _toItem = ((this.page * this.pageSize) > this.totalRecords ? this.totalRecords : (this.page * this.pageSize))
    this.tableTotalRecords = `${_fromItem} - ${_toItem} of ${this.totalRecords} items`;
  }

  /**
   * @description Method to reset List 
   * @author Krunal
   * @date 2020-04-28
   * @memberof MarketThresholdComponent
   */
  onRefresh() {
    this.page = 1;
    this.pageSize = 5;
    this.getMarketThresholds();
  }

  onCheckboxClick(event: any) {
    this.isIncludeRepdel = event.target.checked;
  }

  addNewRecord(content, data?: ThresholdValue) {
    this.isFormSubmitted = false;
    this.submitButtonLabel = 'Save';
    this.mvtForm = this.fb.group({
      mkt_Val_From: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      mkt_Val_To: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      var_Threshold: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    },
      { validator: rangeValidation('mkt_Val_From', 'mkt_Val_To') });
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
    this.selectedRecordIndex = null;
    this.selectedRecord = null;
    this.mvtForm.reset();
  }

  onSubmit() {
    this.isFormSubmitted = true;
    this.mvtForm.value.mkt_Val_From = parseInt(this.mvtForm.value.mkt_Val_From);
    this.mvtForm.value.mkt_Val_To = parseInt(this.mvtForm.value.mkt_Val_To);
    this.mvtForm.value.var_Threshold = parseInt(this.mvtForm.value.var_Threshold);

    if (this.mvtForm.valid) {
      if (this.selectedRecordIndex !== null) {
        this.marketThresholdService.editThreshold(this.mvtForm.value, this.editableData).subscribe(res => {
          this.closeModal();
          this.getMarketThresholds();
          this.selectedRecordIndex = null;
          this.selectedRecord = null;
        });
      } else {
        this.marketThresholdService.addThreshold(this.mvtForm.value).subscribe(res => {
          this.closeModal();
          this.getMarketThresholds();
        });
      }
    }
  }

  openDeleteModal(deleteModal, row) {
    this.selectedRecord = row;
    this.deleteModalReference = this.modalService.open(deleteModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  onDelete() {
    console.log('this.selectedRecord', this.selectedRecord);
    this.marketThresholdService.deleteThresholdByID(this.selectedRecord['mkt_Val_Threshold_Id']).subscribe(res => {
      this.closeDeleteModal();
      this.getMarketThresholds();
    });
  }

  closeDeleteModal() {
    this.deleteModalReference.close();
    this.selectedRecordIndex = null;
    this.selectedRecord = null;
  }

  onEdit(threshold: any, content, index) {
    this.selectedRecordIndex = ((this.page - 1) * this.pageSize) + (index);
    this.selectedRecord = threshold;
    this.editableData = threshold;
    this.addNewRecord(content, this.selectedRecord);
  }

  /**
   * @description Method will get called on pagination change
   * @author Krunal
   * @date 2020-04-28
   * @param {*} event
   * @memberof MarketThresholdComponent
   */
  onPageChange(event) {
    this.page = event;
    this.getMarketThresholds();
  }

  /**
   * @description  Method will get called on change of No Of List Records
   * @author Krunal
   * @date 2020-04-28
   * @param {*} event
   * @memberof MarketThresholdComponent
   */
  onNoOfListRecordsChange(event) {
    this.page = 1;
    this.pageSize = event;
    this.getMarketThresholds();
  }
}
