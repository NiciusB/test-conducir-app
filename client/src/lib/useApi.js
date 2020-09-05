import { useCallback, useMemo } from 'react'
import { useUserState } from './user-context'

export default function useApi() {
  const user = useUserState()

  const baseRequest = useCallback(
    (method, path, body) => {
      return fetch(process.env.REACT_APP_API_URL + path, {
        method,
        headers: {
          'Content-Type': body ? 'application/x-www-form-urlencoded' : undefined,
          Authorization: user ? `Basic ${btoa(`${user.username}:`)}` : undefined,
        },
        body: body ? serializeQuery(body) : undefined,
      })
        .catch(() => {
          throw new Error('Unable to reach API')
        })
        .then((res) =>
          res.json().catch(() => {
            throw new Error('Unable to parse API response')
          })
        )
    },
    [user]
  )

  return useMemo(
    () => ({
      get: (path, query) => baseRequest('GET', path + (query ? '?' + serializeQuery(query) : '')),
      post: (path, body) => baseRequest('POST', path, body),
    }),
    [baseRequest]
  )
}

const serializeQuery = function (obj, prefix) {
  var str = []
  var p
  for (p in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p
      var v = obj[p]
      str.push(
        v !== null && typeof v === 'object' ? serializeQuery(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      )
    }
  }
  return str.join('&')
}
