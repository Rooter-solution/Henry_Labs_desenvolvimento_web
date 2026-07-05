const form = document.getElementById("conversation");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const nome = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("phone").value;
    const mensagem = document.getElementById("message").value;

    const texto = `Olá Henry!

Meu nome é: ${nome}

E-mail: ${email}

Telefone: ${telefone}

Mensagem:
${mensagem}`;

    const numero = "258845998597"; // Seu número

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
});



form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        fullname: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
    };

    try {

        const response = await fetch("http://localhost:3000/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {

            alert("Mensagem enviada com sucesso!");

            form.reset();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.log(error);

        alert("Erro ao conectar ao servidor.");

    }

});