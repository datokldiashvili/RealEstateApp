import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private titleService: Title) {}
  setTitle(title: string) {
    console.log(title);
    if (title) this.titleService.setTitle(`Real Estate App | ${title}`);
    else this.titleService.setTitle(`Real Estate App`);
  }
}
