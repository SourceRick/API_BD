-- =======================================

-- BANCO DE DADOS: almoxarifado_inteligente
-- =======================================
CREATE DATABASE IF NOT EXISTS almoxarifado_inteligente;

USE almoxarifado_inteligente;

-- =========================

-- 0.1. VARIAVEIS IMPORTANTES

-- =========================

SET @estoque_minimo = 0;
SELECT IFNULL(@estoque_minimo, 0) AS estoque_minimo;


-- =========================

-- 1. TABELAS PRINCIPAIS

-- =========================

CREATE TABLE IF NOT EXISTS usuarios (

 id_usuario INT AUTO_INCREMENT PRIMARY KEY,

 nome VARCHAR(150),

 email VARCHAR(150),

 senha_hash VARCHAR(255),

 tipo ENUM('admin','operador') DEFAULT 'operador'

);

CREATE TABLE IF NOT EXISTS funcionario ( -- Para realização de emprestimos

 id_funcionario INT AUTO_INCREMENT PRIMARY KEY,

 nome VARCHAR(100) NOT NULL,

 email VARCHAR(100) UNIQUE NOT NULL,

 funcao VARCHAR(100),

 id_cargo INT,

 FOREIGN KEY (id_cargo) REFERENCES cargo(id_cargo)

);

CREATE TABLE IF NOT EXISTS cargo ( -- Cargo dentro do banco de dados

 id_cargo INT AUTO_INCREMENT PRIMARY KEY,

 nome_cargo VARCHAR(50) NOT NULL,

 nivel_acesso INT NOT NULL,

 tipo_usuario ENUM('GLOBAL_ROOT', 'LOCAL_USER') DEFAULT 'LOCAL_USER'

);


CREATE TABLE IF NOT EXISTS itens (

 id_item INT AUTO_INCREMENT PRIMARY KEY,

 nome VARCHAR(100) NOT NULL,

 quantidade INT DEFAULT 0,

 tag_id VARCHAR(100),

 tag_material VARCHAR(100)

);
-- ===============
--   Registros
-- ===============
CREATE TABLE IF NOT EXISTS entrada_itens (
    id_entrada INT AUTO_INCREMENT PRIMARY KEY,
    id_item INT NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    responsavel VARCHAR(100) DEFAULT (CURRENT_USER()),
    observacao TEXT,
    FOREIGN KEY (id_item) REFERENCES itens(id_item)
);

 
CREATE TABLE IF NOT EXISTS saida_itens (
    id_saida INT AUTO_INCREMENT PRIMARY KEY,
    id_item INT NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    data_saida DATETIME DEFAULT CURRENT_TIMESTAMP,
    responsavel VARCHAR(100) DEFAULT (CURRENT_USER()),
    tipo_saida ENUM('consumo', 'perda', 'transferencia', 'outro') DEFAULT 'consumo',
    observacao TEXT,
    FOREIGN KEY (id_item) REFERENCES itens(id_item)
);

-- ===================
--   Tabelas backend
-- ===================

