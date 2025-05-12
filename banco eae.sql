
CREATE DATABASE eae;


USE eae;

ALTER DATABASE eae COLLATE Latin1_General_100_CI_AS_SC_UTF8;

drop database Eae
CREATE TABLE sensores (
  id INT IDENTITY(1,1) PRIMARY KEY,
  umidade_solo FLOAT,
  umidade_ar FLOAT,
  temperatura_agua FLOAT,
  data_hora DATETIME
);
CREATE TABLE comentarios (
  id INT IDENTITY(1,1) PRIMARY KEY,
  texto NVARCHAR(500),
  data DATETIME DEFAULT GETDATE(),
);
ALTER TABLE comentarios
ADD usuario_id INT;

ALTER TABLE comentarios
ADD CONSTRAINT FK_Comentarios_Usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios(id);



CREATE TABLE usuarios (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  data_nascimento DATE
);
 select * from usuarios

 ALTER TABLE usuarios ADD senha_temporaria BIT DEFAULT 0;
