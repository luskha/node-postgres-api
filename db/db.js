import { config } from "./config/index.js";
import 'dotenv/config'

export const connection = async () => {
    try {
        // Método connect é o que tenta a conexão com o bd
        await config.connect();

        const DB_NAME = process.env.DB_NAME || 'dc_22';

        const checkDatabaseQuery = `SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`;
        const databaseExists = await config.query(checkDatabaseQuery);

        if (databaseExists.rowCount === 0) {
            console.log(`${DB_NAME} database not found, creating it.`);
            await config.query(`CREATE DATABASE "${DB_NAME}";`);
            console.log(`created database ${DB_NAME}.`);
        } else {
            console.log(`${DB_NAME} database already exists.`);
        }

        config.database = DB_NAME; // Atualizando o nome do banco de dados para o recém-criado
        
        console.log('PostgreSQL connected successfully!');
        await createTableIfNotExists('produtos')
    } catch (err) {
        console.log('Erro ao conectar com o banco:', err);
    }
}

export const createTableIfNotExists = async tableName => {
    try {

        const checkTableQuery = `SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '${tableName}'`
        console.log(`QUERY: ${checkTableQuery}`);
        const tableExists = await config.query(checkTableQuery);

        if (tableExists.rowCount === 0) {
            console.log(`A tabela ${tableName} não existe, criando...`);

            const createTableQuery = `
                CREATE TABLE ${tableName} (
                    id SERIAL PRIMARY KEY,
                    nome VARCHAR(255) NOT NULL,
                    descricao TEXT,
                    desconto DECIMAL(10, 2) DEFAULT 0,
                    preco DECIMAL(10, 2) NOT NULL,
                    ativo BOOLEAN DEFAULT false,
                    categoria VARCHAR(255),
                    data_cadastro DATE NOT NULL
                );
            `;
            console.log(`QUERY: ${createTableQuery}`);
            const created = await config.query(createTableQuery);
            console.log(`A tabela ${tableName} foi criada com sucesso. ${created}`);
        } else {
            console.log(`A tabela ${tableName} já existe.`);
        }
    } catch (error) {
        console.error('Erro ao criar a tabela:', error);
    }
}