// BANCO DE DADOS (Preencha com suas questões)
const flashcardsData = [
    // 1. Arquitetura de Dados
    { topic: "Arquitetura de Dados", question: "O que garantem as propriedades ACID em um SGBD relacional?", answer: "Atomicidade, Consistência, Isolamento e Durabilidade, assegurando confiabilidade nas transações[cite: 16]." },
    { topic: "Arquitetura de Dados", question: "Qual o principal objetivo da normalização de dados?", answer: "Eliminar duplicações de dados e garantir que cada informação seja armazenada em uma única tabela[cite: 18]." },
    { topic: "Arquitetura de Dados", question: "O que armazena um Data Warehouse?", answer: "Consolida dados de diversas fontes em um único local, sendo otimizado para análises multidimensionais e histórico[cite: 17]." },
    { topic: "Arquitetura de Dados", question: "O que caracteriza os bancos de dados orientados a documentos?", answer: "Armazenam dados em formatos JSON ou BSON, permitindo flexibilidade para dados semiestruturados[cite: 13]." },
    { topic: "Arquitetura de Dados", question: "O que é um Data Lake?", answer: "Uma solução de Big Data que permite armazenar dados estruturados, semiestruturados e não estruturados em seu formato bruto[cite: 17]." },

    // 2. Gerenciamento de Projetos
    { topic: "Gerenciamento de Projetos", question: "O que é a EAP (Estrutura Analítica do Projeto) segundo o PMBOK?", answer: "Uma representação hierárquica do escopo do trabalho do projeto, dividido em partes menores e gerenciáveis[cite: 19]." },
    { topic: "Gerenciamento de Projetos", question: "Qual a diferença fundamental entre Scrum e Kanban?", answer: "O Scrum utiliza iterações fixas de tempo (sprints), enquanto o Kanban foca no fluxo contínuo sem limites de tempo fixos[cite: 19]." },
    { topic: "Gerenciamento de Projetos", question: "O que ocorre na reunião de Retrospectiva da Sprint no Scrum?", answer: "Acontece no fim da Sprint, após a Revisão e antes do planejamento da próxima, para melhoria contínua do processo[cite: 27]." },
    { topic: "Gerenciamento de Projetos", question: "O que define o modelo em cascata de ciclo de vida?", answer: "Fases executadas de forma sequencial e linear, onde cada fase depende estritamente da conclusão da anterior[cite: 18]." },
    { topic: "Gerenciamento de Projetos", question: "O que é o Program Increment (PI) no SAFe?", answer: "Um período fixo de tempo em que um trem de lançamento (ART) entrega valor incremental ao cliente." },

    // 3. Engenharia de Software
    { topic: "Engenharia de Software", question: "Qual o principal objetivo dos testes estáticos?", answer: "Reduzir defeitos no software por meio da análise e redução de falhas na documentação e código-fonte sem executá-lo[cite: 9]." },
    { topic: "Engenharia de Software", question: "O que avalia o teste DAST (Dynamic Application Security Testing)?", answer: "A análise em tempo de execução do software totalmente compilado e integrado[cite: 11]." },
    { topic: "Engenharia de Software", question: "O que caracteriza um Caso de Uso?", answer: "Uma representação textual em forma de narrativa que demonstra a interação entre um ator e o sistema[cite: 27]." },
    { topic: "Engenharia de Software", question: "O que é Polimorfismo na Orientação a Objetos?", answer: "Propriedade que habilita operações diferentes a terem o mesmo nome, reduzindo o acoplamento entre objetos[cite: 27]." },
    { topic: "Engenharia de Software", question: "O que define os modelos de ciclo de vida em V e em cascata?", answer: "São caracterizados por serem processos de desenvolvimento estritamente sequenciais[cite: 9]." },

    // 4. Segurança da Informação
    { topic: "Segurança da Informação", question: "O que é um envelope digital?", answer: "Esquema que utiliza criptografia simétrica para os dados e criptografia assimétrica (chave pública do destinatário) para a chave secreta[cite: 13]." },
    { topic: "Segurança da Informação", question: "Qual a função de uma solução SIEM?", answer: "Fornecer visão holística agregando e analisando logs e eventos de segurança de várias fontes da infraestrutura[cite: 13]." },
    { topic: "Segurança da Informação", question: "O que faz um Botnet / Bot?", answer: "Engaja computadores em uma rede controlada para realizar tarefas automatizadas em ataques cibernéticos sem o conhecimento do dono[cite: 37]." },
    { topic: "Segurança da Informação", question: "O que é a técnica de Tunelamento em VPN?", answer: "O encapsulamento seguro de um pacote de rede inteiro dentro de outro pacote utilizando criptografia[cite: 37]." },
    { topic: "Segurança da Informação", question: "A quem compete o processo de Classificação da Informação segundo a ISO 27002?", answer: "É uma decisão de negócios que requer o papel ativo do setor gerencial da organização[cite: 36]." },

    // 5. UX e Acessibilidade
    { topic: "UX e Acessibilidade", question: "O que é um MVP (Produto Mínimo Viável)?", answer: "A versão mais simples de um produto criada para validar uma hipótese de negócio com o mínimo esforço e aprendizado validado[cite: 18]." },
    { topic: "UX e Acessibilidade", question: "O que contém um Mapa de Empatia (Design Thinking)?", answer: "O que o usuário pensa e sente, o que escuta, o que vê, o que fala e faz[cite: 11]." },
    { topic: "UX e Acessibilidade", question: "O que recomenda o eMAG quanto ao contraste?", answer: "Garantir um contraste mínimo adequado entre o plano de fundo e o primeiro plano para acessibilidade web[cite: 27]." },
    { topic: "UX e Acessibilidade", question: "Qual a diferença entre Usabilidade e Acessibilidade?", answer: "Usabilidade mede a eficiência e satisfação de uso; Acessibilidade garante o acesso universal, inclusive por pessoas com deficiência." }
];

