import { SaveFile } from '../../../src/domain/use-cases/save-filte.use-case'
import fs, { ftruncate }  from 'fs'

describe('SaveFileUseCase', () => {

    // beforeEach(() => {
    //     fs.rmSync('outputs', { recursive: true })
    // })

    afterEach(() => {
        // clean up
        fs.rmSync('outputs', { recursive: true })
    })

    it('should save file with default values', () => {

        const options = {
            fileContent: 'test content'
        }
        const filePath= 'outputs/table.txt'

        const saveFile = new SaveFile()

        const result = saveFile.execute(options)
        const fileExist = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

        expect(result).toBeTruthy()
        expect(fileExist).toBeTruthy()
        expect(fileContent).toBe(options.fileContent)



    })

})