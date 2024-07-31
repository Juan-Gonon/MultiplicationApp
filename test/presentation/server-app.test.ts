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

    beforeEach(() => {
        jest.clearAllMocks()
    })



    it('should create ServerApp instance', () => {
        
        const serverApp = new ServerApp()

        expect(serverApp).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run ).toBe('function')

    })

    it('should run ServerApp with options ', () => {

        
        const logSpy = jest.spyOn(console, 'log')
        const createdTableSpy = jest.spyOn(CreateTable.prototype,'execute')
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')

       
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

    it('should run with custom values mocked ', () => {

        const logMock = jest.fn()
        const logErrorMock = jest.fn()
        const createMocked = jest.fn().mockReturnValue('1 x 2 = 2')
        const saveFileMock = jest.fn().mockReturnValue(true)

        CreateTable.prototype.execute = createMocked;
        SaveFile.prototype.execute = saveFileMock;
        global.console.log = logMock;
        global.console.error = logErrorMock;



         ServerApp.run(options)

         expect(logMock).toHaveBeenCalledWith('Server running...')
         expect(createMocked).toHaveBeenCalledWith({"base": options.base, "limit": options.limit})
         expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: "1 x 2 = 2",
            fileDestination: options.destination,
            fileName: options.name
         })

         expect(logMock).toHaveBeenCalledWith('File created')
         expect(logErrorMock).not.toHaveBeenCalled()



    })
})