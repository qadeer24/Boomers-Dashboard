import { AuthRouting } from '@/auth/auth-routing';
import { RequireAuth } from '@/auth/require-auth';
import { ErrorRouting } from '@/errors/error-routing';
import { Demo1Layout } from '@/layouts/demo1/layout';
import {
  AccountActivityPage,
  AccountAllowedIPAddressesPage,
  AccountApiKeysPage,
  AccountAppearancePage,
  AccountBackupAndRecoveryPage,
  AccountBasicPage,
  AccountCompanyProfilePage,
  AccountCurrentSessionsPage,
  AccountDeviceManagementPage,
  AccountEnterprisePage,
  AccountGetStartedPage,
  AccountHistoryPage,
  AccountImportMembersPage,
  AccountIntegrationsPage,
  AccountInviteAFriendPage,
  AccountMembersStarterPage,
  AccountNotificationsPage,
  AccountOverviewPage,
  AccountPermissionsCheckPage,
  AccountPermissionsTogglePage,
  AccountPlansPage,
  AccountPrivacySettingsPage,
  AccountRolesPage,
  AccountSecurityGetStartedPage,
  AccountSecurityLogPage,
  AccountSettingsEnterprisePage,
  AccountSettingsModalPage,
  AccountSettingsPlainPage,
  AccountSettingsSidebarPage,
  AccountTeamInfoPage,
  AccountTeamMembersPage,
  AccountTeamsPage,
  AccountTeamsStarterPage,
  AccountUserProfilePage,
} from '@/pages/account';
import {
  Events,
} from '../pages/public-profile/profiles/events/Events';
import {
  AuthAccountDeactivatedPage,
  AuthWelcomeMessagePage,
} from '@/pages/auth';
import { DefaultPage, Demo1DarkSidebarPage } from '@/pages/dashboards';
import {
  NetworkAppRosterPage,
  NetworkAuthorPage,
  NetworkGetStartedPage,
  NetworkMarketAuthorsPage,
  NetworkMiniCardsPage,
  NetworkNFTPage,
  NetworkSaasUsersPage,
  NetworkSocialPage,
  NetworkStoreClientsPage,
  NetworkUserCardsTeamCrewPage,
  NetworkUserTableTeamCrewPage,
  NetworkVisitorsPage,
} from '@/pages/network';
import {
  CampaignsCardPage,
  CampaignsListPage,
  ProfileActivityPage,
  ProfileBloggerPage,
  ProfileCompanyPage,
  ProfileCreatorPage,
  ProfileCRMPage,
  ProfileDefaultPage,
  ProfileEmptyPage,
  ProfileFeedsPage,
  ProfileGamerPage,
  ProfileModalPage,
  ProfileNetworkPage,
  ProfileNFTPage,
  ProfilePlainPage,
  ProfileTeamsPage,
  ProfileWorksPage,
  ProjectColumn2Page,
  ProjectColumn3Page,
} from '@/pages/public-profile';
import { AllProductsPage, DashboardPage } from '@/pages/store-admin';
import {
  MyOrdersPage,
  OrderPlacedPage,
  OrderReceiptPage,
  OrderSummaryPage,
  PaymentMethodPage,
  ProductDetailsPage,
  SearchResultsGridPage,
  SearchResultsListPage,
  ShippingInfoPage,
  StoreClientPage,
  WishlistPage,
} from '@/pages/store-client';
import { AccountProfilePage } from '@/pages/Profile/account-page';
import { Step1 } from '@/pages/public-profile/Get-Contracted/Step1';
import { Step2 } from '@/pages/public-profile/Get-Contracted/Step2';
import { Step3 } from '@/pages/public-profile/Get-Contracted/Step3';
import { GetContractedCompleted } from '@/pages/public-profile/Get-Contracted/Get-Contracted-Completed';
import { MyContracts } from '@/pages/public-profile/Contracts/My-Contracts';
import { Navigate, Route, Routes } from 'react-router';
import { LeadsPage, LeadsOtherInfoPage } from '@/pages/Leads';
import { NewCarrier } from '@/pages/Carriers/New-Carrier'
// import ResetPassword from '@/pages/ResetPass/ResetPassUrlHandler.jsx';
// import CreateNewPass from '@/auth/pages/Changepass';

