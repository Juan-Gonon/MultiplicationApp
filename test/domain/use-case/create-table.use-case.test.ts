import { CreateTable } from '../../../src/domain/use-cases/create-table.use-case'

describe('Use case CreateTable', () => { 

    it('should create table with default values', () => {

        const createTable = new CreateTable()

        const table = createTable.execute({ base: 2 })
        const rows = table.split('\n').length

        expect(createTable).toBeInstanceOf(CreateTable)
        expect(table).toContain('2 x 10 = 20')
        expect(rows).toBe(10)




    })
 })