CREATE TABLE IF NOT EXISTS backup_itens (

 id_backup INT AUTO_INCREMENT PRIMARY KEY,

 id_item INT,

 nome VARCHAR(255),

 quantidade INT,

 tag_id VARCHAR(100),

 tag_material VARCHAR(100),

 data_backup DATETIME DEFAULT CURRENT_TIMESTAMP

);
CREATE TABLE IF NOT EXISTS logs (

 id_log INT AUTO_INCREMENT PRIMARY KEY,

 tipo VARCHAR(50),

 descricao TEXT,

 data_log DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS tags (
id_tag INT AUTO_INCREMENT PRIMARY KEY,
itens_id INT NOT NULL,
tag_tipo VARCHAR(25),
tag_valor VARCHAR(25),
FOREIGN KEY (itens_id) REFERENCES itens(id_item));

CREATE TABLE IF NOT EXISTS emprestimos (
responsavel VARCHAR(50) NOT NULL DEFAULT (CURRENT_USER()),
id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
itens_id INT NOT NULL,
funcionario_id INT NOT NULL,
data_emprestimo DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
status ENUM('aberto', 'devolvido') DEFAULT 'aberto',
criado_por VARCHAR(50) DEFAULT (CURRENT_USER()),
FOREIGN KEY (itens_id) REFERENCES itens(id_item),
FOREIGN KEY (funcionario_id) REFERENCES funcionario(id_funcionario)
);

CREATE TABLE IF NOT EXISTS devolucoes (
    id_devolucao INT AUTO_INCREMENT PRIMARY KEY,
    emprestimo_id INT NOT NULL,
    data_devolucao_real DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacao TEXT,
    recebido_por VARCHAR(50) DEFAULT (CURRENT_USER()),
    FOREIGN KEY (emprestimo_id) REFERENCES emprestimos(id_emprestimo)
);
-- =========================

-- 2. TRIGGERS AUTOMÁTICOS

-- =========================

DELIMITER //

-- Aumenta o estoque após uma entrada
CREATE TRIGGER trg_add_estoque
AFTER INSERT ON entrada_itens
FOR EACH ROW
BEGIN
    UPDATE itens
    SET quantidade = quantidade + NEW.quantidade
    WHERE id_item = NEW.id_item;

    INSERT INTO logs (tipo, descricao)
    VALUES ('ENTRADA_ITEM', CONCAT('Entrada de ', NEW.quantidade, ' unidades no item ID ', NEW.id_item));
END//

-- Diminui o estoque após uma saída
CREATE TRIGGER trg_remove_estoque
AFTER INSERT ON saida_itens
FOR EACH ROW
BEGIN
    UPDATE itens
    SET quantidade = quantidade - NEW.quantidade
    WHERE id_item = NEW.id_item;

    INSERT INTO logs (tipo, descricao)
    VALUES ('SAIDA_ITEM', CONCAT('Saída de ', NEW.quantidade, ' unidades do item ID ', NEW.id_item));
END//

-- Triger que verifica stock minimo
CREATE TRIGGER trg_low_stock

AFTER UPDATE ON itens

FOR EACH ROW

BEGIN
IF  itens.quantidade<10 THEN
INSERT INTO logs (data_log, tipo, mensagem)
        VALUES (
            NOW(),
            'Estoque baixo',
            CONCAT('Item ID ', NEW.id_item, ' com estoque baixo: ', NEW.quantidade, ' unidades restantes.'));
		END IF;
END//

-- Trigger do asafe
CREATE TRIGGER trg_backup

BEFORE DELETE ON itens

FOR EACH ROW

BEGIN

 INSERT INTO backup_itens (id_item, nome, quantidade, tag_uso, tag_material)

 VALUES (OLD.id_item, OLD.nome, OLD.quantidade, OLD.tag_uso, OLD.tag_material);

 INSERT INTO logs (tipo, descricao)

 VALUES ('DELETE_ITEM', CONCAT('Item ID=', OLD.id_item, ' movido para backup'));

END//

CREATE PROCEDURE relatorio()
BEGIN
SELECT 'ENTRADA' AS tipo, COUNT(*) AS total, SUM(quantidade) AS quantidade
FROM entrada_itens
WHERE MONTH(data_entrada) = MONTH(CURRENT_DATE())
UNION ALL
SELECT 'SAIDA' AS tipo, COUNT(*) AS total, SUM(quantidade) AS quantidade
FROM saida_itens
WHERE MONTH(data_saida) = MONTH(CURRENT_DATE());
END//

DELIMITER ;



-- =========================

-- 3. EVENTO DE LIMPEZA

-- =========================



SET GLOBAL event_scheduler = ON;

CREATE EVENT IF NOT EXISTS ev_limpar_backup

ON SCHEDULE EVERY 1 DAY

DO

 DELETE FROM backup_itens WHERE data_backup < (NOW() - INTERVAL 7 DAY);



-- =========================

-- 4. HIERARQUIA SENAI 4.0

-- =========================






INSERT INTO cargo (nome_cargo, nivel_acesso, tipo_usuario) VALUES

('aluno', 1, 'LOCAL_USER'),

('instrutor', 2, 'LOCAL_USER'),

('pedagogia', 3, 'LOCAL_USER'),

('diretor', 4, 'GLOBAL_ROOT'),

('administrador_bd', 4, 'GLOBAL_ROOT');


INSERT INTO funcionario (nome, email, funcao, id_cargo) VALUES

('Carlos Lima', 'carlos.lima@senai.com', 'Diretor da Unidade', 4),

('Bárbara Souza', 'barbara.souza@senai.com', 'Administrador do Banco de Dados', 5),

('Claudio', 'claudio@senai.com', 'Instrutor', 2),

('Paula', 'paula@senai.com', 'Coordenação Pedagógica', 3),

('Asafe', 'asafe@senai.com', 'Aluna de IoT', 1);

SELECT * FROM vw_funcionarios_itens;
