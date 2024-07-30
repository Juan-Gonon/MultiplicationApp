import { SaveFile } from '../../../src/domain/use-cases/save-filte.use-case'
import fs  from 'fs'

describe('SaveFileUseCase', () => {

    // beforeEach(() => {
    //     fs.rmSync('outputs', { recursive: true })
    // })

    afterEach(() => {
        // clean up

        const outputFolderExist = fs.existsSync('outputs')
        
        if(outputFolderExist) fs.rmSync('outputs', { recursive: true })
        
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

    it('should save file with custom values ', () => {

        const options = {
            fileContent: 'custom content',
            fileDestination: 'custom-outputs',
            fileName: 'custom-table-name'
        }

        const saveFile = new SaveFile()
        const path = `outputs/${options.fileDestination}/${options.fileName}.txt`
        const result = saveFile.execute({
            ...options,
            fileDestination: `outputs/${options.fileDestination}`
        })


        const fileExist = fs.existsSync(path)
        const fileContent = fs.readFileSync(path, { encoding: 'utf-8' })

        expect(result).toBeTruthy()
        expect(fileExist).toBeTruthy()
        expect(fileContent).toBe(options.fileContent)



    })

})