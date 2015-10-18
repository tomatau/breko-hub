import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Html} from '~/src/server/components/Html';

function makeHtml(initialState, content){
  return ReactDOMServer.renderToString(
    <Html
      title={'Breko Hub'}
      initialState={initialState}
      headScripts={['/head.js']}
      bodyScripts={['/body.js']}
    >
      {content}
    </Html>
  );
}

export default function(){
  return function *(next){
    const { routeContext } = this;
    const html = makeHtml(
      {},
      routeContext
    )
    this.response.body = `<!doctype html>${html}`;
  }
}
