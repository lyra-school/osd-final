import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { signal, WritableSignal } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the signal', () => {
    let currentUserId: WritableSignal<string> = service.currentUserId;
    service.updateCurrentUserId("hello");
    
    expect(currentUserId()).toBe("hello");
  });

  it('should not emit default value', () => {
    let currentUserId: WritableSignal<string> = service.currentUserId;
    service.updateCurrentUserId("hello");
    
    expect(currentUserId()).not.toBe("");
  });
});
