import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Jobs extends BaseSchema {
  protected tableName = 'jobs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