let quizData = [];

class StudyApp {
    constructor() {
        this.currentScreen = 'home-screen';
        this.fcIndex = 0;
        this.geminiApiKey = localStorage.getItem('transpetro_gemini_key') || '';
        
        this.errorNotebook = JSON.parse(localStorage.getItem('transpetro_errors')) || [];
        this.bookmarks = JSON.parse(localStorage.getItem('transpetro_bookmarks')) || [];
        
        this.currentQuizSession = [];
        this.quizIndex = 0;
        this.scoreCorrect = 0;
        this.scoreIncorrect = 0;
        this.answeredQuestionsToday = [];
        this.currentWrongDetails = null;

        // Carrega as questões do JSON automaticamente
        this.loadQuestionsFromJson();
    }

    async loadQuestionsFromJson() {
        try {
            const response = await fetch('transpetro_questoes_completas.json');
            quizData = await response.json();
            this.updateHomeBadges();
            console.log(`${quizData.length} questões carregadas com sucesso!`);
        } catch (error) {
            console.error("Erro ao carregar o arquivo JSON de questões:", error);
            alert("Erro ao carregar as questões do simulado.");
        }
    }

    updateHomeBadges() {
        document.getElementById('bookmark-badge').innerText = this.bookmarks.length;
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;

        if (screenId === 'flashcard-screen') this.loadFlashcard();
        else if (screenId === 'history-screen') this.renderHistory();
        else if (screenId === 'bookmarks-screen') this.renderBookmarks();
        else if (screenId === 'home-screen') this.updateHomeBadges();
    }

    // --- FLASHCARDS LOGIC ---
    loadFlashcard() {
        if (flashcardsData.length === 0) return;
        const fc = flashcardsData[this.fcIndex];
        document.getElementById('fc-topic').innerText = fc.topic;
        document.getElementById('fc-question').innerText = fc.question;
        document.getElementById('fc-answer').innerText = fc.answer;
        document.getElementById('fc-counter').innerText = `${this.fcIndex + 1} / ${flashcardsData.length}`;
        document.getElementById('flashcard-inner').classList.remove('flipped');
    }

    flipCard() { document.getElementById('flashcard-inner').classList.toggle('flipped'); }
    nextFlashcard() { this.fcIndex = (this.fcIndex + 1) % flashcardsData.length; this.loadFlashcard(); }
    prevFlashcard() { this.fcIndex = (this.fcIndex - 1 + flashcardsData.length) % flashcardsData.length; this.loadFlashcard(); }

    // --- QUIZ LOGIC ---
    startQuiz(mode) {
        if (mode === 'erros') {
            if (this.errorNotebook.length === 0) {
                alert("Seu Caderno de Erros está vazio. Excelente trabalho!");
                return;
            }
            this.currentQuizSession = quizData.filter(q => this.errorNotebook.includes(q.id));
        } else {
            const topic = document.getElementById('topic-select').value;
            this.currentQuizSession = topic === 'todos' 
                ? [...quizData] 
                : quizData.filter(q => q.topic === topic);
            
            if (this.currentQuizSession.length === 0) {
                alert("Nenhuma questão encontrada para este tópico.");
                return;
            }
            // Embaralhar as questões
            this.currentQuizSession.sort(() => Math.random() - 0.5);
        }

        this.quizIndex = 0;
        this.scoreCorrect = 0;
        this.scoreIncorrect = 0;
        this.answeredQuestionsToday = [];
        this.showScreen('quiz-screen');
        this.loadQuizQuestion();
    }

