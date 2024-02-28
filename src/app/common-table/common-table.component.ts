import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '../service/table.service';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit{
  selectedFile : any;
  scope : string = ''
  public isTitle : boolean = false
  public isText : boolean = false
  public isLink : boolean = false
  public isImage : boolean = false
  public isAuthorName : boolean = false
  public isCity : boolean = false
  public isCategory :boolean = false
  public isTable : boolean = true
  public tableData:any = []
  isLoading: boolean = false
  isaction:boolean = false
  selectedCategory:any
  Categorys :any = ["Jewellery-1","Jewellery-2","Jewellery-3","Jewellery-4","Jewellery-5"]

  constructor(private route: ActivatedRoute,
   private tableService: TableService) { }

  ngOnInit(): void {
      this.getTableData()
  }



  getTableData(){
    this.tableService.getImageData(this.setUrlFromScope(this.route.snapshot.routeConfig?.path,false)).subscribe(res =>{
     this.tableData = res
    },err =>{
      console.log(err);
    });
  }

  private setUrlFromScope(scope: any, isUpdateUrl:boolean): string{
    let url = ''
    let updateUrl = ''
    this.scope = scope
    switch (scope) {
      case 'home':
        url = 'https://vega-backend-f4m6.onrender.com/all/'
        updateUrl = 'https://vega-backend-f4m6.onrender.com/update/'
        this.isTitle = true
        this.isImage = true
        break;
      case 'portfolio-image':
        url = 'https://vega-backend-f4m6.onrender.com/portfolio/all/'
        updateUrl = 'https://vega-backend-f4m6.onrender.com/portfolio/update/'
        this.isImage = true
        this.isCategory = true
        break;
      case 'portfolio-category':
        url = 'https://vega-backend-f4m6.onrender.com/portfolio/all/'
        this.isImage = true
        this.isTable=false
        break;
      case 'portfolio-video':
        url = 'https://vega-backend-f4m6.onrender.com/link/all/'
        updateUrl = 'https://vega-backend-f4m6.onrender.com/link/update/'
        this.isTitle = true
        this.isText = true
        this.isLink = true
        break;
      case 'testimonial':
        url = 'https://vega-backend-f4m6.onrender.com/testimonial/all/'
        updateUrl = 'https://vega-backend-f4m6.onrender.com/testimonial/update/'
        this.isTitle = true
        this.isText = true
        this.isAuthorName = true 
        this.isCity = true 
        break;
      case 'our-clients':
        url = 'https://vega-backend-f4m6.onrender.com/clients/all/'
        updateUrl = 'https://vega-backend-f4m6.onrender.com/clients/update/'
        this.isImage = true
        break;
      case 'service':
        url = 'https://vega-backend-f4m6.onrender.com/service/all/'
        updateUrl = 'https://vega-backend-f4m6.onrender.com/service/update/'
        this.isTitle = true
        this.isText = true
        this.isImage = true
        break;
      case 'blogs':
        url = 'https://vega-backend-f4m6.onrender.com/blog/all'
        updateUrl = 'https://vega-backend-f4m6.onrender.com/blogs/update/'
        this.isTitle = true
        this.isText = true
        this.isImage = true
        break;
    }
    if(isUpdateUrl){
     return updateUrl;
    }else{
      return url;
    }
  }

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

updateData(url:any, id:any){
  this.tableData[id].image = url;
  this.tableService.updatetoDb(this.tableData[id], this.setUrlFromScope(this.route.snapshot.routeConfig?.path,true)).subscribe(() =>{
    this.isLoading = false;
    this.getTableData()
  },err =>{
    console.log(err);
  })
}

onSubmit(id:number){
  if(!this.isLoading){
    this.isLoading = true
    if(this.selectedFile){
      this.tableService.uploadToCloudinary(this.selectedFile, 'https://api.cloudinary.com/v1_1/dh7jypbat/image/upload/')
      .subscribe((res:any) => {
        this.updateData(res.url, id);
      },err =>{
        console.log(err);
      })
    }else{
      this.updateData('', id);
    }
  }
}

onDelete(index:number){
  // this.tableService.deleteData(index).subscribe(res =>{
  //   this.getTableData()
  // }, err =>{
  //   console.log(err);
  // })
}

onOptionChange(event:any){
  console.log("dfkdf");
  
  console.log(event);
  
}

addEmptyRow() {
  let emptyObject 
  switch (this.route.snapshot.routeConfig?.path) {
    case 'home':
      emptyObject = { title: '', text: '' ,image:''}
      break;
    case 'portfolio-image':
      emptyObject = { title: '',image:''}
      break;
    case 'portfolio-video':
      emptyObject = { title: '', text: '' ,link:''}
      break;
    case 'testimonial':
      emptyObject = { title: '', text: '' ,autherName:'',city:''}
      break;
    case 'service':
      emptyObject = { title: '', text: '' ,image:''}
      break;
    case 'blogs':
      emptyObject = { title: '', text: '' ,image:''}
      break;
  }
  this.tableData.push(emptyObject); 
}
}







const obj = {
 2: "two",
 4: "four",
 1: "one",
 3: "three"
}