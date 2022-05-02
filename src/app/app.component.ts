import { Component } from '@angular/core';
import { YoutubeService } from './youtube.service';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'murshak.github.io';
  videos: any[] = [];
  playlistId: string = 'PUZO4frqdXsCXmD20PFtXolg';
  videosPerPage: number = 30;
  totalVideos: number = 0;
  nextPageToken: string = "";
  prevPageToken: string = "";
  pageIndex: number = 0;
  showSpinner: boolean = true;

  constructor(private youtubeService: YoutubeService, private titleService: Title) {
    titleService.setTitle("Alex's Home Movies")
  }

  ngOnInit() {
    this.reloadVideos();
  }

  reloadVideos(pageToken?: string) {
    this.showSpinner = true;
    setTimeout(() => { this.showSpinner = false }, 3000);
    this.videos = [];
    this.youtubeService.getPlaylist(this.playlistId, this.videosPerPage, pageToken).pipe().subscribe(
      (lista: { [x: string]: any; }) => {
        for (let element of lista["items"]) {
          this.videos.push(element);
        }
        this.totalVideos = lista["pageInfo"].totalResults;
        this.nextPageToken = lista["nextPageToken"];
        this.prevPageToken = lista["prevPageToken"];
        this.showSpinner = false;
      }
    );
  }

  handlePageEvent(event: PageEvent) {
    if (event.pageIndex > this.pageIndex) {
      this.reloadVideos(this.nextPageToken);
    } else if (event.pageIndex < this.pageIndex) {
      this.reloadVideos(this.prevPageToken)
    }
    this.pageIndex = event.pageIndex;
  }

  unsubscribe$(unsubscribe$: any): any {
    throw new Error('Method not implemented.');
  }
}
