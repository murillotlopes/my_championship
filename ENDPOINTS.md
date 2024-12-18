# Rotas da Aplicação

  [Voltar para README](README.md)

Rotas disponíveis na aplicação:

| Método | Rota                                    | Descrição                                                                            |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------ |
| POST   | `/championship`                         | Criar campeonato                                                                     |
| PATCH  | `/championship/:id`                     | Editar nome do campeonato                                                            |
| GET    | `/championship`                         | Listar campeonatos                                                                   |
| GET    | `/championship:id`                      | Retorna um campeonato                                                                |
| DELTE  | `/championship:id`                      | Apagar campeonato                                                                    |
| POST   | `/championship/quarter-final/:id`       | Obter resultado das quartas de final e chaveamento da semi final                     |
| POST   | `/championship/semi-final/:id`          | Obter resultado da semi final e chaveamento da partida pelo 3º lugar e partida final |
| POST   | `/championship/third-place-playoff/:id` | Obter resultado da partida pelo 3º lugar                                             |
| POST   | `/championship/final/:id`               | Obter resultado da partida pelo 1º lugar                                             |
| GET    | `/championship/ranking/:id`             | Classificação geral do campeonato                                                    |
| POST   | `/team`                                 | Criar time                                                                           |
| PATCH  | `/team/:id`                             | Editar nome do time                                                                  |
| GET    | `/team`                                 | Listar times                                                                         |
| GET    | `/team/:id`                             | Retorna um time                                                                      |
| DELETE | `/team/:id`                             | Apagar time                                                                          |
| POST   | `/bracket/draw-matches/:championshipId` | Sortear as partidas da primeira fase                                                 |
