import { permissions } from "../../routes/permissions";
import {
    AccountIcon,
    CPOIcon,
    AssetManageIcon,
    CRMIcon,
    ChargingIcon,
    DashboardIcon,
    DataManageIcon,
    HelpIcon,
    NotificationIcon,
    ReportIcon,
    SettingsIcon,
    TagManageIcon,
    TariffIcon,
} from "../icons/sidebar";

export const siderbarListItems = () => {


    const list = [
        {
            icon: (<DashboardIcon />),
            title: 'Dashboard',
            extendable: true,

            sub: [
                {
                    href: 'dashboard/live-status',
                    title: 'Live Status',
                    requiredRoles: [permissions.liveStatus.view]
                },
                {
                    href: 'dashboard/analytics',
                    title: 'Analytics',
                    requiredRoles: [permissions.analytics.view]
                },
                {
                    href: 'dashboard/alarms',
                    title: 'Alarms',
                    requiredRoles: [permissions.alarms.view]
                }
            ]
        },
        {
            icon: (<AssetManageIcon />),
            title: 'Asset Management',
            extendable: true,
            sub: [
                {
                    href: 'asset-management/charge-stations',
                    title: 'Charge Stations',
                    requiredRoles: [permissions.chargingStations.view]
                },
                {
                    href: 'asset-management/charge-points',
                    title: 'Charge Points',
                    requiredRoles: [permissions.chargePoint.view]
                }
            ]
        },
        {
            icon: (<TagManageIcon />),
            title: 'Tag Management',
            extendable: true,
            sub: [
                {
                    href: 'tag-management/rfid-cards',
                    title: 'RFID Cards',
                    requiredRoles: [permissions.rfid.view]
                },
                // {
                //     href: 'tag-management/vid-cards',
                //     title: 'VID Cards',
                // }
            ]
        },
        {
            icon: (<DataManageIcon />),
            title: 'Data Management',
            extendable: true,
            sub: [
                {
                    href: 'data-management/ev-chargers',
                    title: 'EV chargers model',
                    requiredRoles: [permissions.evChargersModel.view]
                },
                {
                    href: 'data-management/ev-vehicles',
                    title: 'EV vehicles',
                    requiredRoles: [permissions.evVehicle.view]
                },
                {
                    href: 'data-management/manufacturers',
                    title: 'Manufacturers',
                    requiredRoles: [permissions.manufacture.view]
                }
            ]
        },
        {
            icon: (<ChargingIcon />),
            title: 'charging-network',
            extendable: true,
            sub: [
                {
                    href: 'charging-network/charging-transaction',
                    title: 'Charging Transaction',
                    requiredRoles: [permissions.chargingTransaction.view]
                },
                {
                    href: 'charging-network/charger-logs',
                    title: 'Charger Logs',
                    requiredRoles: [permissions.chargeLogs.view]
                },
                // {
                //     href: 'charging-network/booking-transaction',
                //     title: 'Booking Transaction',
                // }
            ]
        },
        {
            icon: (<AccountIcon />),
            title: 'Accounts',
            extendable: true,
            sub: [
                {
                    href: 'accounts/account-transaction',
                    title: 'Account Transactions',
                    requiredRoles: [permissions.accountTransactions.view]
                },
                // {
                //     href: 'accounts/financials',
                //     title: 'Financials',
                // }
            ]
        },
        {
            icon: (<CRMIcon />),
            title: 'CRM',
            extendable: true,
            sub: [
                {
                    href: 'crm/search-customer',
                    title: 'Search Customer',
                    requiredRoles: [permissions.searchCustomer.view]
                },
                {
                    href: 'crm/customer-list',
                    title: 'Customer List',
                    requiredRoles: [permissions.customerList.view]
                }
            ]
        },
        {
            icon: (<TariffIcon />),
            title: 'Tariff',
            extendable: true,
            sub: [
                {
                    href: 'tariff/charging-tariff',
                    title: 'Charging Tariff',
                    requiredRoles: [permissions.chargingTariff.view]
                },
                {
                    href: 'tariff/assign-tariff',
                    title: 'Assign Tariff',
                    requiredRoles: [permissions.assignTariff.view]
                },
                {
                    href: 'tariff/tax',
                    title: 'Tax',
                    requiredRoles: [permissions.tax.view]
                }
            ]
        },
        {
            icon: (<CPOIcon />),
            title: 'CPO Support',
            extendable: true,
            sub: [
                {
                    href: 'cpo-support/active-session',
                    title: 'Active Session',
                    requiredRoles: [permissions.activeSessions.view]
                },
                {
                    href: 'cpo-support/remote-session',
                    title: 'Start remote session ',
                    requiredRoles: [permissions.startRemoteSession.view]
                }
            ]
        },
        {
            icon: (<NotificationIcon />),
            title: 'Notification',
            extendable: true,
            sub: [
                {
                    href: 'notification/email-notification',
                    title: 'Email Notification',
                    requiredRoles: [permissions.emailNotification.view]
                },
                {
                    href: 'notification/app-notifications',
                    title: 'In-App Notifications',
                    requiredRoles: [permissions.inAppNotification.view]
                }
            ]
        },
        {
            icon: (<ReportIcon />),
            title: 'Report',
            href: 'report',
            extendable: false,
            requiredRoles: [permissions.report.view]
        },
        {
            icon: (<AccountIcon />),
            title: 'Logs',
            href: 'logs',
            extendable: false,
            requiredRoles: [permissions.logs.view]
        },
        {
            icon: (<SettingsIcon />),
            title: 'Settings',
            extendable: true,
            sub: [
                {
                    href: 'settings/admin-manangement',
                    title: 'Admin Management',
                    requiredRoles: [permissions.adminManagement.view]
                },
                {
                    href: 'settings/role-management',
                    title: 'Role Management',
                    requiredRoles: [permissions.roleManagement.view]
                },
                {
                    href: 'settings/admin-activity',
                    title: 'Admin Activity',
                    requiredRoles: [permissions.adminActivity.view]
                }
            ]
        },
        {
            icon: (<HelpIcon />),
            title: 'Help',
            href: 'help',
            extendable: false
        }
    ]

    return list
}