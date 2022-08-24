import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FlickerSingleImage, FlickrService } from '../flickr.service';

class FlickrPhoto { 
  server!: string;
  id!: string;
  secret!: string;
  title!: string;
  url!: string;

}
@Component({
  selector: 'app-search-photos',
  templateUrl: './search-photos.component.html',
  styleUrls: ['./search-photos.component.css']
})

export class SearchPhotosComponent implements OnInit {
  images: any[] = [];
  imageInfo: FlickrPhoto;
  keyword: string;
  photoId: string;
  showModal!: boolean;
  url!: string;

  constructor(private flickrService: FlickrService) { 
    this.keyword = ''; 
    this.photoId = '';
    this.imageInfo = new FlickrPhoto();
    
  }

  ngOnInit(): void {
  }

  async search(event: any) {
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      const images$ = this.flickrService.search_keyword(this.keyword);
      this.images = await lastValueFrom(images$);
    }
  }


 async onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      const image$ = this.flickrService.search_keyword(this.keyword);
      this.images = this.images.concat( await lastValueFrom(image$));
    }
  }

  async getImageInfo(photoId: any){
    const flickerSingleImageInfo = await lastValueFrom(this.flickrService.getPhotoInfo(photoId));
    return flickerSingleImageInfo;
  }

  async show(image: any)
  {
    console.log(image)
    const imageinfo = await this.getImageInfo(image.id);
    this.imageInfo.url = image.url;
    this.imageInfo.title = imageinfo.photo.title._content;
    
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
}
