import { Component,Input,OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notecard',
  templateUrl: './notecard.component.html',
  styleUrls: ['./notecard.component.scss']
})
export class NotecardComponent implements OnInit{
    @Input() title !: string;
    @Input() body !: string;
    @Input() link !: string;
    @Output('delete') deleteEvent:EventEmitter<void> = new EventEmitter<void>();
    constructor() { }
    ngOnInit(): void {
        
    }
    onXButtonClick(){
      this.deleteEvent.emit();
   }
}
