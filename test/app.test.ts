// process.argv = ['node', 'app.ts', '-b', '10']
// import '../src/app'
import { ServerApp } from '../src/presentation/server-app'

describe('App', () => {

    it('should call Server.run with values', async () => {

        const serverRunMock = jest.fn();

        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '10','-s', '-n', 'test-file']

        await import('../src/app')

        expect(serverRunMock).toHaveBeenCalledWith(
            {"base": 10, "destination": "./outputs", "limit": 10, "name": "test-file", "showTable": true}
        )

        
        


    })
})