import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@Index(['username', 'questionID', 'didGuessCorrectly'])
export class QuestionAnswer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  questionID: string

  @Column()
  didGuessCorrectly: boolean
}
