const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// Configuração do banco
const config = {
  user: 'sa',
  password: '1234567890',
  server: 'localhost',
  database: 'eae',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

//* ROTA DE LOGIN *\\
app.post('/api/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('login', sql.VarChar, login)
      .input('senha', sql.VarChar, senha)
      .query(`
        SELECT * FROM usuarios 
        WHERE (usuario = @login OR email = @login) AND senha = @senha
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    }
    const usuario = result.recordset[0];
    res.status(200).json({ 
      mensagem: 'Login bem-sucedido!', 
      temporaria: usuario.senha_temporaria === true 
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ erro: 'Erro no servidor durante o login.' });
  }
});


//* ROTA DE CADASTRO *\\
app.post('/api/cadastrar', async (req, res) => {
  const { nome, usuario, email, senha, telefone, dataNascimento } = req.body;

  console.log('Dados recebidos:', { nome, usuario, email, senha, telefone, dataNascimento });
  try {
    const pool = await sql.connect(config);
    const check = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM usuarios WHERE usuario = @usuario OR email = @email');

    if (check.recordset.length > 0) {
      return res.status(400).json({ erro: 'Usuário ou email já cadastrado.' });
    }
    await pool.request()
      .input('nome', sql.VarChar, nome)
      .input('usuario', sql.VarChar, usuario)
      .input('email', sql.VarChar, email)
      .input('senha', sql.VarChar, senha)
      .input('telefone', sql.VarChar, telefone)
      .input('dataNascimento', sql.Date, dataNascimento)
      .query(`
        INSERT INTO usuarios (nome, usuario, email, senha, telefone, data_nascimento)
        VALUES (@nome, @usuario, @email, @senha, @telefone, @dataNascimento)
      `);

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    res.status(500).json({ erro: 'Erro no servidor ao cadastrar.' });
  }
});
   //* ATUALIZAR SENHA DO BANCO *\\
app.post('/api/esqueceu-senha', async (req, res) => {
  const { login } = req.body;

  if (!login) {
    return res.status(400).json({ erro: 'Login (usuário ou email) é obrigatório.' });
  }

  try {
    const pool = await sql.connect(config);
    const resultado = await pool.request()
      .input('login', sql.VarChar, login)
      .query(`SELECT * FROM usuarios WHERE usuario = @login OR email = @login`);

    if (resultado.recordset.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }
    const senhaTemporaria = Math.random().toString(36).slice(-8); // Ex: "x9ab34cd"

    await pool.request()
      .input('senha', sql.VarChar, senhaTemporaria)
      .input('login', sql.VarChar, login)
      .query(`
        UPDATE usuarios
        SET senha = @senha, senha_temporaria = 1
        WHERE usuario = @login OR email = @login
      `);
    res.status(200).json({ mensagem: 'Senha temporária gerada com sucesso.', senhaTemporaria });
  } catch (err) {
    console.error('Erro ao redefinir senha:', err);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

  //*NOVA SENHA*\\
app.post('/api/nova-senha', async (req, res) => {
  const { login, novaSenha } = req.body;

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('novaSenha', sql.VarChar, novaSenha)
      .input('login', sql.VarChar, login)
      .query(`
        UPDATE usuarios 
        SET senha = @novaSenha, senha_temporaria = 0 
        WHERE usuario = @login OR email = @login
      `);

    res.json({ mensagem: 'Senha atualizada com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar senha:', err);
    res.status(500).json({ erro: 'Erro ao atualizar a senha.' });
  }
});


//* RECEBER DADOS DOS SENSORES *\\
/*app.post('/api/sensores', async (req, res) => {
  const { umidade_solo, umidade_ar, temperatura_agua } = req.body;

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('umidade_solo', sql.Float, umidade_solo)
      .input('umidade_ar', sql.Float, umidade_ar)
      .input('temperatura_agua', sql.Float, temperatura_agua)
      .query(`
        INSERT INTO sensores (umidade_solo, umidade_ar, temperatura_agua, data_hora)
        VALUES (@umidade_solo, @umidade_ar, @temperatura_agua, GETDATE())
      `);
    res.json({ sucesso: true, mensagem: 'Dados inseridos com sucesso!' });
  } catch (err) {
    console.error('Erro ao inserir dados:', err);
    res.status(500).json({ erro: 'Erro ao inserir dados no banco' });
  }
});*/

//* BUSCAR ÚLTIMOS DADOS DOS SENSORES *\\
/*app.get('/api/sensores/ultimos', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .query('SELECT TOP 1 * FROM sensores ORDER BY data_hora DESC');

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ mensagem: 'Nenhum dado encontrado.' });
    }
  } catch (err) {
    console.error('Erro ao buscar últimos dados:', err);
    res.status(500).json({ erro: 'Erro ao buscar dados dos sensores' });
  }
});*/

//* DICAS DE PLANTIO *\\
//app.get('/api/dicas', async (req, res) => {
 // try {
   // const pool = await sql.connect(config);
   // const result = await pool.request().query('SELECT planta, dica FROM DicasPlantio');
   // res.json(result.recordset);
  //} catch (err) {
    //console.error('Erro ao buscar dicas:', err);
    //res.status(500).json({ erro: 'Erro ao buscar dicas do banco de dados' });
  //}
//});

//* BLOG DA ESTUFA *\\
//app.get('/api/blog-estufa', async (req, res) => {
  //try {
    //const pool = await sql.connect(config);
    //const result = await pool.request().query('SELECT * FROM BlogEstufa ORDER BY Id DESC');
    //res.json(result.recordset);
  //} catch (err) {
   // console.error('Erro ao buscar blog da estufa:', err);
   // res.status(500).json({ erro: 'Erro ao buscar dicas da estufa' });
 // }
//});

//* BLOG DE RECEITAS *\\
//app.get('/api/blog-receitas', async (req, res) => {
  //try {
   // const pool = await sql.connect(config);
   // const result = await pool.request().query('SELECT * FROM BlogReceitas ORDER BY Id DESC');
   // res.json(result.recordset);
  //} catch (err) {
   // console.error('Erro ao buscar blog de receitas:', err);
   // res.status(500).json({ erro: 'Erro ao buscar receitas' });
  //}
//});

//* INICIAR SERVIDOR *\\
app.listen(3000, () => {
  console.log('✅ API rodando em http://localhost:3000');
});
async function testConnection() {
  try {
    const pool = await sql.connect(config);
    console.log("Conexão bem-sucedida!");
    pool.close();
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  }
}

testConnection();