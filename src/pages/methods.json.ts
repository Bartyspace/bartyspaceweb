import type {APIRoute} from 'astro';

export const ALL: APIRoute = ({request}) => {
  return new Response(
    JSON.stringify({
      message: `This was a ${request.method}!`
    })
  );
};
