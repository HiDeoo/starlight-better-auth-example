import { ActionError, defineAction, type ActionErrorCode } from 'astro:actions'
import { z } from 'astro:schema'
import { APIError } from 'better-auth/api'
import { auth } from '../auth'

export const server = {
  signUp: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      // These constraints are the default ones from Better Auth.
      password: z.string().min(8).max(32),
    }),
    handler: async (input) => {
      try {
        await auth.api.signUpEmail({
          body: {
            name: input.name,
            email: input.email,
            password: input.password,
          },
        })
      } catch (error) {
        throwActionAuthError('BAD_REQUEST', error)
      }
    },
  }),
  signIn: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    handler: async (input, ctx) => {
      try {
        const response = await auth.api.signInEmail({
          body: {
            email: input.email,
            password: input.password,
          },
          headers: ctx.request.headers,
          asResponse: true,
        })
        return { cookies: response.headers.getSetCookie() }
      } catch (error) {
        throwActionAuthError('UNAUTHORIZED', error)
      }
    },
  }),
  signOut: defineAction({
    accept: 'form',
    handler: async (_input, ctx) => {
      try {
        const response = await auth.api.signOut({
          headers: ctx.request.headers,
          asResponse: true,
        })
        return { cookies: response.headers.getSetCookie() }
      } catch (error) {
        throwActionAuthError('BAD_REQUEST', error)
      }
    },
  }),
}

function throwActionAuthError(code: ActionErrorCode, error: unknown): never {
  throw new ActionError({
    code,
    message: error instanceof APIError ? `${error.body.message}.` : 'Something went wrong, please try again later.',
  })
}
