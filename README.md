# Calculadora

![Status](https://img.shields.io/badge/status-finalizado-4ffbdf?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-15.5%25-e34f26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-53.8%25-1572b6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-30.7%25-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-green?style=for-the-badge)

Uma calculadora web com visual moderno, interface 3D/neon e lógica desenvolvida em **HTML5**, **CSS3** e **JavaScript puro**.

O projeto conta com estado de energia `ON/OFF`, operações básicas, suporte a teclado físico, tratamento de expressões com parênteses, histórico do cálculo e uma interface estilizada com efeito futurista.

## 🔗 Demo

Acesse o projeto publicado no GitHub Pages:

👉 **[Abrir Demontração](https://kaikdandrade.github.io/Calculadora/)**

## 📌 Sobre o projeto

A proposta da aplicação é simular uma calculadora digital com aparência mais imersiva, usando apenas tecnologias nativas da web.  
O layout possui um corpo visual em estilo 3D, display iluminado, botões com profundidade e estados visuais diferentes para calculadora ligada e desligada.

## ✨ Funcionalidades

- Ligar e desligar a calculadora.
- Realizar operações de soma, subtração, multiplicação e divisão.
- Suporte a números decimais.
- Suporte a parênteses.
- Inserção inteligente de parênteses pelo botão `()`.
- Histórico da última operação calculada.
- Ajuste visual automático do tamanho do texto no display.
- Botão de apagar último caractere.
- Limite máximo de caracteres para evitar expressões exageradas.
- Suporte ao teclado físico:
  - `Enter` ou `=` para calcular.
  - `Backspace` ou `Delete` para apagar.
  - `Esc` para ligar/desligar.
  - `+`, `-`, `*`, `/`, `x`, `X`, `(`, `)`, `.` e `,` para entrada de valores e operadores.
- Alertas simples para operações inválidas ou limite máximo atingido.

## 🧪 Tecnologias utilizadas

- **HTML5** — estrutura da calculadora.
- **CSS3** — estilização, responsividade, efeitos visuais, profundidade e animações.
- **JavaScript puro** — lógica da calculadora, eventos de clique, teclado e cálculo das expressões.

## 📁 Estrutura do projeto

```text
Calculadora/
├── index.html
├── style.css
├── main.js
├── LICENSE
└── README.md
```

## 🚀 Como executar o projeto localmente

Você pode rodar o projeto diretamente no navegador.

### 1. Clone o repositório

```bash
git clone https://github.com/kaikdandrade/Calculadora.git
```

### 2. Acesse a pasta do projeto

```bash
cd Calculadora
```

### 3. Abra o arquivo principal

Abra o arquivo `index.html` no navegador.

Também é possível usar uma extensão como **Live Server** no VS Code para visualizar o projeto com recarregamento automático.

## 🎮 Como usar

1. Abra a calculadora.
2. Clique em **ON** para ligar.
3. Digite os números e operadores usando os botões ou o teclado.
4. Clique em **=** ou pressione `Enter` para calcular.
5. Use **⌫** ou `Backspace` para apagar.
6. Use **Esc** para alternar entre ligado e desligado.

## 🧠 Destaques da lógica

O arquivo `main.js` controla o estado da calculadora e organiza a interação da interface por meio de funções responsáveis por:

- Controle de energia da calculadora.
- Entrada de dígitos.
- Entrada de operadores.
- Validação de números decimais.
- Abertura e fechamento automático de parênteses.
- Normalização da expressão antes do cálculo.
- Formatação visual dos operadores.
- Formatação de resultados grandes ou decimais.
- Tratamento de expressões inválidas.

## 🎨 Destaques visuais

O arquivo `style.css` cria a identidade visual da calculadora com:

- Fundo animado em grade.
- Corpo da calculadora com efeito de profundidade.
- Display com brilho neon.
- Botões com sombras e sensação 3D.
- Estados visuais diferentes para `ONLINE` e `OFFLINE`.
- Responsividade para telas menores.

## 📄 Licença

Este projeto está sob a licença **MIT**.  
Consulte o arquivo [`LICENSE`](./LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido por **Kaik Fancisco D' Andrade**.

- GitHub: [@kaikdandrade](https://github.com/kaikdandrade)
- Demo: [Calculadora](https://kaikdandrade.github.io/Calculadora/)

---

⭐ Se este projeto te ajudou ou serviu de inspiração, considere deixar uma estrela no repositório.
