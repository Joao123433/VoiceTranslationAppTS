# Tradutor de Síntese de Fala
Este é um aplicativo web simples que utiliza a API de Fala na Web para realizar a conversão de texto para fala com funcionalidade de tradução. O aplicativo permite que os usuários insiram texto, escolham o idioma desejado para a tradução e ajustem o volume da fala. A tradução é alimentada pela API de Tradução MyMemory.

## Link para o projeto

## Visão Geral do Código
O aplicativo é construído usando HTML, CSS e JavaScript. Aqui está uma breve visão geral dos principais componentes:
- `index.html`: O principal arquivo HTML que contém a estrutura da página web.
- `style.css`: A folha de estilo com estilos mínimos para o aplicativo.
- `script.js`: O arquivo JavaScript contendo a lógica para texto para fala e tradução.

## Trechos Importantes de Código
- `fetchLanguage`: Função para buscar a tradução na API de Tradução MyMemory.
- `setVoices`: Função para popular o menu suspenso de seleção de voz com vozes disponíveis.
- `createOptions`: Função para criar opções para o menu suspenso de seleção de voz.
- `setup`: Função para lidar com a entrada de texto, seleção de idioma e tradução.
- `speek`: Função para configurar e acionar a síntese de fala.
- `attVolume`: Função para atualizar e exibir o nível de volume.