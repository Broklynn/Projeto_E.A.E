const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');

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
app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .input('senha', sql.VarChar, senha)
      .query('SELECT * FROM usuarios WHERE usuario = @usuario AND senha = @senha');

    if (result.recordset.length > 0) {
      res.json({ sucesso: true, mensagem: 'Login bem-sucedido!' });
    } else {
      res.status(401).json({ sucesso: false, mensagem: 'Usuário ou senha inválidos.' });
    }
  } catch (err) {
    console.error('Erro na conexão:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

//* ROTA DE CADASTRO *\\
app.post('/api/cadastrar', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const pool = await sql.connect(config);
    const check = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .query('SELECT * FROM usuarios WHERE usuario = @usuario');

    if (check.recordset.length > 0) {
      return res.status(400).json({ erro: 'Usuário já cadastrado.' });
    }

    await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .input('senha', sql.VarChar, senha)
      .query('INSERT INTO usuarios (usuario, senha) VALUES (@usuario, @senha)');

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    res.status(500).json({ erro: 'Erro no servidor ao cadastrar.' });
  }
});

//* RECEBER DADOS DOS SENSORES *\\
app.post('/api/sensores', async (req, res) => {
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
});

//* BUSCAR ÚLTIMOS DADOS DOS SENSORES *\\
app.get('/api/sensores/ultimos', async (req, res) => {
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
});

//* DICAS DE PLANTIO *\\
app.get('/api/dicas', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT planta, dica FROM DicasPlantio');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erro ao buscar dicas:', err);
    res.status(500).json({ erro: 'Erro ao buscar dicas do banco de dados' });
  }
});

//* BLOG DA ESTUFA *\\
app.get('/api/blog-estufa', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM BlogEstufa ORDER BY Id DESC');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erro ao buscar blog da estufa:', err);
    res.status(500).json({ erro: 'Erro ao buscar dicas da estufa' });
  }
});

//* BLOG DE RECEITAS *\\
app.get('/api/blog-receitas', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM BlogReceitas ORDER BY Id DESC');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erro ao buscar blog de receitas:', err);
    res.status(500).json({ erro: 'Erro ao buscar receitas' });
  }
});

//* INICIAR SERVIDOR *\\
app.listen(3000, () => {
  console.log('✅ API rodando em http://localhost:3000');
});
