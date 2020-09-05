export default async function loadRandomQuestion () {
  return await fetch(process.env.REACT_APP_API_URL + '/question').then(res => res.json())
}
