import { produtoService } from "../services/produtos.service.js";

export const produtosRoute = (app) => {
    app.get('/produtos', produtoService.buscarTodos);
    app.get('/produto/:id', produtoService.buscarPorId)
    app.post('/produto', produtoService.criarProduto);
    app.put('/produto/:id', produtoService.atualizar);
    app.delete('/produto/:id', produtoService.delete);
}