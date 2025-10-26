import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { environment } from 'environments/environment';
import { BookDetails } from './productModel/bookdetails';
import { Observable } from 'rxjs';
import { booklist } from './productModel/bookaddlist';
import { BookEdit } from './productModel/BookEdit';
import { AuthService } from 'app/core/auth/auth.service';
import { contributorSearch, customerSearch, searchlist } from './productModel/searchList';
import { wareHouse } from './productModel/wareHouse';
import { Zone } from './productModel/zone';
import { Weight } from './productModel/weight';
import { ShippingCharges } from './productModel/shippingCharges';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public list: BookDetails;
  baseUrl: string = environment.baseUrl;
  header: any = '';
  constructor(private httpClient: HttpClient, public authservice: AuthService) { }
  setBookData(data: BookDetails) {
    this.list = data;
  }
  //Contributor
  getContributor(page: number, size: number): Observable<any> {
    this.header = new HttpHeaders({ 'Authorization': `Bearer ` + this.authservice.accessToken });
    return this.httpClient.get(this.baseUrl + '/contributors?' + '&page=' + page + '&size=' + size, { headers: this.header, withCredentials: true });

  }
  addContributor(name: string, contributortype: any[], photo: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/contributors', { 'name': name, 'contributorTypes': contributortype, 'imageId': photo }, { headers: this.header, withCredentials: true });

  }
  editContributor(id: number, name: string, contributortype: any[], photo: any): Observable<any> {
    return this.httpClient.patch(this.baseUrl + '/contributors/' + id, { 'name': name, 'contributorTypes': contributortype, 'imageId': photo }, { headers: this.header, withCredentials: true });

  }
  deleteContributor(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/contributors/' + id, { headers: this.header, withCredentials: true });

  }
  getContributorByType(type: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/contributors/search/byType?type=' + type, { headers: this.header, withCredentials: true });

  }
  //publisher
  getPublisher(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/publishers', { headers: this.header, withCredentials: true });

  }
  addPublisher(name: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/publishers', { 'name': name }, { headers: this.header, withCredentials: true });

  }
  editPublisher(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/publishers/' + id, { 'name': name }, { headers: this.header, withCredentials: true });

  }
  deletePublisher(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/publishers/' + id, { headers: this.header, withCredentials: true });

  }
  //stock
  importStock(file: any): Observable<any> {
    var formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl + '/import/print/stock', formData, { headers: this.header, withCredentials: true });
  }

  updateStock(bookId: number,stock: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/books/'+bookId+'/print/'+stock, { headers: this.header, withCredentials: true });
  }
  //imprint
  getImprint(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/imprints', { headers: this.header, withCredentials: true });

  }
  addImprint(name: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/imprints', { 'name': name }, { headers: this.header, withCredentials: true });

  }
  editImprint(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/imprints/' + id, { 'name': name }, { headers: this.header, withCredentials: true });

  }
  deleteImprint(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/imprints/' + id, { headers: this.header, withCredentials: true });

  }
  //Condition
  getCondition(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/bookConditions', { headers: this.header, withCredentials: true });

  }
  addCondition(name: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/bookConditions', { 'name': name }, { headers: this.header, withCredentials: true });

  }
  editCondition(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/bookConditions/' + id, { 'name': name }, { headers: this.header, withCredentials: true });

  }
  deleteCondition(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/bookConditions/' + id, { headers: this.header, withCredentials: true });

  }
  //Category
  getCategory(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/categories', { headers: this.header, withCredentials: true });

  }
  addCategory(name: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/categories', { 'name': name }, { headers: this.header, withCredentials: true });

  }
  editCategory(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/categories/' + id, { 'name': name }, { headers: this.header, withCredentials: true });

  }
  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/categories/' + id, { headers: this.header, withCredentials: true });

  }
  //Subcategory
  getSubcategory(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/subCategories', { headers: this.header, withCredentials: true });

  }
  addSubcategory(name: string, category: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/subCategories', { 'name': name, 'category': category }, { headers: this.header, withCredentials: true });

  }
  editSubcategory(id: number, name: string, category: string): Observable<any> {
    return this.httpClient.patch(this.baseUrl + '/subCategories/' + id, { 'name': name, 'category': category }, { headers: this.header, withCredentials: true });

  }
  deleteSubcategory(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/subCategories/' + id, { headers: this.header, withCredentials: true });

  }
  getSubcategoryByCategory(list: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/subCategories/getOfCategories', { 'categories': list }, { headers: this.header, withCredentials: true });

  }
  //Country
  getCountry(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/countries', { headers: this.header, withCredentials: true });

  }
  addCountry(name: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/countries', { 'name': name }, { headers: this.header, withCredentials: true });

  }
  editCountry(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/countries/' + id, { 'name': name }, { headers: this.header, withCredentials: true });

  }
  deleteCountry(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/countries/' + id, { headers: this.header, withCredentials: true });

  }
  //States
  getStates(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/states', { headers: this.header, withCredentials: true });

  }
  getStatesByCountry(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/countries/' + id + '/states', { headers: this.header, withCredentials: true });

  }
  addStates(name: string, country: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/states', { 'name': name, 'country': country }, { headers: this.header, withCredentials: true });

  }
  editStates(id: number, name: string, country: string): Observable<any> {
    return this.httpClient.patch(this.baseUrl + '/states/' + id, { 'name': name, 'country': country }, { headers: this.header, withCredentials: true });

  }
  deleteStates(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/states/' + id, { headers: this.header, withCredentials: true });

  }
  //City
  getCity(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/cities', { headers: this.header, withCredentials: true });

  }
  getCityByState(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/states/' + id + '/cities', { headers: this.header, withCredentials: true });

  }
  addCity(name: string, state: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/cities', { 'name': name, 'state': state }, { headers: this.header, withCredentials: true });

  }
  editCity(id: number, name: string, state: string): Observable<any> {
    return this.httpClient.patch(this.baseUrl + '/cities/' + id, { 'name': name, 'state': state }, { headers: this.header, withCredentials: true });

  }
  deleteCity(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/cities/' + id, { headers: this.header, withCredentials: true });

  }
  //Pincode
  getPincode(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/pincodes', { headers: this.header, withCredentials: true });

  }
  addPincode(name: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/pincodes', { 'name': name }, { headers: this.header, withCredentials: true });

  }
  editPincode(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/pincodes/' + id, { 'name': name }, { headers: this.header, withCredentials: true });

  }
  deletePincode(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/pincodes/' + id, { headers: this.header, withCredentials: true });

  }
  //Area
  getArea(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/areas', { headers: this.header, withCredentials: true });

  }
  addArea(name: string, pincode: string, city: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/areas', { 'name': name, 'pincode': pincode, 'city': city }, { headers: this.header, withCredentials: true });

  }
  editArea(id: number, name: string, city: string, pincode: string): Observable<any> {
    return this.httpClient.patch(this.baseUrl + '/areas/' + id, { 'name': name, 'city': city, 'pincode': pincode }, { headers: this.header, withCredentials: true });

  }
  deleteArea(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/areas/' + id, { headers: this.header, withCredentials: true });

  }
  //Language
  getLanguage(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/languages', { headers: this.header, withCredentials: true });

  }
  addLanguage(name: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/languages', { 'name': name }, { headers: this.header, withCredentials: true });

  }
  editLanguage(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/languages/' + id, { 'name': name }, { headers: this.header, withCredentials: true });

  }
  deleteLanguage(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/languages/' + id, { headers: this.header, withCredentials: true });

  }
  //BindingType
  getBindingType(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/bookBindingTypes', { headers: this.header, withCredentials: true });

  }
  addBindingType(name: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/bookBindingTypes', { 'type': name }, { headers: this.header, withCredentials: true });

  }
  editBindingType(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/bookBindingTypes/' + id, { 'type': name }, { headers: this.header, withCredentials: true });

  }
  deleteBindingType(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/bookBindingTypes/' + id, { headers: this.header, withCredentials: true });

  }
  //EBookfor(let key in addDetails){
  //   key:key[addDetails]
  // }

  addEBook(addDetails: booklist): Observable<any> {
    var formData = new FormData();
    for (let key in addDetails) {
      // if (key.includes('chapter') || key.includes('authors') || key.includes('chapters')) {
      //   formData.append(key, JSON.stringify(addDetails[key]));
      // } else {
      formData.append(key, addDetails[key]);
      // }
    }
    return this.httpClient.post(this.baseUrl + '/books', formData,
      { headers: this.header, withCredentials: true });

  }
  getEBook(status: string, page: number, siz: number): Observable<any> {
    const size = Number(siz) + 1;
    return this.httpClient.get(this.baseUrl + '/books/byTypeStatus?type=EBOOK&status=' + status + '&page=' + page + '&size=' + size, { headers: this.header, withCredentials: true });

  }
  getBookDetails(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/books/detail/' + id, { headers: this.header, withCredentials: true });

  }
  //print
  getPrintBook(status, page: number, siz: number): Observable<any> {
    const size = Number(siz) + 1;
    return this.httpClient.get(this.baseUrl + '/books/byTypeStatus?type=PRINT&status=' + status + '&page=' + page + '&size=' + size, { headers: this.header, withCredentials: true });

  }
  //audio
  getAudioBook(status, page: number, siz: number): Observable<any> {
    const size = Number(siz) + 1;
    return this.httpClient.get(this.baseUrl + '/books/byTypeStatus?type=AUDIO&status=' + status + '&page=' + page + '&size=' + size, { headers: this.header, withCredentials: true });

  }
  //prepublish
  getPrepublishBook(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/books/byState?state=PRE_PUBLISH&page=0&size=20', { headers: this.header, withCredentials: true });

  }
  addPrePublish(addDetails: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/books/' + addDetails.id + '/prePublish', {
      'fromDate': addDetails.fromDate,
      'toDate': addDetails.toDate,
      'hasBookingDiscount': addDetails.hasBookingDiscount,
      'discountPrice': addDetails.discountPrice,
      'details': addDetails.details
    },
    { headers: this.header, withCredentials: true });

  }
  editPrePublish(editDetails: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/books/' + editDetails.id + '/prePublish/update', {
      'fromDate': editDetails.fromDate,
      'toDate': editDetails.toDate,
      'discountPrice': editDetails.price,
      'hasBookingDiscount': editDetails.hasBookingDiscount,
      'details': editDetails.details,
    },
    { headers: this.header, withCredentials: true });

  }