    loadQuizQuestion() {
        if (this.quizIndex >= this.currentQuizSession.length) {
            this.finishQuiz();
            return;
        }

        const q = this.currentQuizSession[this.quizIndex];
        document.getElementById('quiz-counter').innerText = `Q ${this.quizIndex + 1}/${this.currentQuizSession.length}`;
        document.getElementById('q-topic').innerText = q.topic;
        document.getElementById('q-text').innerText = q.question;
        
        // Verifica se está no "Passar a Limpo"
        const btnBookmark = document.getElementById('btn-bookmark');
        if (this.bookmarks.includes(q.id)) {
            btnBookmark.classList.add('active');
            btnBookmark.innerText = '★';
        } else {
            btnBookmark.classList.remove('active');
            btnBookmark.innerText = '☆';
        }

        const container = document.getElementById('options-container');
        container.innerHTML = '';
        
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.onclick = () => this.selectOption(index, q.correct, btn);
            container.appendChild(btn);
        });

        document.getElementById('feedback-section').classList.add('hidden');
    }

    selectOption(selectedIndex, correctIndex, selectedBtn) {
        const q = this.currentQuizSession[this.quizIndex];
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(b => b.disabled = true);

        const feedbackMsg = document.getElementById('feedback-msg');
        const btnGemini = document.getElementById('btn-gemini');

        if (selectedIndex === correctIndex) {
            selectedBtn.classList.add('correct');
            feedbackMsg.innerText = "Correto! Muito bem.";
            feedbackMsg.style.color = "var(--success)";
            btnGemini.classList.add('hidden');
            this.scoreCorrect++;
            this.answeredQuestionsToday.push({ qId: q.id, status: 'acerto' });

            // Se acertou, remove do caderno de erros
            this.errorNotebook = this.errorNotebook.filter(id => id !== q.id);
            localStorage.setItem('transpetro_errors', JSON.stringify(this.errorNotebook));

        } else {
            selectedBtn.classList.add('incorrect');
            buttons[correctIndex].classList.add('correct');
            feedbackMsg.innerText = "Incorreto.";
            feedbackMsg.style.color = "var(--error)";
            btnGemini.classList.remove('hidden');
            this.scoreIncorrect++;
            this.answeredQuestionsToday.push({ qId: q.id, status: 'erro' });

            // Se errou, adiciona ao caderno de erros (se não estiver lá)
            if (!this.errorNotebook.includes(q.id)) {
                this.errorNotebook.push(q.id);
                localStorage.setItem('transpetro_errors', JSON.stringify(this.errorNotebook));
            }

            this.currentWrongDetails = {
                question: q.question,
                chosen: q.options[selectedIndex],
                correct: q.options[correctIndex]
            };
        }

        document.getElementById('feedback-section').classList.remove('hidden');
    }

    nextQuestion() {
        this.quizIndex++;
        this.loadQuizQuestion();
    }

    finishQuiz() {
        this.saveTodayHistory();
        const total = this.scoreCorrect + this.scoreIncorrect;
        const perc = ((this.scoreCorrect / total) * 100).toFixed(0);
        alert(`Simulado finalizado!\nDesempenho: ${perc}%\nAcertos: ${this.scoreCorrect}\nErros: ${this.scoreIncorrect}`);
        this.showScreen('home-screen');
    }

    // --- FAVORITOS (PASSAR A LIMPO) ---
    toggleBookmark() {
        const q = this.currentQuizSession[this.quizIndex];
        const btnBookmark = document.getElementById('btn-bookmark');
        
        if (this.bookmarks.includes(q.id)) {
            this.bookmarks = this.bookmarks.filter(id => id !== q.id);
            btnBookmark.classList.remove('active');
            btnBookmark.innerText = '☆';
        } else {
            this.bookmarks.push(q.id);
            btnBookmark.classList.add('active');
            btnBookmark.innerText = '★';
        }
        localStorage.setItem('transpetro_bookmarks', JSON.stringify(this.bookmarks));
    }

    renderBookmarks() {
        const container = document.getElementById('bookmarks-list');
        
        if (this.bookmarks.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:20px;">Nenhuma questão marcada para passar a limpo.</p>`;
            return;
        }

        const bookmarkedQuestions = quizData.filter(q => this.bookmarks.includes(q.id));
        
        container.innerHTML = bookmarkedQuestions.map(q => `
            <div class="list-item">
                <span class="badge">${q.topic}</span>
                <p class="bookmark-q">${q.question}</p>
                <div class="bookmark-a"><strong>Resposta Correta:</strong><br>${q.options[q.correct]}</div>
                <button class="remove-bookmark" onclick="app.removeBookmarkFromList(${q.id})">Remover da lista</button>
            </div>
        `).join('');
    }

    removeBookmarkFromList(id) {
        this.bookmarks = this.bookmarks.filter(bId => bId !== id);
        localStorage.setItem('transpetro_bookmarks', JSON.stringify(this.bookmarks));
        this.renderBookmarks();
    }

    // --- HISTÓRICO ---
    saveTodayHistory() {
        if (this.answeredQuestionsToday.length === 0) return;
        
        const today = new Date().toLocaleDateString('pt-BR');
        let history = JSON.parse(localStorage.getItem('transpetro_history')) || [];
        const existingEntryIndex = history.findIndex(h => h.date === today);
        
        const summary = {
            date: today,
            correct: this.scoreCorrect,
            incorrect: this.scoreIncorrect,
            questions: [...this.answeredQuestionsToday]
        };

        if (existingEntryIndex >= 0) {
            history[existingEntryIndex].correct += this.scoreCorrect;
            history[existingEntryIndex].incorrect += this.scoreIncorrect;
            history[existingEntryIndex].questions.push(...this.answeredQuestionsToday);
        } else {
            history.unshift(summary);
        }

        localStorage.setItem('transpetro_history', JSON.stringify(history));
    }

    renderHistory() {
        const container = document.getElementById('history-list');
        const history = JSON.parse(localStorage.getItem('transpetro_history')) || [];

        if (history.length === 0) {
            container.innerHTML = `<p style="color:var(--text-muted); text-align:center;">Nenhum histórico registrado ainda.</p>`;
            return;
        }

        container.innerHTML = history.map(item => {
            const total = item.correct + item.incorrect;
            const perc = total > 0 ? ((item.correct / total) * 100).toFixed(1) : 0;
            const qList = item.questions.map(q => `Q${q.qId}(${q.status === 'acerto' ? '✔️' : '❌'})`).join(', ');
            
            return `
                <div class="list-item">
                    <div class="history-header">
                        <span class="date">${item.date}</span>
                        <span class="perc">${perc}% de Acerto</span>
                    </div>
                    <div>Acertos: <strong>${item.correct}</strong> | Erros: <strong>${item.incorrect}</strong></div>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;">Questões: ${qList}</div>
                </div>
            `;
        }).join('');
    }

    clearHistory() {
        if (confirm("Deseja realmente limpar todo o histórico?")) {
            localStorage.removeItem('transpetro_history');
            this.renderHistory();
        }
    }

    // --- GEMINI API ---
    openSettings() {
        const key = prompt("Insira sua chave da API do Google Gemini:", this.geminiApiKey);
        if (key !== null) {
            this.geminiApiKey = key.trim();
            localStorage.setItem('transpetro_gemini_key', this.geminiApiKey);
            alert("Chave salva com sucesso!");
        }
    }

    async askGemini() {
        if (!this.geminiApiKey) {
            alert("Configure sua chave da API do Gemini primeiro na tela inicial.");
            this.openSettings();
            return;
        }

        const modal = document.getElementById('gemini-modal');
        const responseBox = document.getElementById('gemini-response');
        modal.classList.remove('hidden');
        responseBox.innerText = "Analisando com o Gemini...";

        const promptText = `Explique de forma curta, direta e objetiva (máximo 3 parágrafos) por que a alternativa escolhida está errada e por que a correta é a certa para a seguinte questão de concurso:
Questão: "${this.currentWrongDetails.question}"
Alternativa escolhida pelo aluno (errada): "${this.currentWrongDetails.chosen}"
Alternativa correta: "${this.currentWrongDetails.correct}"`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0].content) {
                responseBox.innerText = data.candidates[0].content.parts[0].text;
            } else {
                responseBox.innerText = "Erro ao obter resposta da API do Gemini. Verifique sua chave.";
            }
        } catch (error) {
            responseBox.innerText = "Erro de conexão ao chamar a API do Gemini.";
        }
    }

    closeGeminiModal() { document.getElementById('gemini-modal').classList.add('hidden'); }
}

const app = new StudyApp();