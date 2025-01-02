import HomePage from "../pages/protected/home.page";
import PlansPage from "../pages/protected/plans.page";
import ProductsPage from "../pages/protected/products.page";
import LoginPage from "../pages/sessions/login.page";
import { RoutingPathType } from "./route.interfaces";

export const rountingPathList: RoutingPathType[] = [
    {
        path: '/login',
        component: LoginPage,
        isProtected: false
    },
    {
        path: '/',
        component: HomePage,
        isProtected: true
    },
    {
        path: '/products',
        component: ProductsPage,
        isProtected: true
    },
    {
        path: '/plans',
        component: PlansPage,
        isProtected: true
    }
]