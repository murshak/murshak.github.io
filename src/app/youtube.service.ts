import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  // videos: Playlist | undefined;
  // Youtube = require("youtube-sr").default;

  // headers = {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  // }

  // req = {
  //   'headers': new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json').set('Access-Control-Allow-Headers', 'Content-Type')
  // };

  // getVideos() {
  //   console.log(this.req);
  //   this.videos = this.Youtube.getPlaylist("PL14F25F0414600FD8", this.req).then(console.log).catch(console.error);
  // }

  apiKey : string = 'AIzaSyAIuD8zbeYf4rl4vkKxeSr-O9jEPtaBUdM';
  playlistId : string = 'PL14F25F0414600FD8';

  constructor(public http: HttpClient) { }

  getChannels(channel: string, maxResults: number): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/channels?key=' + this.apiKey + '&id=' + channel + '&maxResults=' + maxResults
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }

  getVideosForChannel(channel: string, maxResults: number): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }

  getPlaylist(id: string, maxResults: number, pageToken?: string): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + id + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    if (pageToken) {
      url = url + '&pageToken=' + pageToken
    }
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }
}