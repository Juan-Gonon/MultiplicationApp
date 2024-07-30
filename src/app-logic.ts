import fs from 'fs'
import { yarg } from './plugins/args.plugins'

const header:string = `
    =============================
            Tabla del 5
    =============================
`
const base:number = yarg.b
let message:string = ''



for(let i=0; i<yarg.l; i++){
    
    message += `${base} x ${i+1} = ${base * (i+1)}\n`
}


const table:string = header + message

if(yarg.s) console.log(table)

fs.mkdirSync('outputs', {recursive: true})
fs.writeFileSync(`outputs/tabla-${base}.txt`, table)

console.log('Failed completed!!')

