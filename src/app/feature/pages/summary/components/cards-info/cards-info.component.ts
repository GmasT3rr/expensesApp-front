import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-info',
  templateUrl: './cards-info.component.html',
  styleUrls: ['./cards-info.component.css']
})
export class CardsInfoComponent implements OnChanges {

  @Input() total:string = ''
  @Input() difference:any = 0
  @Input() icon:string = ''
  @Input() description:string = ''
  public iconPath = ''
  public differenceIcon = ''
  public diff = false
  constructor() { }

  ngOnChanges(): void {
      this.iconPath = `assets/svgs/icons/${this.icon}.svg`
      if(this.difference > 0){
        this.differenceIcon = `assets/svgs/icons/arrow-up.svg`
        this.diff = true
      } else{
        this.differenceIcon = `assets/svgs/icons/arrow-down.svg`
        this.diff = false

      }
  }

}
