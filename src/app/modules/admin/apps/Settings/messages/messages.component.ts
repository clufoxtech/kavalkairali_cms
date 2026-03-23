import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel/public_api';

@Component({
  providers: [ConfirmationService, MessageService],
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  data: any;
  dropdownOptions: any[];
  perPage: number = 10;
  page: number = 0;
  totalRecords: number = 0;
  public messageslist: Array<any>;
  public searchMessageslist: Array<any>;
  closeForm!: FormGroup;
  selectedMessage: any;
  display: boolean = false;
  editdisplay: boolean = false;
  AddForm!: FormGroup;
  EditForm!: FormGroup;
  @ViewChild('op', { static: true }) op: OverlayPanel;
  editMessageTitle: any;
  editMessageBody: any;
  constructor(public formBuilder: FormBuilder, public settingservice: SettingsService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.data = [{ 'orderno': 'DCB1012', 'product': 'Chemmen', 'format': 'Audio', 'readers': 15, 'duration': '20 hrs 10min', 'revenue': '120 INR', 'customer': ' Jhon', 'amount': '150 INR', 'date': '22nd August 2022', 'platform': 'web', 'payment': 'cash', 'warehouse': 'ERK EDP', 'edd': '06-06-2022', 'status': 'processing' }];
    this.AddForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
    this.EditForm = this.formBuilder.group({
      edittitle: ['', [Validators.required]],
      editbody: ['', [Validators.required]]
    });
    this.dropdownOptions = [
      { label: 'CLOSED', value: 'CLOSED' },
      { label: 'OPEN', value: 'OPEN' }
    ];
    this.GetMessages();
    console.log(this.messageslist);
  }
  GetMessages() {
    this.settingservice.getMessages(this.page, this.perPage).subscribe((response) => {
      this.messageslist = new Array<any>();
      this.messageslist = response._embedded.messages;
      this.totalRecords = response.page.totalElements;
      console.log(this.messageslist);
    });

  }
  LazyMessages(event) {
    this.page = event.first / event.rows;
    this.perPage = event.rows;
    this.GetMessages();

  }
  newMessage() {
    this.display = true;
  }
  addMessage() {
    this.settingservice.addMessage(this.AddForm.value.title, this.AddForm.value.body).subscribe((response) => {
      this.GetMessages();
    });
    this.display = false;
    this.AddForm.reset();
  }
  show(event, product) {
    this.selectedMessage = product;
    this.op.show(event);
  }
  edit() {
this.editMessageTitle = this.selectedMessage.title;
this.editMessageBody = this.selectedMessage.description;
  console.log(this.selectedMessage);
    this.editdisplay = true;
  }
  editMessage() {
    this.settingservice.editMessage(this.selectedMessage.id, this.EditForm.value.edittitle, this.EditForm.value.editbody).subscribe((response) => {
      this.GetMessages();
    });
    this.editdisplay = false;
  }
  Cancel() {
    this.display = false;
    this.AddForm.reset();
  }
  editCancle() {
    this.editdisplay = false;
    this.EditForm.reset();
  }
  deleteMessage() {
    console.log(this.selectedMessage);
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.settingservice.deleteMessage(this.selectedMessage.id).subscribe(
          {
            next: (response) => {
              this.GetMessages();
            },
            error: (err) => {
              this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
              //this.Cancel();
            }
          })

      },
      reject: () => {
        //Actual logic to perform a confirmation
      }
    });
  }

  get getControl() {
    return this.AddForm.controls;
  }
  get getEditControl() {
    return this.EditForm.controls;
  }
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }


  clear() {
    this.searchInputControl.setValue('');
    this.GetMessages();
  }
}
