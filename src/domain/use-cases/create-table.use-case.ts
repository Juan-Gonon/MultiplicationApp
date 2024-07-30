export interface CreateTableUseCse{
    execute: (options: CreateTableOptions) => string
}

export interface CreateTableOptions{
    base: number;
    limit?: number;
}


export class CreateTable implements CreateTableUseCse {
    constructor(){
        /**
         * 01 - DI - Dependency Injection
         */
    }

    execute({ base, limit = 10 }:CreateTableOptions){
        let message = ''

        for(let i=0; i<limit; i++){
    
            message += `${base} x ${i+1} = ${base * (i+1)}\n`
        }

        return message
    }
}