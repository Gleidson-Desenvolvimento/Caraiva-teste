const chatWidget = document.getElementById('chat-widget');
const whatsappFab = document.getElementById('whatsapp-fab');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const toast = document.getElementById('toast');

const responses = {
  'Quero consultar datas': 'Claro! Me diga as datas de check-in e check-out que você imagina. Também posso consultar pelo formulário no topo da página.',
  'Quero saber sobre Caraíva': 'Caraíva é uma vila pé na areia no sul da Bahia. O encontro do rio com o mar, as ruas de areia e o pôr do sol fazem parte do encanto.',
  'Como chegar na pousada?': 'Estamos em Aldeia Xandó, Caraíva. Posso te enviar a rota pelo Maps e te ajudar a planejar a chegada. O telefone é (73) 99857-4519.',
};

function addMessage(text, type = 'bot') {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function answer(text) {
  addMessage(text, 'user');
  window.setTimeout(() => addMessage(responses[text] || 'Adorei saber! Para te atender melhor, fale com a gente pelo WhatsApp no (73) 99857-4519. Vou ficar por aqui.'), 450);
}

whatsappFab.addEventListener('click', () => {
  chatWidget.classList.toggle('open');
  chatWidget.setAttribute('aria-hidden', String(!chatWidget.classList.contains('open')));
});
closeChat.addEventListener('click', () => {
  chatWidget.classList.remove('open');
  chatWidget.setAttribute('aria-hidden', 'true');
});
document.querySelectorAll('.quick-actions button').forEach((button) => button.addEventListener('click', () => answer(button.dataset.message)));
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  answer(text);
  chatInput.value = '';
});

document.getElementById('booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  if (checkout <= checkin) {
    showToast('Escolha um check-out depois do check-in.');
    return;
  }
  showToast('Recebemos sua consulta. A Ana vai confirmar a disponibilidade pelo WhatsApp.');
  chatWidget.classList.add('open');
  chatWidget.setAttribute('aria-hidden', 'false');
});

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 4200);
}

const today = new Date().toISOString().split('T')[0];
document.getElementById('checkin').min = today;
document.getElementById('checkout').min = today;
document.getElementById('checkin').addEventListener('change', (event) => {
  document.getElementById('checkout').min = event.target.value;
});
