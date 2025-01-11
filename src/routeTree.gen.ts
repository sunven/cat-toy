/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PathlessImport } from './routes/_pathless'
import { Route as ToyPathlessImport } from './routes/toy/_pathless'

// Create Virtual Routes

const ToyImport = createFileRoute('/toy')()
const PathlessIndexLazyImport = createFileRoute('/_pathless/')()
const ToyPathlessFishLazyImport = createFileRoute('/toy/_pathless/fish')()

// Create/Update Routes

const ToyRoute = ToyImport.update({
  id: '/toy',
  path: '/toy',
  getParentRoute: () => rootRoute,
} as any)

const PathlessRoute = PathlessImport.update({
  id: '/_pathless',
  getParentRoute: () => rootRoute,
} as any)

const PathlessIndexLazyRoute = PathlessIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PathlessRoute,
} as any).lazy(() => import('./routes/_pathless.index.lazy').then(d => d.Route))

const ToyPathlessRoute = ToyPathlessImport.update({
  id: '/_pathless',
  getParentRoute: () => ToyRoute,
} as any)

const ToyPathlessFishLazyRoute = ToyPathlessFishLazyImport.update({
  id: '/fish',
  path: '/fish',
  getParentRoute: () => ToyPathlessRoute,
} as any).lazy(() => import('./routes/toy/_pathless.fish.lazy').then(d => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_pathless': {
      id: '/_pathless'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PathlessImport
      parentRoute: typeof rootRoute
    }
    '/toy': {
      id: '/toy'
      path: '/toy'
      fullPath: '/toy'
      preLoaderRoute: typeof ToyImport
      parentRoute: typeof rootRoute
    }
    '/toy/_pathless': {
      id: '/toy/_pathless'
      path: '/toy'
      fullPath: '/toy'
      preLoaderRoute: typeof ToyPathlessImport
      parentRoute: typeof ToyRoute
    }
    '/_pathless/': {
      id: '/_pathless/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof PathlessIndexLazyImport
      parentRoute: typeof PathlessImport
    }
    '/toy/_pathless/fish': {
      id: '/toy/_pathless/fish'
      path: '/fish'
      fullPath: '/toy/fish'
      preLoaderRoute: typeof ToyPathlessFishLazyImport
      parentRoute: typeof ToyPathlessImport
    }
  }
}

// Create and export the route tree

interface PathlessRouteChildren {
  PathlessIndexLazyRoute: typeof PathlessIndexLazyRoute
}

const PathlessRouteChildren: PathlessRouteChildren = {
  PathlessIndexLazyRoute: PathlessIndexLazyRoute,
}

const PathlessRouteWithChildren = PathlessRoute._addFileChildren(PathlessRouteChildren)

interface ToyPathlessRouteChildren {
  ToyPathlessFishLazyRoute: typeof ToyPathlessFishLazyRoute
}

const ToyPathlessRouteChildren: ToyPathlessRouteChildren = {
  ToyPathlessFishLazyRoute: ToyPathlessFishLazyRoute,
}

const ToyPathlessRouteWithChildren = ToyPathlessRoute._addFileChildren(ToyPathlessRouteChildren)

interface ToyRouteChildren {
  ToyPathlessRoute: typeof ToyPathlessRouteWithChildren
}

const ToyRouteChildren: ToyRouteChildren = {
  ToyPathlessRoute: ToyPathlessRouteWithChildren,
}

const ToyRouteWithChildren = ToyRoute._addFileChildren(ToyRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof PathlessRouteWithChildren
  '/toy': typeof ToyPathlessRouteWithChildren
  '/': typeof PathlessIndexLazyRoute
  '/toy/fish': typeof ToyPathlessFishLazyRoute
}

export interface FileRoutesByTo {
  '/toy': typeof ToyPathlessRouteWithChildren
  '/': typeof PathlessIndexLazyRoute
  '/toy/fish': typeof ToyPathlessFishLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_pathless': typeof PathlessRouteWithChildren
  '/toy': typeof ToyRouteWithChildren
  '/toy/_pathless': typeof ToyPathlessRouteWithChildren
  '/_pathless/': typeof PathlessIndexLazyRoute
  '/toy/_pathless/fish': typeof ToyPathlessFishLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/toy' | '/' | '/toy/fish'
  fileRoutesByTo: FileRoutesByTo
  to: '/toy' | '/' | '/toy/fish'
  id: '__root__' | '/_pathless' | '/toy' | '/toy/_pathless' | '/_pathless/' | '/toy/_pathless/fish'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  PathlessRoute: typeof PathlessRouteWithChildren
  ToyRoute: typeof ToyRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  PathlessRoute: PathlessRouteWithChildren,
  ToyRoute: ToyRouteWithChildren,
}

export const routeTree = rootRoute._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_pathless",
        "/toy"
      ]
    },
    "/_pathless": {
      "filePath": "_pathless.tsx",
      "children": [
        "/_pathless/"
      ]
    },
    "/toy": {
      "filePath": "toy",
      "children": [
        "/toy/_pathless"
      ]
    },
    "/toy/_pathless": {
      "filePath": "toy/_pathless.tsx",
      "parent": "/toy",
      "children": [
        "/toy/_pathless/fish"
      ]
    },
    "/_pathless/": {
      "filePath": "_pathless.index.lazy.tsx",
      "parent": "/_pathless"
    },
    "/toy/_pathless/fish": {
      "filePath": "toy/_pathless.fish.lazy.tsx",
      "parent": "/toy/_pathless"
    }
  }
}
ROUTE_MANIFEST_END */
