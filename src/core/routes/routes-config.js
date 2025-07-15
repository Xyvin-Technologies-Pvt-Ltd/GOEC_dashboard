
import DashboardLayout from "../../layout/dashboardLayout";
import Login from "../../pages/Login";
import { Navigate } from "react-router-dom";

import ChargingStation from "../../pages/chargeStation";

import NotFoundPage from "../../pages/NotFound";
import CTariff from "../../pages/cTariff";
import ATariff from "../../pages/aTariff";
import ChargeStationDetail from "../../components/assetManagement/chargeStations/chargeStationDetail";
import ChargingPoints from "../../pages/chargePoints";
import ChargePointDetail from "../../components/assetManagement/chargePoints/chargePointDetail";
import RfidCards from "../../pages/RfidCards";
import CTax from "../../pages/cTax";
import EvChargers from "../../pages/EvChargers";
import Vehicles from "../../pages/EvVehicles";
import Manufactures from "../../pages/Manufactures";
import StartRemoteSession from "../../pages/StartRemoteSession";
import ActiveSessionPage from "../../pages/ActiveSession";
import AMSettings from "../../pages/AMSettings";
import AASettings from "../../pages/AASettings";
import RMSettings from "../../pages/RMSettings";
import ChargingTransactions from "../../pages/ChargingTransactions";
import ChargerLogs from "../../pages/ChargerLogs";
import SearchCustomer from "../../pages/SearchCustomer";
import CustomerList from "../../pages/CustomerList";
import LiveStatus from "../../pages/LiveStatus";
import Reports from "../../pages/Reports";
import UserDetails from "../../components/crm/userDetails";
import AccountTransactions from "../../pages/AccountTransactions";
import Help from "../../pages/Help";
import Analytics from "../../pages/analytics";
import Alarms from "../../pages/alarms";
import PrivateRoute from "./private-route";
import EmailNotification from "../../components/notification/emailNotification/EmailNotification";
import AppNotification from "../../components/notification/appNotification/AppNotification";
import { permissions } from "./permissions";
import Logs from "../../pages/Logs";


