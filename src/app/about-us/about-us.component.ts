import { Component, OnInit } from '@angular/core';
import { TableService } from '../service/table.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  constructor(private tableService: TableService){}
  public aboutData: any

  ngOnInit(): void {
      this.getTableData()
  }

  getTableData(){
    this.tableService.getImageData('https://vega-backend-f4m6.onrender.com/about/all').subscribe(res =>{
     this.aboutData = res
    },err =>{
      console.log(err);
    });
  }

  onSubmit(id: any){
    console.log(id);
    this.tableService.updatetoDb(this.aboutData[id],'https://vega-backend-f4m6.onrender.com/about/update/').subscribe(() =>{
      this.getTableData()
    },err =>{
      console.log(err);
    })
  }

}
