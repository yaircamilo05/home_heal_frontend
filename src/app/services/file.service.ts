import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  server: string = `${environment.server}/file`;
  constructor(
    private http: HttpClient,
  ) { 

    
  }

  saveFileAzure(file: FormData): Observable<string> {
    return this.http.post<string>(`${this.server}/upload/`, file);
  }

}
