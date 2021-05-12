module.exports.cadastro = (application, req, res) => {
    res.render("cadastro", { data: {} });
}

module.exports.cadastrar = (application, req, res) => {
    req.assert('nome', "O campo nome não pode ser vazio").notEmpty();
    req.assert('usuario', "O campo usuario não pode ser vazio").notEmpty();
    req.assert('senha', "O campo senha não pode ser vazio").notEmpty();
    req.assert('casa', "O campo casa não pode ser vazio").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('cadastro', { validacao: errors, data: req.body });
        return;
    }

    var connection = application.config.database;
    var usuarioDAO = new application.app.models.UsuarioDAO(connection);
    var jogoDAO = new application.app.models.JogoDAO(connection);

    usuarioDAO.inserirUsuario(req.body)
    jogoDAO.gerarParametros(req.body.usuario);

    res.send("cadastrado, cabeça de rola");
}