const RoutesConfig = () => {

    return [

        {
            path: '/',
            element: <Navigate to="/dashboard/live-status" replace />,
        },
        {
            path: '/user-details/:id',
            element: <UserDetails />,
        },
        {
            path: 'charge-station-detail/:id',
            element: <ChargeStationDetail />,
        }
        ,
        {
            path: 'charge-point-detail/:id',
            element: <ChargePointDetail />,
        },
   
        {
            path: '/login',
            element: <Login />,
         
        },

      
        //!---------Dashboard
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'live-status',
                    // element:  <PrivateRoute element={<LiveStatus  />} requiredPermission="admin" />,
                    element:  <PrivateRoute element={<LiveStatus  />} requiredPermission={permissions.liveStatus.view} />,

                },
                {
                    path: 'analytics',
                    element:  <PrivateRoute element={<Analytics />} requiredPermission={permissions.analytics.view} />,
                },
                {
                    path: 'alarms',
                    element:  <PrivateRoute element={<Alarms />} requiredPermission={permissions.alarms.view} />,
                }
            ]
        },
        //!---------Asset management
        {
            path: '/asset-management',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'charge-stations',
                    element:  <PrivateRoute element={<ChargingStation />} requiredPermission={permissions.chargingStations.view} />,
                },
                {
                    path: 'charge-points',
                    element:  <PrivateRoute element={<ChargingPoints />} requiredPermission={permissions.chargePoint.view} />,
                }
            ]
        },
        //!---------Tag management
        {
            path: '/tag-management',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'rfid-cards',
                    element:  <PrivateRoute element={<RfidCards />} requiredPermission={permissions.rfid.view} />,
                },
                // {
                //     path: 'vid-cards',
                //     element:  <PrivateRoute element={<VidCards />} requiredPermission={permissions.rfid.view} />,
                // }
            ]
        },

        //!---------Data management
        {
            path: '/data-management',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'ev-chargers',
                    element:  <PrivateRoute element={ < EvChargers />} requiredPermission={permissions.evChargersModel.view} />,
                },
                {
                    path: 'ev-vehicles',
                    element:  <PrivateRoute element={<Vehicles />} requiredPermission={permissions.evVehicle.view} />,
                },
                {
                    path: 'manufacturers',
                    element:  <PrivateRoute element={<Manufactures />} requiredPermission={permissions.manufacture.view} />,
                }
            ]
        },

        //!---------Charging Network
        {
            path: '/charging-network',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'charging-transaction',
                    element:  <PrivateRoute element={<ChargingTransactions />} requiredPermission={permissions.chargingTransaction.view} />,
                },
                {
                    path: 'charger-logs',
                    element:  <PrivateRoute element={<ChargerLogs />} requiredPermission={permissions.chargeLogs.view} />,
                },
                // {
                //     path: 'booking-transaction',
                //     element:  <PrivateRoute element={<BookingTransactions />} requiredPermission={permissions.analytics.view} />,
                // }
            ]
        },
        //!---------Accounts
        {
            path: '/accounts',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'account-transaction',
                    element:  <PrivateRoute element={<AccountTransactions />} requiredPermission={permissions.accountTransactions.view} />,
                },
                // {
                //     path: 'financials',
                //     element:  <PrivateRoute element={<UnderConstruction />} requiredPermission={permissions.analytics.view} />,
                // }
            ]
        },
        //!---------CRM
        {
            path: '/crm',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'search-customer',
                    element:  <PrivateRoute element={<SearchCustomer />} requiredPermission={permissions.searchCustomer.view} />,
                },
                {
                    path: 'customer-list',
                    element:  <PrivateRoute element={<CustomerList />} requiredPermission={permissions.customerList.view} />,
                }
            ]
        },
        //!---------Tariff
        {
            path: '/tariff',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'charging-tariff',
                    element:  <PrivateRoute element={<CTariff />} requiredPermission={permissions.chargingTariff.view} />,
                },
                {
                    path: 'assign-tariff',
                    element:  <PrivateRoute element={<ATariff />} requiredPermission={permissions.assignTariff.view} />,
                },
                {
                    path: 'tax',
                    element:  <PrivateRoute element={<CTax />} requiredPermission={permissions.tax.view} />,
                },

            ]
        },
        //!---------CPO
        {
            path: '/cpo-support',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'active-session',
                    element:  <PrivateRoute element={<ActiveSessionPage />} requiredPermission={permissions.activeSessions.view} />,
                },
                {
                    path: 'remote-session',
                    element:  <PrivateRoute element={<StartRemoteSession />} requiredPermission={permissions.startRemoteSession.view} />,
                },

            ]
        },
        //!---------Notification
        {
            path: '/notification',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'email-notification',
                    element:  <PrivateRoute element={<EmailNotification />} requiredPermission={permissions.emailNotification.view} />,
                },
                {
                    path: 'app-notifications',
                    element:  <PrivateRoute element={<AppNotification />} requiredPermission={permissions.inAppNotification.view} />,
                }

            ]
        },
        //!---------Report
        {
            path: '/report',
            element: <DashboardLayout />,
            children: [
                {
                    path: '',
                    element:  <PrivateRoute element={<Reports />} requiredPermission={permissions.report.view} />,
                }
            ]
        },
        //!---------Logs
        {
            path: '/logs',
            element: <DashboardLayout />,
            children: [
                {
                    path: '',
                    element:  <PrivateRoute element={<Logs />} requiredPermission={permissions.report.view} />,
                }
            ]
        },
        //!---------Settings
        {
            path: '/settings',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'admin-manangement',
                    element:  <PrivateRoute element={<AMSettings />} requiredPermission={permissions.adminManagement.view} />,
                },
                {
                    path: 'role-management',
                    element:  <PrivateRoute element={<RMSettings />} requiredPermission={permissions.roleManagement.view} />,
                },
                {
                    path: 'admin-activity',
                    element:  <PrivateRoute element={<AASettings />} requiredPermission={permissions.adminActivity.view} />,
                },

            ]

        },
        //!---------Help
        {
            path: '/help',
            element: <DashboardLayout />,
            children: [
                {
                    path: '',
                    element:  <Help />,
                }
            ]
        },
        //!---------404 Not Found
        {
            path: '*',
            element: <NotFoundPage />
        },

    ]


   
}
export default RoutesConfig;