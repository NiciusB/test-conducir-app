import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'

export let db: Connection

export default function startDatabase() {
  return createConnection().then((connection) => {
    db = connection
  })
}
