module.exports.jogo = (application, req, res) => {
    if (req.session.autorizado !== true) {
        res.send('loga ae feladaputa');
        return;
    }

    var connection = application.config.database;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, req.query.msg)
}

module.exports.sair = (application, req, res) => {
    req.session.destroy((err) => {
        res.render("index", { data: {}});
    })
}

module.exports.suditos = (application, req, res) => {
    if (req.session.autorizado !== true) {
        res.send('loga ae feladaputa');
        return;
    }

    res.render("aldeoes");
}

module.exports.pergaminhos = (application, req, res) => {
    if (req.session.autorizado !== true) {
        res.send('loga ae feladaputa');
        return;
    }

    res.render("pergaminhos");
}

module.exports.ordenar_acao = (application, req, res) => {
    req.assert('acao', "O campo ação é obrigatório").notEmpty();
    req.assert('quantidade', "O campo quantidade é obrigatório").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.redirect('jogo?msg=erro');
        return
    }

    var connection = application.config.database;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    var data = req.body
    data.usuario = req.session.usuario
    jogoDAO.acao(data)

    res.redirect('jogo?msg=sucesso');
}