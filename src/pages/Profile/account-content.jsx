import { RecentUploads } from '@/pages/public-profile/profiles/default';
import {
  BasicSettings,
  CalendarAccounts,
  CommunityBadges,
  Connections,
  PersonalInfo,
  LicensingInfo,
  StartNow,
  Work,
  BankInfo,
  Bio,
  LoginInfo
} from './components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAgentById } from '@/utils/agentService';


export function AccountUserProfileContent() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5">
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">

          <PersonalInfo />
          <LicensingInfo/>
          <Bio />
          {/* <BasicSettings title="Basic Settings" /> */}
          {/* <Work /> */}
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <CommunityBadges title="Uplines" />
          <LoginInfo/>
          <BankInfo/>
          {/* <StartNow />
          <CalendarAccounts />
          <Connections url="#" />
          <RecentUploads title="My Files" /> */}
        </div>
      </div>
    </div>
  );
};