import { Fragment } from 'react';
import { PageNavbar } from '@/pages/account';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { Link } from 'react-router';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { AccountUserProfileContent } from './account-content';
import clsx from "clsx";
import { useState } from 'react';

export function AccountProfilePage() {

  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle />
            <toolbarHeading>
              My Account
            </toolbarHeading>
            <ToolbarDescription>
              Central Hub for Personal Customization
            </ToolbarDescription>
          </ToolbarHeading>
        </Toolbar>
        {/* <Toolbar>
          <ToolbarHeading>
            <Progress value={progress} />
            <Progress value={45} color="bg-green-600" label="Downloading" />

          </ToolbarHeading>
        </Toolbar> */}
      </Container>
      <Container className="flex justify-between">
        <PageNavbar />
        {/* {settings?.layout === 'demo1' && ( */}
        <Toolbar>
          <ToolbarActions>
            <Button variant="primary" style={{ marginBottom: '1.3rem' }}>Add Agents</Button>
          </ToolbarActions>
        </Toolbar>
        {/* )} */}
      </Container>
      <Container>
        <AccountUserProfileContent/>
      </Container>
    </Fragment>
  );
}
