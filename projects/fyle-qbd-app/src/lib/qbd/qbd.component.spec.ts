import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { QbdWorkspaceService } from 'src/app/core/services/qbd/qbd-core/qbd-workspace.service';

import { QbdComponent } from './qbd.component';
import { errorResponse, workspaceResponse } from './qbd.fixture';

describe('QbdComponent', () => {
  let component: QbdComponent;
  let fixture: ComponentFixture<QbdComponent>;
  let workspace: QbdWorkspaceService;

  beforeEach(async () => {
    const localStorageDump = {
      email: 'fyle@fyle.in',
      org_id: '2'
    };
    localStorage.setItem('user', JSON.stringify(localStorageDump));
    const service1 = {
      getQBDWorkspace: () => of(workspaceResponse),
      postQBDWorkspace: () => of(workspaceResponse)
    };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      declarations: [ QbdComponent ],
      providers: [
        { provide: QbdWorkspaceService, useValue: service1 }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QbdComponent);
    component = fixture.componentInstance;
    workspace = TestBed.inject(QbdWorkspaceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnIng function check', async () => {
    expect((component as any).getOrCreateWorkspace()).toBeUndefined();
  });

  it('workspace error handling', () => {
    spyOn(workspace, 'getQBDWorkspace').and.returnValue(throwError(errorResponse));
    fixture.detectChanges();
    expect((component as any).getOrCreateWorkspace()).toBeUndefined();
  });
});
