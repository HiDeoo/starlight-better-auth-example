import { defineMiddleware } from 'astro:middleware'
import { auth } from './auth'

export const onRequest = defineMiddleware(async (context, next) => {
  const session = await auth.api.getSession({ headers: context.request.headers })
  const isSignedIn = session !== null

  context.locals.isSignedIn = isSignedIn

  if (context.url.pathname === '/sign-out' && !isSignedIn) {
    return context.redirect('/')
  } else if ((context.url.pathname === '/sign-in' || context.url.pathname === '/sign-up') && isSignedIn) {
    return context.redirect('/')
  }

  return next()
})
