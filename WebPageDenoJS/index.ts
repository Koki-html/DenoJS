import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {

    const {pathname } = new URL(req.url);

    if (pathname === '/') {
        const content = await Deno.readFile('WebPageDenoJS/public/html/index.html');

        return new Response(content, {
            status: 200,
            headers: {
                'Content-Type': 'Text/html; charset=utf-8'
            }
        })
    } else {
        return new Response('Not Found', { status: 400 })
    }

}

await serve(handler, {
    port: 6969,

})