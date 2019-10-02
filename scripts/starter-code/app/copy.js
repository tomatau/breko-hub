import React from 'react'

export const app = {
  loading: `Loading...`,
  title: `App`,
  meta: {
    description: `An app`,
    keywords: `app`,
  },
}


export const homeRoute = {
  content: (
    <>
      <h2>Home route</h2>
      <p>Content in copy file.</p>
    </>
  ),
}

export const notFoundRoute = {
  documentTitle: `Doesn't exist`,
  content: (
    <>
      <h2>404</h2>
      <p>Page not found!</p>
    </>
  ),
}

export const oopsRoute = {
  documentTitle: `Oopsies`,
  content: (
    <>
      <h2>There was a problem</h2>
      <p>Contact an administrator.</p>
    </>
  ),
}
