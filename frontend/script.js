// ✅ Selecionar o formulário pelo ID correto
const form = document.getElementById("form-inscricao");

// ✅ Elemento para feedback (opcional)
const feedbackDiv = document.getElementById("feedback-message");

// Função para mostrar feedback
function showFeedback(message, type = 'success') {
    if (feedbackDiv) {
        feedbackDiv.textContent = message;
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.padding = '10px';
        feedbackDiv.style.marginTop = '10px';
        feedbackDiv.style.borderRadius = '5px';
        feedbackDiv.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        feedbackDiv.style.color = type === 'success' ? '#155724' : '#721c24';
        feedbackDiv.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`;

        // Esconder após 5 segundos
        setTimeout(() => {
            feedbackDiv.style.display = 'none';
        }, 5000);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ Pegar os valores
    const fullname = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("telefone").value.trim();

    // ✅ Validação básica
    if (!fullname || fullname.length < 3) {
        alert("❌ Por favor, digite seu nome completo.");
        document.getElementById("nome").focus();
        return;
    }

    if (!email || !email.includes('@')) {
        alert("❌ Por favor, digite um email válido.");
        document.getElementById("email").focus();
        return;
    }

    // ✅ Mostrar loading no botão
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "⏳ Enviando...";
    submitBtn.disabled = true;

    // ✅ Preparar dados
    const data = {
        fullname: fullname,
        email: email,
        phone: phone || null,
        message: `Nova inscrição pelo site.\n\nNome: ${fullname}\nEmail: ${email}\nTelefone: ${phone || 'Não informado'}`
    };

    try {
        console.log('📤 Enviando dados:', data);

        const response = await fetch("http://localhost:3000/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('📥 Resposta:', result);

        if (result.success) {
            showFeedback("✅ Inscrição realizada com sucesso!", 'success');
            form.reset();
        } else {
            showFeedback(`❌ ${result.message || 'Erro ao realizar inscrição.'}`, 'error');
        }

    } catch (error) {
        console.error('❌ Erro:', error);
        showFeedback("❌ Erro ao conectar ao servidor. Verifique se o backend está rodando.", 'error');
    } finally {
        // ✅ Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});