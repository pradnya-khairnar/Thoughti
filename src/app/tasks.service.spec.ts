import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TasksService', () => {
  let service: TasksService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });
    service = TestBed.inject(TasksService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get data', () => {
    const taskData = true;
    const inputData = [
      {
        Task: 'Sample task -1',
        Expiry_date: '10/21/2022',
        User: 'User-1',
        Important: true,
        Created_on: '01/10/2022',
      },
    ];

    service.getTasks().subscribe((data) => {
      expect(data).toEqual(inputData);
    });

    const req = httpController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toEqual('GET');
    req.flush(inputData);
  });
});
