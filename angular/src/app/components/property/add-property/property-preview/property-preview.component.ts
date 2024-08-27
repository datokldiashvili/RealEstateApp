import {
  Component,
  TemplateRef,
  Input,
  ViewChild,
  OnInit,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPropertyBase } from 'src/app/model/property/iproperty-base';

@Component({
  selector: 'app-property-preview',
  templateUrl: './property-preview.component.html',
  styleUrls: ['./property-preview.component.css'],
})
export class PropertyPreviewComponent implements OnChanges, OnInit {
  modalRef?: BsModalRef;
  @Input() propertyView!: IPropertyBase;
  @Input() clickModal!: number; // undefined so that initially the modal is not triggered
  @ViewChild('TOpenModal', { static: true }) TOpenModal!: ElementRef; // static element is loaded before any other elements

  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {}

  ngOnChanges(change: SimpleChanges): void {
    if (this.clickModal === 1 || this.clickModal === 2) {
      this.TOpenModal.nativeElement.click();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
