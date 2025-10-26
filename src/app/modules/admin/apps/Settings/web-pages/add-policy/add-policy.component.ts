import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SettingsService } from '../../settings.service';

@Component({
  providers: [ConfirmationService, MessageService],
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent implements OnInit {
  addForm!: FormGroup;
  public policyName: any;
  public content: string;
  policyType: string;
  constructor(private messageService: MessageService, public formBuilder: FormBuilder,
    private aroute: ActivatedRoute, private settingService: SettingsService,
    private router: Router) { }

  ngOnInit(): void {
    this.aroute.queryParams.subscribe((params) => {
      this.policyName = params.name;
      console.log(this.policyName);

    });
    this.addForm = this.formBuilder.group({
      policyText: ['', [Validators.required]],
    });
  }
  addPolicy(): void {
    console.log(this.content);
    this.getPolicyType();
    this.submitOffer();
  }

  submitOffer(): void {

    this.settingService.addPolicy(this.content, this.policyType).subscribe({
      next: (response) => {
        this.router.navigate(['apps/Settings/web-pages']);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });

      }
    });
  }

  getPolicyType(): void {
    switch (this.policyName) {
      case 'Terms and conditions':
        this.policyType = 'TERMS_CONDITIONS';
        break;
      case 'Privacy policy':
        this.policyType = 'PRIVACY_POLICY';
        break;
      case 'Refund policy':
        this.policyType = 'REFUND_POLICY';
        break;
      case 'Cancellation policy':
        this.policyType = 'CANCELLATION_POLICY';
        break;
      case 'Shipping policy':
        this.policyType = 'SHIPPING_POLICY';
        break;
      case 'Return policy':
        this.policyType = 'RETURN_POLICY';
        break;
    }
  }
  cancel(): void{
    this.addForm.reset();
    this.router.navigate(['apps/Settings/web-pages']);
  }
}
