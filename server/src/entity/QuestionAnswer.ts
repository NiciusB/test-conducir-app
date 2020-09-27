import { Entity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
@Index(['username', 'questionID', 'didGuessCorrectly'])
export class QuestionAnswer {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column()
  username: string

  @Column()
  questionID: string

  @Column()
  didGuessCorrectly: boolean
}
