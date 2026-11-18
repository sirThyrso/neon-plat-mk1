# NEON//PLAT — Versão 1.0

Site vitrine em React + Vite, com catálogo oficial de serviços de platina.

## Executar

Instale Node.js (versão 20 ou superior), abra esta pasta no terminal e execute:

```bash
npm install
npm run dev
```

Abra o endereço local mostrado no terminal (geralmente http://localhost:5173).

## Personalizar

- **WhatsApp:** o contato comercial está centralizado em `WHATSAPP_NUMBER`, em `src/config/whatsapp.js` (somente números, incluindo 55 + DDD). A mensagem geral está em `GENERAL_CONTACT_MESSAGE`; as mensagens dos jogos usam a plataforma selecionada e o preço cadastrado.
- **Jogos:** edite `src/data/games.js`. Cada registro contém ID, slug, plataformas, preço numérico em reais, gênero e referência de capa. O preço é individual para a platina completa do zero, em uma plataforma.
- **Capas:** as imagens atuais são substitutas locais e temporárias. Para usar uma capa autorizada, adicione o arquivo em `public/images/` e configure `cover` e `coverIsPlaceholder: false` no registro do jogo, sobrescrevendo os valores padrão.
- **Cores e layout:** `src/style.css`.
- **Nome e textos:** `src/main.jsx` e `index.html`.
- **Perfil do jogador:** o componente está em `src/components/PlayerProfile.jsx`. Para adicionar sua fotografia, coloque o arquivo em `public/images/sillythyr.jpg` e defina `PLAYER_PHOTO = '/images/sillythyr.jpg'` em `src/config/profile.js`. O espaço usa proporção de retrato 3:4; se o caminho estiver vazio ou a imagem falhar, o placeholder permanece visível.

Sem número configurado, o catálogo mostra um aviso e desabilita o envio de solicitações. Os CTAs das demais seções continuam levando à seção de contato, sem abrir o WhatsApp.

O catálogo está em `src/components/Catalog.jsx`, com detalhes em uma janela modal, busca por nome e filtros combinados de plataforma e gênero. Gêneros não confirmados podem permanecer como `null`. A formatação de preços, os filtros e as mensagens estão em `src/lib/catalog.js`.

## Validar

```bash
node --test tests/catalog.test.js
npm run build
```

## Observações

O site não inclui pagamentos, backend ou painel administrativo. Antes de publicar, adicione políticas de serviço e privacidade. Verifique as regras da plataforma PlayStation aplicáveis ao serviço.
