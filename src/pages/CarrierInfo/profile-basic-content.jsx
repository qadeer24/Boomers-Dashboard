// import {
//   About,
//   Licensing,
//   Bank,
//   CommunityBadges,
//   Contributions,
//   Contributors,
//   MediaUploads,
//   Projects,
//   RecentUploads,
//   Tags,
//   UnlockPartnerships,
//   WorkExperience,
//   Policies,
//   Invoicing
// } from './components';
// import { UpcomingEvents } from '../creator/components/upcoming-events';

export function ProfileDefaultContent() {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
        <div className="col-span-1">
          <div className="grid gap-5 lg:gap-7.5">
            {/* <CommunityBadges title="Agencies Associated" /> */}
            {/* <About /> */}
            {/* <Licensing /> */}
            {/* <Bank /> */}
            {/* <WorkExperience /> */}
            {/* <Tags title="Skills" /> */}
            {/* <RecentUploads title="Recent Uploads" /> */}
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <div className="flex flex-col gap-5 lg:gap-7.5">
              {/* <UnlockPartnerships /> */}
              {/* <MediaUploads /> */}
            </div>
            {/* <UpcomingEvents /> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
              {/* <Contributors /> */}
              {/* <Policies /> */}
            </div>
            {/* <Projects /> */}
          </div>
        </div>
      </div>
      <div className='my-7'>
        {/* <Invoicing/> */}
      </div>
    </>
  );
}
