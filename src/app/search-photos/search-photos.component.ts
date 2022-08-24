import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FlickrService } from '../flickr.service';

@Component({
  selector: 'app-search-photos',
  templateUrl: './search-photos.component.html',
  styleUrls: ['./search-photos.component.css']
})
export class SearchPhotosComponent implements OnInit {
  images: any[] = [];
  keyword: string;

  constructor(private flickrService: FlickrService) { this.keyword =''; }

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

}
