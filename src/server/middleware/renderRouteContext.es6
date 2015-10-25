import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Html} from '~/src/server/components/Html';

function makeHtml(initialState, assets, content){
  return ReactDOMServer.renderToString(
    <Html
      title={'Breko Hubba'}
      initialState={initialState}
      headScripts={[assets.javascript.head]}
      bodyScripts={[assets.javascript.body]}
      headStyles={[assets.styles.body]}
      bodyStyles={[]}
    >
      {content}
    </Html>
  );
}

export default function(assets){
  return function *(next){
    const { routeContext } = this
    const html = makeHtml(
      {},
      assets,
      routeContext
    )
    this.response.body = `<!doctype html>${html}`
  }
}
