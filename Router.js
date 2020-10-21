import React, { Suspense } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import routes from '../../router'
import CLayout from 'SRC_COMP/basic/Layout'
import rootStore from '@/store/rootStore'
const { PATH_PREFIX, isCheckAuth, defaultRoute } = window.DATACENTERAPP
const renderRoutes = (routes, { ...singlespa }) => {
  if (!Array.isArray(routes)) {
    return null
  }

  return (
    <Switch>
      {routes.map((route, index) => {
        if (route.redirect) {
          return (
            <Route
              key={PATH_PREFIX + route.path || index}
              path={route.path}
              exact={route.exact}
              render={() => (
                <Redirect
                  from={PATH_PREFIX + route.path}
                  to={PATH_PREFIX + route.redirect}
                />
              )}
            />
          )
        }

        return (
          <Route
            key={PATH_PREFIX + route.path || index}
            path={PATH_PREFIX + route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => {
              let renderChildRoutes = renderRoutes(route.children, {
                ...singlespa,
              })
              if (route.layout && route.children && route.children.length) {
                renderChildRoutes = <CLayout>{renderChildRoutes}</CLayout>
              }
              if (route.component) {
                // let routeComp = null
                if (isCheckAuth && route.check) {
                  if (rootStore.checkAuth(route.id)) {
                    return (
                      <Suspense fallback={<div>Loading...</div>}>
                        <route.component
                          {...props}
                          singlespa={singlespa}
                          route={route}
                          routes={route.children}
                        >
                          {renderChildRoutes}
                        </route.component>
                      </Suspense>
                    )
                  } else {
                    return (
                      <Redirect
                        from={PATH_PREFIX + route.path}
                        to={PATH_PREFIX + '/noauth'}
                      />
                    )
                  }
                } else {
                  return (
                    <Suspense fallback={<div>Loading...</div>}>
                      <route.component
                        {...props}
                        singlespa={singlespa}
                        route={route}
                        routes={route.children}
                      >
                        {renderChildRoutes}
                      </route.component>
                    </Suspense>
                  )
                }
              }
              return renderChildRoutes
            }}
          />
        )
      })}
    </Switch>
  )
}

const Routers = ({ ...singlespa }) => {
  return (
    <HashRouter>
      <div id="aevt-container">{renderRoutes(routes, { ...singlespa })}</div>
    </HashRouter>
  )
}

export default Routers
