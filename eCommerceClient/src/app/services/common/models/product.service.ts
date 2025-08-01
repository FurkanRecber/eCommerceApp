import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_products';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Product_Image } from '../../../contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }
  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      },(errorResponse: HttpErrorResponse) => {
        const validationErrors = errorResponse.error;

        let message = "";

        // validationErrors bir object, bu nedenle Object.entries() kullanmalıyız
        for (let [field, errors] of Object.entries(validationErrors)) {
          (errors as string[]).forEach(err => {
            message += `${err}<br>`;
          });
        }

        if (errorCallBack) errorCallBack(message);
      });
  }

  async read(page: number = 0, size: number = 5,successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) : Promise< {totalCount: number, products : List_Product[] }>{
    const promiseData : Promise<{ totalCount: number; products : List_Product[] }> = this.httpClientService.get< { totalCount: number, products : List_Product[] }>({
      controller : "products",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id : string){
    const deleteObservable : Observable<any> = this.httpClientService.delete<any>({
      controller : "products" 
    }, id);

    await firstValueFrom(deleteObservable)
  }

  async readImages(id: string, successCallBack?: () => void): Promise<List_Product_Image[]> {  //Promise .net'teki Task gibi
    const getObservable : Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      controller: "products",
      action: "getproductimages" 
    }, id);

    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();

    return images;
  }

  async deleteImage(productId: string, imageId: string, successCallBack?: () => void): Promise<void> {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products",
      action: "deleteproductimage",
      queryString: `imageId=${imageId}`
    }, productId)

    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}
