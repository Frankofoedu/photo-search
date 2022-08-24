import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArrayType } from '@angular/compiler';

export interface FlickrPhoto { 
  server: string;
  id: string;
  secret: string;
  title: string;

}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  prevKeyword: string
  currPage = 1;

  constructor(private http: HttpClient) { 
    this.prevKeyword = '';
  }

  search_keyword(keyword: string) {
    if (this.prevKeyword === keyword) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    this.prevKeyword = keyword;
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const parameters = `api_key=${environment.flickr.key}&text=${keyword}&format=json&per_page=12&nojsoncallback=?&page=${this.currPage}`;

    return this.http.get<FlickrOutput>(url + parameters).pipe(map((res: FlickrOutput) => {
      const urlArray: any[] = [];
      res.photos.photo.forEach((ph: FlickrPhoto) => {
        const photoObj = {
          url: `https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`,
          title: ph.title
        };
        urlArray.push(photoObj);
      });
      return urlArray;
    }))
  }

  getPhotoInfo (photoid: string) {
    
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&`;
    const parameters = `api_key=${environment.flickr.key}&photo_id=${ }&format=json&nojsoncallback=?`;

    return this.http.get(url + parameters).
  }  
}
