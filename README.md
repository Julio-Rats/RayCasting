# RayCasting
Brincando com RayCasting

Técnica computacional para recriar um ambiente "3D" a partir de um mapa 2D, utilizando um mapa (matriz inteiro)
Conseguimos recriar uma perspectiva 3D do ambiente.

Para executar, basta apenas abrir o HTML no navegador (arquivo JS deve estar no mesmo diretório).

## Customização:

### Tela
Para mudar a resolução basta colocar a resolução que quer em data.screen.width e data.screen.height

### Mapa
Para mudar o "labirinto" basta mudar a matriz declarada na estrutura Data.map, porém deve ser um absente fechado
ou seja, as laterais não podem assumir valor zero. Cada número está associado a uma cor, declarado abaixo na estrutura
colors (a primeira cor é o index 1, e assim por diante).

### Player
O player possui alguns parâmetros como:
-FOV (medição de campo de visão), que simula qual o angulo de visão será observado para colocar na tela.
-O X,Y é a posição inicial do player.
-Angle é a direção da visão que o player (camera) começa.
-Speed representa qual o deslocamento do player em relação à matriz, e o angulo de visão.]

### Precisão
Pode-se melhorar a definição das paredes aumentando o valor de data.rayCasting.precision, isso ira
aumentar o processamento, pois o deslocamento de cada raio (Ray), será melhor, assim executando mais passos para
atingir uma parede, porém a precisão da linha será melhor.

### Delay
Para poder manter um FPS estavel e economizar recurso, é possivel mudar em data.render.delay o tempo de ação do
canvas para renderizar na tela.
