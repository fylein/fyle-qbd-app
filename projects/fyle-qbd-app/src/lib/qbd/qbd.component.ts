import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QbdWorkspaceService } from 'fyle-integrations-ui-lib';
import { MinimalUser } from 'fyle-integrations-ui-lib';
import { QBDOnboardingState } from 'fyle-integrations-ui-lib';
import { Workspace } from 'fyle-integrations-ui-lib';
import { StorageService } from 'fyle-integrations-ui-lib';
import { WindowService } from 'fyle-integrations-ui-lib';
import { QbdUserService } from 'fyle-integrations-ui-lib';


@Component({
  selector: 'app-qbd',
  templateUrl: './qbd.component.html',
  styleUrls: ['./qbd.component.scss']
})
export class QbdComponent implements OnInit {
  user: MinimalUser;

  workspace: Workspace;

  isLoading: boolean = true;

  windowReference: Window;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private userService: QbdUserService,
    private workspaceService: QbdWorkspaceService,
    private windowService: WindowService
  ) {
    this.windowReference = this.windowService.nativeWindow;
  }

  private navigate(): void {
    const pathName = this.windowReference.location.pathname;

    if (pathName === '/integrations/qbd') {
      const onboardingStateComponentMap = {
        [QBDOnboardingState.CONNECTION]: '/integrations/qbd/onboarding/landing',
        [QBDOnboardingState.EXPORT_SETTINGS]: '/integrations/qbd/onboarding/landing',
        [QBDOnboardingState.FIELD_MAPPINGS]: '/integrations/qbd/onboarding/field_mappings',
        [QBDOnboardingState.ADVANCED_SETTINGS]: '/integrations/qbd/onboarding/advanced_settings',
        [QBDOnboardingState.COMPLETE]: '/integrations/qbd/main'
      };

      this.router.navigateByUrl(onboardingStateComponentMap[this.workspace.onboarding_state]);
    }
  }

  private getOrCreateWorkspace(): void {
    this.workspaceService.getQBDWorkspace(this.user.org_id).subscribe((workspaces) => {
      if (workspaces?.id) {
        this.workspaceSetting(workspaces);
      }
    }, (error) => {
      this.workspaceService.postQBDWorkspace().subscribe((workspaces: any) => {
        this.workspaceSetting(workspaces);
      });
    }
    );
  }

  workspaceSetting(workspace:Workspace) {
    this.workspace = workspace;
    this.storageService.set('workspaceId', this.workspace.id);
    this.storageService.set('QBDOnboardingState', this.workspace.onboarding_state);
    this.isLoading = false;
    this.navigate();
  }

  setupWorkspace() {
    this.user = this.userService.qbdGetUserProfile();
      this.getOrCreateWorkspace();
  }

  ngOnInit(): void {
    this.setupWorkspace();
  }

}