export function AppRoutingSetup() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<Demo1Layout />}>
          <Route path="/" element={<DefaultPage />} />
          {/* <Route
            path="/reset-password"
            element={
              <ResetPassword />
            }
          /> */}
          {/* <Route
            path="/set-new-password"
            element={
              <CreateNewPass />
            }
          /> */}
          <Route path="/events" element={<Events />} />
          <Route path="/agent/get-contracted/step-1" element={<Step1 />} />
          <Route path="/agent/get-contracted/step-2" element={<Step2 />} />
          <Route path="/agent/get-contracted/step-3" element={<Step3 />} />
          <Route path="/agent/get-contracted/completed" element={<GetContractedCompleted />} />
          <Route path="/agent/my-contracts" element={<MyContracts />} />
          <Route path="/dark-sidebar" element={<Demo1DarkSidebarPage />} />
          <Route
            path="/admin/agent/detail/:id"
            exact
            element={<ProfileDefaultPage />}
          />
          <Route path="/admin/carriers/new-carrier" element={<NewCarrier />} />
          <Route path="/admin/leads" element={<LeadsPage />} />
          <Route path="/admin/leads/edit" element={<LeadsOtherInfoPage />} />

          <Route
            path="/public-profile/profiles/default"
            element={<AccountProfilePage />}
          />

          {/* <Route
            path='/public-profile/profiles/default'
            element={<AccountProfilePage/>}
          /> */}

          <Route
            path="/public-profile/profiles/creator"
            element={<ProfileCreatorPage />}
          />

          <Route
            path="/public-profile/profiles/company"
            element={<ProfileCompanyPage />}
          />

          <Route
            path="/public-profile/profiles/nft"
            element={<ProfileNFTPage />}
          />

          <Route
            path="/public-profile/profiles/blogger"
            element={<ProfileBloggerPage />}
          />

          <Route
            path="/public-profile/profiles/crm"
            element={<ProfileCRMPage />}
          />

          <Route
            path="/public-profile/profiles/gamer"
            element={<ProfileGamerPage />}
          />

          <Route
            path="/public-profile/profiles/feeds"
            element={<ProfileFeedsPage />}
          />

          <Route
            path="/public-profile/profiles/plain"
            element={<ProfilePlainPage />}
          />

          <Route
            path="/public-profile/profiles/modal"
            element={<ProfileModalPage />}
          />

          <Route
            path="/public-profile/projects/3-columns"
            element={<ProjectColumn3Page />}
          />

          <Route
            path="/public-profile/projects/2-columns"
            element={<ProjectColumn2Page />}
          />

          <Route path="/public-profile/works" element={<ProfileWorksPage />} />
          <Route path="/public-profile/teams" element={<ProfileTeamsPage />} />
          <Route
            path="/public-profile/network"
            element={<ProfileNetworkPage />}
          />

          <Route
            path="/public-profile/activity"
            element={<ProfileActivityPage />}
          />

          <Route
            path="/public-profile/campaigns/card"
            element={<CampaignsCardPage />}
          />

          <Route
            path="/public-profile/campaigns/list"
            element={<CampaignsListPage />}
          />

          <Route path="/public-profile/empty" element={<ProfileEmptyPage />} />
          <Route
            path="/account/home/get-started"
            element={<AccountGetStartedPage />}
          />

          <Route
            path="/admin/agent/detail/edit/:id"
            element={<AccountUserProfilePage />}
          />

          <Route
            path="/account/home/company-profile"
            element={<AccountCompanyProfilePage />}
          />

          <Route
            path="/account/home/settings-sidebar"
            element={<AccountSettingsSidebarPage />}
          />

          <Route
            path="/account/home/settings-enterprise"
            element={<AccountSettingsEnterprisePage />}
          />

          <Route
            path="/account/home/settings-plain"
            element={<AccountSettingsPlainPage />}
          />

          <Route
            path="/account/home/settings-modal"
            element={<AccountSettingsModalPage />}
          />

          <Route path="/account/billing/basic" element={<AccountBasicPage />} />
          <Route
            path="/account/billing/enterprise"
            element={<AccountEnterprisePage />}
          />

          <Route path="/account/billing/plans" element={<AccountPlansPage />} />
          <Route
            exact
            path="/recent-signups"
            element={<AccountHistoryPage />}
          />

          <Route
            path="/account/security/get-started"
            element={<AccountSecurityGetStartedPage />}
          />

          <Route
            path="/account/security/overview"
            element={<AccountOverviewPage />}
          />

          <Route
            path="/account/security/allowed-ip-addresses"
            element={<AccountAllowedIPAddressesPage />}
          />

          <Route
            path="/account/security/privacy-settings"
            element={<AccountPrivacySettingsPage />}
          />

          <Route
            path="/account/security/device-management"
            element={<AccountDeviceManagementPage />}
          />

          <Route
            path="/account/security/backup-and-recovery"
            element={<AccountBackupAndRecoveryPage />}
          />

          <Route
            path="/account/security/current-sessions"
            element={<AccountCurrentSessionsPage />}
          />

          <Route
            path="/account/security/security-log"
            element={<AccountSecurityLogPage />}
          />

          <Route
            path="/account/members/team-starter"
            element={<AccountTeamsStarterPage />}
          />

          <Route path="/account/members/teams" element={<AccountTeamsPage />} />
          <Route
            path="/account/members/team-info"
            element={<AccountTeamInfoPage />}
          />

          <Route
            path="/account/members/members-starter"
            element={<AccountMembersStarterPage />}
          />

          <Route
            path="/account/members/team-members"
            element={<AccountTeamMembersPage />}
          />

          <Route
            path="/account/members/import-members"
            element={<AccountImportMembersPage />}
          />

          <Route path="/account/members/roles" element={<AccountRolesPage />} />
          <Route
            path="/account/members/permissions-toggle"
            element={<AccountPermissionsTogglePage />}
          />

          <Route
            path="/account/members/permissions-check"
            element={<AccountPermissionsCheckPage />}
          />

          <Route
            path="/account/integrations"
            element={<AccountIntegrationsPage />}
          />

          <Route
            path="/account/notifications"
            element={<AccountNotificationsPage />}
          />

          <Route path="/account/api-keys" element={<AccountApiKeysPage />} />
          <Route
            path="/account/appearance"
            element={<AccountAppearancePage />}
          />

          <Route
            path="/account/invite-a-friend"
            element={<AccountInviteAFriendPage />}
          />

          <Route path="/account/activity" element={<AccountActivityPage />} />
          <Route
            path="/network/get-started"
            element={<NetworkGetStartedPage />}
          />

          <Route
            path="/network/user-cards/mini-cards"
            element={<NetworkMiniCardsPage />}
          />

          <Route
            path="/network/user-cards/team-crew"
            element={<NetworkUserCardsTeamCrewPage />}
          />

          <Route
            path="/network/user-cards/author"
            element={<NetworkAuthorPage />}
          />

          <Route path="/network/user-cards/nft" element={<NetworkNFTPage />} />
          <Route
            path="/network/user-cards/social"
            element={<NetworkSocialPage />}
          />

          <Route
            path="/network/user-table/team-crew"
            element={<NetworkUserTableTeamCrewPage />}
          />

          <Route
            path="/network/user-table/app-roster"
            element={<NetworkAppRosterPage />}
          />

          <Route
            path="/network/user-table/market-authors"
            element={<NetworkMarketAuthorsPage />}
          />

          <Route
            path="/network/user-table/saas-users"
            element={<NetworkSaasUsersPage />}
          />

          <Route
            path="/network/user-table/store-clients"
            element={<NetworkStoreClientsPage />}
          />

          <Route
            path="/network/user-table/visitors"
            element={<NetworkVisitorsPage />}
          />

          <Route
            path="/auth/welcome-message"
            element={<AuthWelcomeMessagePage />}
          />

          <Route
            path="/auth/account-deactivated"
            element={<AuthAccountDeactivatedPage />}
          />

          <Route path="/store-client/home" element={<StoreClientPage />} />
          <Route
            path="/store-client/search-results-grid"
            element={<SearchResultsGridPage />}
          />

          <Route
            path="/store-client/search-results-list"
            element={<SearchResultsListPage />}
          />

          <Route
            path="/store-client/product-details"
            element={<ProductDetailsPage />}
          />

          <Route path="/store-client/wishlist" element={<WishlistPage />} />
          <Route
            path="/store-client/checkout/order-summary"
            element={<OrderSummaryPage />}
          />

          <Route
            path="/store-client/checkout/shipping-info"
            element={<ShippingInfoPage />}
          />

          <Route
            path="/store-client/checkout/payment-method"
            element={<PaymentMethodPage />}
          />

          <Route
            path="/store-client/checkout/order-placed"
            element={<OrderPlacedPage />}
          />

          <Route path="/store-client/my-orders" element={<MyOrdersPage />} />
          <Route
            path="/store-client/order-receipt"
            element={<OrderReceiptPage />}
          />

          <Route path="/store-admin/dashboard" element={<DashboardPage />} />
          <Route
            path="/store-admin/inventory/all-products"
            element={<AllProductsPage />}
          />

          <Route path="/auth/get-started" element={<AccountGetStartedPage />} />
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorRouting />} />
      <Route path="auth/*" element={<AuthRouting />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
}
