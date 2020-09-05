import { Entity, Column, PrimaryColumn } from 'typeorm'

export type Answer = {
  id: string
  title: string
  isCorrect: boolean
}

@Entity()
export class Question {
  @PrimaryColumn()
  id: string

  @Column()
  title: string

  @Column()
  explanation: string

  @Column('simple-json')
  answers: Answer[]
}
