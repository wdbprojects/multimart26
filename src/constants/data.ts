import { routes } from "@/config/routes";
import { IDashboardSidebarMenu } from "@/config/types";

export const adminDashboardDataLinks: IDashboardSidebarMenu[] = [
  { id: 1, label: "Dashboard", icon: "dashboard", url: routes.dashboardAdmin },
  {
    id: 2,
    label: "Stores",
    icon: "stores",
    url: `${routes.dashboardAdmin}/stores`,
  },
  {
    id: 3,
    label: "Orders",
    icon: "orders",
    url: `${routes.dashboardAdmin}/orders`,
  },
  {
    id: 4,
    label: "Categories",
    icon: "categories",
    url: `${routes.dashboardAdmin}/categories`,
  },
  {
    id: 5,
    label: "Sub Categories",
    icon: "categories",
    url: `${routes.dashboardAdmin}/sub-categories`,
  },
  {
    id: 6,
    label: "Offer Tags",
    icon: "offer",
    url: `${routes.dashboardAdmin}/offer-tags`,
  },
  {
    id: 7,
    label: "Coupons",
    icon: "coupon",
    url: `${routes.dashboardAdmin}/coupons`,
  },
];

export const sellerDashboardDataLinks: IDashboardSidebarMenu[] = [
  { id: 1, label: "Dashboard", icon: "dashboard", url: routes.dashboardSeller },
  {
    id: 2,
    label: "Products",
    icon: "products",
    url: `${routes.dashboardSeller}/products`,
  },
  {
    id: 3,
    label: "Orders",
    icon: "orders",
    url: `${routes.dashboardSeller}/orders`,
  },
  {
    id: 4,
    label: "Inventory",
    icon: "inventory",
    url: `${routes.dashboardSeller}/inventory`,
  },
  {
    id: 5,
    label: "Coupons",
    icon: "coupon",
    url: `${routes.dashboardSeller}/coupons`,
  },
  {
    id: 6,
    label: "Shipping",
    icon: "shipping",
    url: `${routes.dashboardSeller}/shipping`,
  },
  {
    id: 7,
    label: "Settings",
    icon: "settings",
    url: `${routes.dashboardSeller}/settings`,
  },
];