//pre-book, pre-publication, print on demand --Delete
removePreTypes(id: number, type: string): Observable<any>{
  return this.httpClient.delete(this.baseUrl + '/books/' + id + '/' + type ,{ headers: this.header, withCredentials: true });

}
  //rental
  getRental(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/books/rentals?&page=0&size=20', { withCredentials: true });

  }
  addRental(addDetails: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/books/' + addDetails.id + '/rental', { 'bookFormat': addDetails.bookFormat, 'rentalFee': addDetails.rentalFee, 'duration': addDetails.duration }, { headers: this.header, withCredentials: true });

  }
  editRental(editDetails: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/books/' + editDetails.id + '/rental/update', { 'bookFormat': editDetails.bookFormat, 'rentalFee': editDetails.rentalFee, 'duration': editDetails.duration }, { headers: this.header, withCredentials: true });

  }
  changeStatus(id: number, status: string, type: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/books/' + id + '/status?type=' + type + '&status=' + status, { headers: this.header, withCredentials: true });

  }
  editBook(addDetails: booklist): Observable<any> {
    var formData = new FormData();
    for (let key in addDetails) {
      // if (key.includes('chapter') || key.includes('authors') || key.includes('chapters')) {
      //   formData.append(key, JSON.stringify(addDetails[key]));
      // } else {
      formData.append(key, addDetails[key]);
      // }
    }
    return this.httpClient.put(this.baseUrl + '/books/' + addDetails.id, formData, { headers: this.header, withCredentials: true });

  }
  getBookBystatus(status): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/books/byTypeStatus?type=' + status + '&status=PUBLISHED&page=0&size=20', { headers: this.header, withCredentials: true });

  }
  publishBook(id: number, type: string, publishType?: string, date?: Date, time?: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/books/' + id + '/publish?type=' + type, { 'launchType': publishType, 'launchDate': date, 'launchTime': time }, { headers: this.header, withCredentials: true });

  }
  deleteBook(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/books/' + id, { headers: this.header, withCredentials: true });

  }
  bookExist(title, bookType): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/books/exists?title=' + title + '&bookType=' + bookType, { headers: this.header, withCredentials: true });

  }
  getImage(cover): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/uploads/images/' + cover, { headers: this.header, withCredentials: true });

  }
  searchBook(page: number, perPage: number, searchDetails?: searchlist): Observable<any> {
    const size = Number(perPage) + 1;
    return this.httpClient.post(this.baseUrl + '/books/search?page=' + page + '&size=' + size,
      { 'bookType': searchDetails.bookType, 'bookStatus': searchDetails.bookStatus, 'title': searchDetails.title}, { headers: this.header, withCredentials: true });

  }
  searchContributor(page: number, perPage: number, searchDetails?: contributorSearch): Observable<any> {
    const size = Number(perPage) + 1;
    return this.httpClient.get(this.baseUrl + '/contributors/search/findByNameContaining?name=' + searchDetails.contributorType + '&page=' + page + '&size=' + size, { headers: this.header, withCredentials: true });

  }
  addFreeOrRetailBook(list: any[], type: string, mode: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/books/changeSaleMode?type=' + type + '&mode=' + mode, list, { headers: this.header, withCredentials: true });

  }
  getFreeOrRetailBook(type: string, mode: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/books/bySaleMode?type=' + type + '&mode=' + mode, { headers: this.header, withCredentials: true });

  }
  // Add images & files
  addImage(file: any): Observable<any> {
    var formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl + '/uploads/images', formData, { headers: this.header, withCredentials: true });

  }
  addBookFile(file: any): Observable<any> {
    var formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl + '/uploads/file', formData, { headers: this.header, withCredentials: true });

  }
  massUpload(cover: any, epub: any): Observable<any> {
    let covername = cover.name.split('.');
    let CoverWithoutExtension = covername.slice(0, -1).join('.');
    var formData = new FormData();
    formData.append('cover', cover);
    formData.append('file', epub);
    return this.httpClient.post(this.baseUrl + '/import/resources?title=' + CoverWithoutExtension, formData, { headers: this.header, withCredentials: true });

  }
  // banner
  addBanner(banner: Array<any>, bookType: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/banner?bookType=' + bookType, banner, { headers: this.header, withCredentials: true });

  }
  getBanner(bookType: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/banner?bookType=' + bookType, { headers: this.header, withCredentials: true });

  }
  getAudioUploadTitles(bookid: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/books/getTitles?id=' + bookid, { headers: this.header, withCredentials: true });

  }
  uploadAudio(audioarray: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/books/updateAudioFile', audioarray, { headers: this.header, withCredentials: true });

  }
  // courier
  getCourier(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/courierTypes', { headers: this.header, withCredentials: true });

  }
  addCourier(name: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/courierTypes', { 'type': name }, { headers: this.header, withCredentials: true });

  }
  editCourier(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/courierTypes/' + id, { 'type': name }, { headers: this.header, withCredentials: true });

  }
  deleteCourier(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/courierTypes/' + id, { headers: this.header, withCredentials: true });

  }
  // deliveryPartner
  getdeliveryPartner(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/deliveryPartners', { headers: this.header, withCredentials: true });

  }
  adddeliveryPartner(name: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/deliveryPartners', { 'name': name }, { headers: this.header, withCredentials: true });

  }
  editdeliveryPartner(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/deliveryPartners/' + id, { 'name': name }, { headers: this.header, withCredentials: true });

  }
  deletedeliveryPartner(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/deliveryPartners/' + id, { headers: this.header, withCredentials: true });

  }
  // packingType
  getpackingType(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/packageTypes', { headers: this.header, withCredentials: true });

  }
  addpackingType(type: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/packageTypes', { 'type': type }, { headers: this.header, withCredentials: true });

  }
  editpackingType(id: number, type: string): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/packageTypes/' + id, { 'type': type }, { headers: this.header, withCredentials: true });

  }
  deletepackingType(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/packageTypes/' + id, { headers: this.header, withCredentials: true });
  }
  // packingSize
  getpackingSize(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/packageSizes', { headers: this.header, withCredentials: true });

  }
  addpackingSize(size: number): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/packageSizes', { 'size': size }, { headers: this.header, withCredentials: true });

  }
  editpackingSize(id: number, size: number): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/packageSizes/' + id, { 'size': size }, { headers: this.header, withCredentials: true });

  }
  deletepackingSize(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/packageSizes/' + id, { headers: this.header, withCredentials: true });
  }
  addZone(zonedetails: Zone): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/zones', { 'name': zonedetails.name, 'wareHouse': zonedetails.wareHouse, 'edd': zonedetails.edd, 'shippingDiscount': zonedetails.shippingDiscount }, { headers: this.header, withCredentials: true });

  }
  editZone(id: number, name: string, wareHouse: string, edd: number, shippingDiscount: number): Observable<any> {
    return this.httpClient.patch(this.baseUrl + '/zones/' + id, { 'name': name, 'wareHouse': wareHouse, 'edd': edd, 'shippingDiscount': shippingDiscount }, { headers: this.header, withCredentials: true });
  }
  deleteZone(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/zones/' + id, { headers: this.header, withCredentials: true });
  }
  getZone(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/zones', { headers: this.header, withCredentials: true });

  }
  getZonePincode(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/pincodes/zone/' + id, { headers: this.header, withCredentials: true });
  }
  importPincodes(file: any, id: number): Observable<any> {
    var formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl + '/import/pincode?zoneId=' +id, formData, { headers: this.header, withCredentials: true });

  }
  // warehouse
  getwareHouse(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/wareHouses', { headers: this.header, withCredentials: true });

  }
  addwareHouse(warehouseDetails: wareHouse): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/wareHouses', { 'name': warehouseDetails.name, 'code': warehouseDetails.code }, { headers: this.header, withCredentials: true });

  }
  editwareHouse(id: number, warehouseDetails: wareHouse): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/wareHouses/' + id, { 'name': warehouseDetails.name, 'code': warehouseDetails.code }, { headers: this.header, withCredentials: true });

  }
  deletewareHouse(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/wareHouses/' + id, { headers: this.header, withCredentials: true });

  }
  importBook(bookType: string,file: any): Observable<any> {
    var formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.baseUrl + '/import?bookType='+ bookType, formData, { headers: this.header, withCredentials: true });
  }
  //invoice
  getInvoice(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/orders/invoice/?orderId=' + id, { headers: this.header, withCredentials: true });
  }
  // book position
  getBookPosition(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/bookPositions', { headers: this.header, withCredentials: true });

  }
  addBookPosition(book: string, shelfId: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/bookPositions', { 'shelf': shelfId,'book': book },
      { headers: this.header, withCredentials: true });

  }
  editBookPosition(id: number, shelfId: string): Observable<any> {
    return this.httpClient.patch(this.baseUrl + '/bookPositions/' + id,
      { 'shelf': shelfId },
      { headers: this.header, withCredentials: true });

  }
  deleteBookPosition(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/bookPositions/' + id, { headers: this.header, withCredentials: true });

  }

  // shelf
  getShelves(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/shelves', { headers: this.header, withCredentials: true });

  }
  addShelf(name: string, priority: number): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/shelves', { 'name': name, 'priority': priority }, { headers: this.header, withCredentials: true });

  }
  editShelf(id: number,name: string, priority: number): Observable<any> {
    return this.httpClient.patch(this.baseUrl + '/shelves/'+id, { 'name': name, 'priority': priority }, { headers: this.header, withCredentials: true });

  }
  deleteShelf(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/shelves/' + id, { headers: this.header, withCredentials: true });

  }

  //Weight
  getweight(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/weights', { headers: this.header, withCredentials: true });

  }
  addweight(weightDetails: Weight): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/weights', { 'startWeight': weightDetails.startWeight, 'endWeight': weightDetails.endWeight },
       { headers: this.header, withCredentials: true });
  }

  editweight(id: number, weightDetails: Weight): Observable<any> {
    return this.httpClient.patch(this.baseUrl + '/weights/' + id, { 'startWeight': weightDetails.startWeight, 'endWeight': weightDetails.endWeight },
       { headers: this.header, withCredentials: true });

  }
  deleteweight(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/weights/' + id, { headers: this.header, withCredentials: true });

  }

  addShippingCharges(addDetails: ShippingCharges): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/zoneWeightCharges', { 'zone': addDetails.zoneId, 'weight': addDetails.weight,
      'shippingCharge':addDetails.shippingCharge},
       { headers: this.header, withCredentials: true });
  }

  getShippingCharges(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/zones/'+id+'/shippingCharges', { headers: this.header, withCredentials: true });

  }
  editShippingCharges(editDetails: ShippingCharges): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/zoneWeightCharges/' + editDetails.id , { 'zone': editDetails.zoneId, 'weight': editDetails.weight,
      'shippingCharge':editDetails.shippingCharge},
       { headers: this.header, withCredentials: true });

  }
  deleteShippingCharges(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/zoneWeightCharges/' + id, { headers: this.header, withCredentials: true });

  }

  //Product ids --start
