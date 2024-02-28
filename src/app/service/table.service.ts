import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService { 
  constructor(private http: HttpClient) {  }
  getImageData(url: string){
    return this.http.get(url);
  }

  uploadToCloudinary(file:any, callUrl:string){
    let formParams = new FormData();
    formParams.append("file",file);
    formParams.append("upload_preset", "ml_default");
    return this.http.post(callUrl,formParams);
  }

  updatetoDb(data:any, patchUrl:any){
  return this.http.patch(patchUrl+data._id ,data);
  }
 
  deleteData(id:any){
    // return this.http.delete();
  }
  
}

