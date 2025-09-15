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
  const { settings } = useSettings();
  const progress = localStorage.getItem('user-info-prog');


  const Progress = ({
    value = 0,            // 0..100
    height = "h-2",       // e.g. "h-1.5", "h-3"
    rounded = "rounded-full",
    color = "bg-blue-600",
    showLabel = true,
    className = "",
    label = "Progress",
  }) => {
    const v = Math.min(100, Math.max(0, value)); // clamp 0..100

    return (
      <div className={`w-full ${className}`}>
        {showLabel && (
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-sm tabular-nums text-gray-600">{v}%</span>
          </div>
        )}

        <div
          className={`${height} w-full bg-gray-200 ${rounded}`}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={v}
        >
          <div
            className={`${height} ${rounded} ${color} transition-all duration-300`}
            style={{ width: `${v}%` }}
          />
        </div>
      </div>
    );
  };

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
