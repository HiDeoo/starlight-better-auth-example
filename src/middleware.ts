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

  // Allow access to customers pages only if the user is signed in.
  if (context.url.pathname.startsWith('/customers') && !isSignedIn) {
    return context.redirect('/sign-in')
  }

  return next()
})
