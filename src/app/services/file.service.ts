import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { FileModel } from '../models/file.model';
import { Observable } from 'rxjs';
import { ResponseCustomModel } from '../models/response.custom.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
 server: string = `${environment.server}/file`;
  constructor(
    private http: HttpClient,
  ) { }

  upload_file(file: FileModel): Observable<ResponseCustomModel<string>> {
    const formData = new FormData();
    formData.append(file.name, file.file, file.fileName);
    return this.http.post<ResponseCustomModel<string>>(`${this.server}/upload/`, formData);
  }
}
