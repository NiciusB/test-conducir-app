export default async function loadRandomQuestion () {
  return await fetch(process.env.REACT_APP_API_URL + '/question')
    .catch(() => { throw new Error('Unable to reach API') })
    .then(res => res.json())
    .catch(() => { throw new Error('Unable to parse API response') })
}
