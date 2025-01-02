import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { rountingPathList } from "./routes/routingpaths";
import SessionLayout from "./layouts/sessionlayout";
import ProtectedLayout from "./layouts/protectedlayout";

export const rootRoute = createRootRoute({

  component: () => {
    let session: string | null = localStorage.getItem('is_authenticated');
    if (session != 'true') {
      return <SessionLayout />
    } else {
      return <ProtectedLayout />
    }
  }
})


let routingChildrens: any[] = []

for (var i of rountingPathList) {
  routingChildrens.push(
    createRoute({
      beforeLoad: ({ location }) => {
        let session: string | null = localStorage.getItem('is_authenticated');
        if (location.pathname != '/login') {
          if (session != 'true') {
            throw redirect({
              to: "/login"
            })
          }
        } else {
          if (session == 'true') {
            throw redirect({
              to: "/"
            })
          }
        }
      },
      path: i.path,
      getParentRoute: () => rootRoute,
      component: i.component,
    })
  )
}

const routeTree = rootRoute.addChildren(routingChildrens);

export const router = createRouter({ routeTree })