import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { GitUserSearch } from './git-user-search';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService { 
  cachedValues: Array<{
    [queue: string]: GitSearch 
  }> = [];
  cachedUserValues: Array<{
    [query: string]: GitUserSearch
  }> = [];

  constructor(private http: HttpClient) {
    this.http = http;
   }
  
   gitSearch = (query: string): Promise <GitSearch> => {
    let promise = new Promise<GitSearch>((resolve, reject)=> {
      if (this.cachedValues[query]){
        resolve (this.cachedValues[query])
      }
      else{
        this.http.get('https://api.github.com/search/repositories?q=' + query)
        .toPromise()
        .then((response) => {
          resolve(response as GitSearch)
        }, (error) => {
          reject (error) ;
        })
      }
    })
    return promise;
  }
  gitUserSearch = (query: string): Promise <GitUserSearch> => {
    let promise = new Promise<GitUserSearch>((resolve, reject)=> {
      if (this.cachedUserValues[query]){
        resolve (this.cachedUserValues[query])
      }
      else{
        this.http.get('https://api.github.com/search/users?q=' + query)
        .toPromise()
        .then((response)=> {
          resolve(response as GitUserSearch)
        }, (error) => {
          reject (error);
        })
      }
    })
    return promise;
  }
}
