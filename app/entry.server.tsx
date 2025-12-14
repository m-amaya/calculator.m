import { createReadableStreamFromReadable } from '@react-router/node';
import { renderToPipeableStream } from 'react-dom/server';
import { ServerRouter, type EntryContext } from 'react-router';
import { Transform } from 'stream';

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter
        context={routerContext}
        url={request.url}
      />,
      {
        onShellReady() {
          shellRendered = true;
          const transform = new Transform({
            transform(chunk, encoding, callback) {
              callback(null, chunk);
            },
          });
          pipe(transform);
          const body = createReadableStreamFromReadable(transform);
          resolve(
            new Response(body, {
              status: responseStatusCode,
              headers: responseHeaders,
            }),
          );
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          if (!shellRendered) {
            reject(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
