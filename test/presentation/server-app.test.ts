import { CreateTable } from '../../src/domain/use-cases/create-table.use-case'
import { SaveFile } from '../../src/domain/use-cases/save-filte.use-case'
import { ServerApp } from '../../src/presentation/server-app'

describe('Server app', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: 'test-destination',
        name: 'test-fileName'
    }


    const logSpy = jest.spyOn(console, 'log')
    const createdTableSpy = jest.spyOn(CreateTable.prototype,'execute')
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')

    it('should create ServerApp instance', () => {
        
        const serverApp = new ServerApp()

        expect(serverApp).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run ).toBe('function')

    })

    it('should run ServerApp with options ', () => {

       
        ServerApp.run(options)

        expect(logSpy).toHaveBeenCalledTimes(2)
        expect(logSpy).toHaveBeenCalledWith('Server running...')
        expect(logSpy).toHaveBeenCalledWith('File created')

        expect(createdTableSpy).toHaveBeenCalledWith({"base": options.base, "limit": options.limit})

        expect(saveFileSpy).toHaveBeenCalledTimes(1)
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.destination,
            fileName: options.name
        })

       

    })
})