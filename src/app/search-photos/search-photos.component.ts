import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FlickerSingleImage, FlickrService } from '../flickr.service';

interface FlickrPhoto { 
  server: string;
  id: string;
  secret: string;
  title: string;

}
@Component({
  selector: 'app-search-photos',
  templateUrl: './search-photos.component.html',
  styleUrls: ['./search-photos.component.css']
})

export class SearchPhotosComponent implements OnInit {
  images: any[] = [];
  imageInfo!: any;
  keyword: string;
  photoId: string;
  showModal!: boolean;
  url!: string;

  constructor(private flickrService: FlickrService) { 
    this.keyword = ''; 
    this.photoId = '';
    
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
    this.imageInfo = flickerSingleImageInfo.photo.urls.url[0]._content;
  }

  show(id: string)
  {
    console.log(id)
    this.getImageInfo(id);
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
}
