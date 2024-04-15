import { config } from "../db/config/index.js";

export const produtoService = {
    buscarTodos: async (req, res) => {
        const result = await config.query('SELECT * FROM produtos');
        return result.rows;
    },
    buscarPorId: async (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM produtos where id = ${id}`
        console.log(`[QUERY]: ${query}`);
    
        const result = await config.query(query);
    
        if(result.rows.length === 0) {
            res.status(404).send(`Produto com o id: ${id} não encontrado!`)
            return;
        }
        return result.rows;
    },
    criarProduto: async (req, res) => {
        // adicionar condição para quando passar o id que não existe no banco
        const { nome, descricao, desconto, preco, ativo, categoria, data_cadastro } = req.body;
    
        try {
            const query = 'INSERT INTO produtos (nome, descricao, desconto, preco, ativo, categoria, data_cadastro) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
            const values = [nome, descricao, desconto, preco, ativo, categoria, data_cadastro];
            const result = await config.query(query, values);
            res.send(result.rows[0]);
        } catch (err) {
            console.log('Erro ao inserir produto:', err);
            res.status(500).send('Erro ao inserir produto');
        }
    },
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { nome, descricao, desconto, preco, ativo, categoria, data_cadastro } = req.body;
    
        try {
            const query = 'UPDATE produtos SET nome=$1, descricao=$2, desconto=$3, preco=$4, ativo=$5, categoria=$6, data_cadastro=$7 WHERE id=$8 RETURNING *';
            const values = Object.keys(req.body) //[nome, descricao, desconto, preco, ativo, categoria, data_cadastro, id];
            const result = await config.query(query, values);
            
            if (result.rows.length === 0) {
                res.status(404).send('Produto não encontrado');
            } else {
                res.send(result.rows[0]);
            }
        } catch (err) {
            console.log('Erro ao atualizar produto:', err);
            res.status(500).send('Erro ao atualizar produto');
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
    
        try {
            const query = 'DELETE FROM produtos WHERE id=$1 RETURNING *';
            const result = await config.query(query, [id]);
    
            if (result.rows.length === 0) {
                res.status(404).send('Produto não encontrado');
            } else {
                res.send('Produto excluído com sucesso');
            }
        } catch (err) {
            console.log('Erro ao excluir produto:', err);
            res.status(500).send('Erro ao excluir produto');
        }
    }
}