getProductIds(bookType: string, page: number, size: number): Observable<any> {
  return this.httpClient.get(this.baseUrl + '/productIds/?' + 'bookType='+bookType+'&page=' + page + '&size=' + size,
    { headers: this.header, withCredentials: true });
}

  addUpdateProductId(addDetails: any ): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/productIds/addUpdate', {
      bookId:addDetails.bookId,
      ebookAppleId:addDetails.eBookAppleId,
      printAppleId:addDetails.printAppleId,
      audioAppleId:addDetails.audioAppleId,
      ebookApplePrice:addDetails.ebookiTunePrice,
      printApplePrice:addDetails.printiTunePrice,
      audioApplePrice:addDetails.audioiTunePrice,
      ebookGoogleId:addDetails.ebookGoogleId,
      printGoogleId:addDetails.printGoogleId,
      audioGoogleId:addDetails.audioGoogleId
    },
       { headers: this.header, withCredentials: true });
  }

  //Product ids --end

  exportBooks(bookType: string): any {
    const httpOptions = {
      headers: new HttpHeaders({ 'responseType':  'ResponseContentType.Blob',
      'Content-Type':  'application/vnd.ms-excel'}),
       withCredentials: true };
    return this.httpClient.get(this.baseUrl + '/books/download?bookStatus=DRAFT&bookType=' + bookType, httpOptions);

  }
  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
}


