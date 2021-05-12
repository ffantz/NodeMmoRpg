function UsuarioDAO(connection){
    this._connection = connection();
}

UsuarioDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function (err, mongoClient){
        mongoClient.collection("usuarios", function(err, collection){
            collection.insert(usuario);
            mongoClient.close();
        })
    })
}

UsuarioDAO.prototype.autenticar = function(data, req, res){
    this._connection.open(function (err, mongoClient){
        mongoClient.collection("usuarios", function(err, collection){
            collection.find(data).toArray(function(err, result){
                if (result.length > 0) {
                    req.session.autorizado = true;
                    req.session.usuario    = result[0].usuario;
                    req.session.casa       = result[0].casa;
                }

                if (req.session.autorizado) {
                    res.redirect("jogo")
                } else {
                    res.render("index", { data: {} })
                }
            });
            mongoClient.close();
        })
    })
}

module.exports = () => {
    return UsuarioDAO;
}