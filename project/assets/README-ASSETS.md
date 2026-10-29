# Assets — MR Usinagens

## Imagens do produto

As fotografias reais dos estampos fabricados pela MR Usinagens devem substituir as imagens provisórias utilizadas no site.

### Arquivos esperados

| Arquivo | Uso no site | Onde substituir |
|---------|------------|-----------------|
| `estampo-principal.png` | Imagem principal da seção inicial (hero) | `index.html` — elemento `.hero__image img` |
| `estampo-detalhe.png` | Imografia da seção "Conheça de perto" | `index.html` — elemento `.detail__image img` |

### Como substituir

1. Coloque os arquivos de imagem nesta pasta: `assets/images/`
2. No arquivo `index.html`, troque a URL da imagem provisória (Pexels) pelo caminho local, por exemplo:

```html
<!-- Antes -->
<img src="https://images.pexels.com/photos/..." alt="..." />

<!-- Depois -->
<img src="/assets/images/estampo-principal.png" alt="Estampo fabricado pela MR Usinagens" />
```

3. Mantenha os atributos `alt` descritivos atualizados conforme a foto real.

### Imagens provisórias atuais

As imagens exibidas atualmente são fotografias de stock industriais obtidas no Pexels, utilizadas como espaços reservados. Elas **não** representam os produtos reais da MR Usinagens e devem ser substituídas assim que as fotografias oficiais estiverem disponíveis.

### Logomarca

O arquivo `logo-mr.svg` contém uma identificação tipográfica provisória ("MR USINAGENS"). Quando a logomarca oficial estiver disponível, substitua este arquivo e atualize a referência no cabeçalho e rodapé do site.

### Imagens dos cards de segmento

Os cards de "Esquadrias de alumínio", "Serralheria" e "Vidraçaria" utilizam imagens provisórias do Pexels. Quando fotografias reais das aplicações estiverem disponíveis, substitua-as seguindo o mesmo processo.
