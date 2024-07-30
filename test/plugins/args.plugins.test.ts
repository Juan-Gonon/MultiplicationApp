// import { yarg } from '../../src/plugins/args.plugins'

const runCommand = async (args : string[]) => {
    process.argv = [...process.argv, ...args]

    const { yarg } = await import('../../src/plugins/args.plugins')

    return yarg
}


describe('Test arg.plugins.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        // cleanup
        process.argv = originalArgv;
        jest.resetModules(); // reset modules

    })

    it('should return default values', async() => {

       const argv =  await runCommand(['-b', '5'])

    //    console.log(process.argv)
    // console.log(argv)

    expect(argv).toBeTruthy()
    expect(argv).toEqual(expect.objectContaining(
        {
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: './outputs',
        }
    ))

    })

    it('should return configuration  with custom values', async  () => {
       
        const argv =  await runCommand(['-b', '10', '-l', '20', '-s', '-n', 'test', '-d', 'cdTest'])



        expect(argv).toEqual(
            expect.objectContaining(
                {
                    b: 10,
                    l: 20,
                    s: true,
                    n: 'test',
                    d: 'cdTest',
                }
            )
        )

    })



})