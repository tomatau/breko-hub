import React from 'react'

export const app = {
  loading: `Loading...`,
  title: `Breko Hub`,
  meta: {
    description: `A boilerplate for building universal react applications`,
    keywords: `react,redux,react-router,koa,universal,babel,webpack`,
  },
}

export const nav = {
  home: `Home`,
  bar: `Bar`,
  private: `Admin`,
}

export const homeRoute = {
  content: (
    <>
      <h2>Welcome to Breko-Hub!</h2>
      <p>A boilerplate designed for quick development!</p>
      <p>There are examples showing how you can customise to your needs.</p>
      <p>The server routes also auto update on changes!</p>
    </>
  ),
}

export const barRoute = {
  documentTitle: `Bar`,
  content: (
    <>
      <h2>The Bar Route!</h2>
      <p>API request to the <code>/api/bar</code> endpoint.</p>
    </>
  ),
}

export const privateRoute = {
  documentTitle: `Confidential`,
  flashMessage: `You were redirected because you can't view the private page`,
  content: (
    <>
      <h2>You shouldn&apos;t be here!</h2>
      <p>You may not view the private route!</p>
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
      <p>Something went oops, oh no!</p>
      <p>We need to fix it, but this is an example.</p>
      <p>Your developers and managers should change this page :)</p>
    </>
  ),
}
