---
disciplina: PEA3301 - Introdução aos Sistemas de Potência
prova: P2
ano: 2019
tags: [sispot, p2, componentes-simetricas, curto-circuito, carga-potencia-constante]
---

# Solução comentada — P2 PEA3301 (2019)

> [!info] Como usar esta nota
> A prova de 2019 tem três blocos: (1–2) carga de potência constante com **processo iterativo**; (3–5) curtos em rede P-Q-R com **mútuas na linha**; (6–10) rede grande com 2 geradores. Onde a folha original registrou um valor **errado** (o aluno tirou 7,2/10), eu corrijo e explico.

---

# BLOCO 1 — Questões 1 e 2 (carga de potência constante)

Fonte monofásica ideal $1520\,\text{V}/60\,\text{Hz}$ → transformador ideal $1520{:}380$ → linha → duas cargas em paralelo.

- Linha: $\bar{Z}_L=(0{,}152346+j0{,}309391)\,\Omega$
- **Carga 1** (impedância constante): $P=8000\,\text{W}$, $Q=-12000\,\text{VAr}$ a $380\,\text{V}$
- **Carga 2** (potência constante): $P=32000\,\text{W}$, $\text{FP}=0{,}936$ indutivo a $380\,\text{V}$
- $S_b=40000\,\text{VA}$, $V_b=380\,\text{V}$

### Preparação (tudo em pu, $V_b$ no secundário)
$$
Z_b=\frac{380^2}{40000}=3{,}61\,\Omega
\qquad
\bar{e}_g=\frac{1520}{1520}\cdot\frac{380}{380}=1\angle0^\circ\ \text{pu}
$$
$$
\bar{z}_L=\frac{\bar{Z}_L}{Z_b}=0{,}0422+j0{,}0857\ \text{pu}
$$

**Carga 1 (admitância fixa)** — a potência em pu é $\bar{S}_1=\frac{8000-j12000}{40000}=0{,}2-j0{,}3$. Para impedância constante a admitância é fixada na tensão nominal:
$$
\bar{y}_1=\frac{\bar{S}_1^{*}}{|V_{nom}|^2}=\frac{(0{,}2-j0{,}3)^{*}}{1}=0{,}2+j0{,}3\ \text{pu}\quad(\text{capacitiva})
$$

**Carga 2 (potência fixa):** $\bar{S}_2=\dfrac{32000}{0{,}936}\angle\arccos(0{,}936)=0{,}8547\angle20{,}61^\circ=0{,}8+j0{,}301\ \text{pu}$.

### 🖊️ Como desenhar o circuito

```
  e_g(1∠0°)──[ z_L ]──┬───────────┬─────────
                      │           │
                  [ y_1 ]      ( S_2 cte )      (nó da carga: v_c)
                      │           │
                     ─┴─         ─┴─
```

> [!warning] Por que iterar?
> A **carga 2 é de potência constante**: sua corrente depende da própria tensão $\bar{v}_c$ que queremos achar. Logo o sistema é não-linear e resolve-se por **ponto fixo**:
> $$
> \begin{cases}
> \bar{v}_c=\bar{e}_g-\bar{\imath}_L\,\bar{z}_L \\[2pt]
> \bar{\imath}_L=\underbrace{\bar{y}_1\,\bar{v}_c}_{\text{carga 1}}+\underbrace{\left(\dfrac{\bar{S}_2}{\bar{v}_c}\right)^{*}}_{\text{carga 2}}
> \end{cases}
> $$
> Repita até $|\Delta\bar{v}_c|<0{,}5\%$.

### Iteração (partindo de $\bar{v}_c^{(0)}=1\angle0^\circ$)

| It. | $\bar{\imath}_L$ (pu) | $\bar{v}_c$ (pu) | $|\bar{v}_c|$ |
| :-: | :-- | :-- | :-: |
| 0 | $1{,}000-j0{,}001$ | $0{,}9577-j0{,}0857$ | $0{,}9615$ |
| 1 | $1{,}018-j0{,}116$ | $0{,}9471-j0{,}0824$ | $0{,}9507$ |
| 2 | $1{,}025-j0{,}121$ | $0{,}9464-j0{,}0828$ | $0{,}9500$ |
| 3 | $1{,}025-j0{,}122$ | $0{,}9463-j0{,}0828$ | $0{,}9499$ |

Convergiu para $\bar{v}_c\approx 0{,}9463-j0{,}0828=0{,}9499\angle{-5{,}0^\circ}$ pu.

> [!check] Verificação por balanço de potência (em $\bar{v}_c=0{,}9499\angle{-5^\circ}$)
> Carga 1: $|\bar{v}_c|^2\bar{y}_1^{*}=0{,}1805-j0{,}2707$; Carga 2: $0{,}8+j0{,}301$; perdas na linha $|\bar{\imath}_L|^2\bar{z}_L=0{,}045+j0{,}091$. Soma = $1{,}0255+j0{,}122 = \bar{e}_g\,\bar{\imath}_L^{*}$. ✔️ Fecha exatamente.

## Questão 1 — $|V|$ nas cargas, em pu

> [!success] Resposta Q1
> $$\boxed{|\bar{v}_c|\approx 0{,}950\ \text{pu}\quad(\bar{v}_c\approx 0{,}9499\angle{-5{,}0^\circ})}$$

> [!warning] Sobre o gabarito da folha (0,9583)
> A folha registrou $0{,}9583\angle{-6{,}02^\circ}$ e o aluno levou nota **parcial**. Esse valor **não é ponto fixo** das equações: ao substituí-lo, ele mapeia para $\approx 0{,}946$. O ponto de operação correto (verificado por balanço de potência acima) é $\approx 0{,}950$ pu. A diferença ($\sim0{,}9\%$) cabe na margem de $2\%$ da prova — por isso o método importa mais que o último dígito.

## Questão 2 — Potência ativa da carga de impedância constante, em pu

$$
\bar{s}_1=|\bar{v}_c|^2\,\bar{y}_1^{*}=(0{,}9499)^2\,(0{,}2-j0{,}3)=0{,}9023\,(0{,}2-j0{,}3)=0{,}1805-j0{,}2707\ \text{pu}
$$

> [!success] Resposta Q2
> $$\boxed{P_1=\Re\{\bar{s}_1\}\approx 0{,}180\ \text{pu}}$$
> (folha: $0{,}184$ — diferença vem do $|V|$ usado; a fórmula $P_1=|V|^2 G_1$ é a mesma.)

---

# BLOCO 2 — Questões 3, 4 e 5 (rede P-Q-R com mútuas)

```
   P            Q            R
o──[ z_PQ ]────●────[ z_QR ]──●  (Sistema/Thévenin)
(barra ∞)    defeito
```

Bases: $S_b=100\,\text{MVA}$, $V_b=13{,}8\,\text{kV}$, $Z_b=1{,}9044\,\Omega$, $I_b=\dfrac{100\cdot10^6}{\sqrt3\cdot13{,}8\cdot10^3}=4183{,}7\,\text{A}$.

### Dados convertidos para pu

**Linha QR (com mútua):** $\bar{z}_p=j0{,}8\,\Omega$, $\bar{z}_m=j0{,}35\,\Omega$.
$$
\bar{z}_{0,QR}=\bar{z}_p+2\bar{z}_m=j1{,}5\,\Omega\to j0{,}7876\ \text{pu}
\qquad
\bar{z}_{1,QR}=\bar{z}_{2,QR}=\bar{z}_p-\bar{z}_m=j0{,}45\,\Omega\to j0{,}2363\ \text{pu}
$$

**Linha PQ:** $\bar{z}_0=\bar{z}_1=\bar{z}_2=j0{,}85\,\Omega\to j0{,}4463\ \text{pu}$.

**Sistema (Thévenin do lado R):** de $\bar{S}_{cc}^{3\phi}=j100\,\text{MVA}=j1$ pu e $\bar{S}_{cc}^{1\phi}=j80\,\text{MVA}=j0{,}8$ pu:
$$
\bar{z}_{1,se}=\frac{1}{|\bar{S}_{cc}^{3\phi}|}=j1\ \text{pu}
\qquad
\bar{z}_{0,se}=\frac{3}{\bar{S}_{cc}^{1\phi}}-2\bar{z}_{1,se}=\frac{3}{0{,}8}-2=j1{,}75\ \text{pu}
$$
Tensões: barra infinita $1{,}0\angle0^\circ$; sistema $\frac{14{,}0}{13{,}8}\angle15^\circ=1{,}014\angle15^\circ$.

### Thévenin no ponto Q (defeito)

**Seq. positiva/negativa** (associação em paralelo dos dois lados vista de Q):
$$
\bar{z}_{th,1}=\bar{z}_{1,PQ}\;\|\;(\bar{z}_{1,QR}+\bar{z}_{1,se})
=j0{,}4463\;\|\;(j0{,}2363+j1)= j0{,}3279\ \text{pu}=\bar{z}_{th,2}
$$

**Seq. zero:**
$$
\bar{z}_{th,0}=\bar{z}_{0,PQ}\;\|\;(\bar{z}_{0,QR}+\bar{z}_{0,se})
=j0{,}4463\;\|\;(j0{,}7876+j1{,}75)=j0{,}3796\ \text{pu}
$$

**Tensão de Thévenin** (superposição das duas fontes, divisor):
$$
\bar{v}_{th,1}=\left[\frac{1\angle0^\circ}{\bar{z}_{1,PQ}}+\frac{1{,}014\angle15^\circ}{\bar{z}_{1,QR}+\bar{z}_{1,se}}\right]\bar{z}_{th,1}=0{,}9971\angle4{,}01^\circ\ \text{pu}
$$

### 🖊️ Como desenhar os diagramas sequenciais (P-Q-R)

```
 Seq. 0:  P●──[z0,PQ]──Q(●defeito)──[z0,QR]──R●──[z0,se]──┴(terra)
          (P e R "abertos" p/ terra; sem fontes)

 Seq. 1:  (1∠0°)P──[z1,PQ]──Q──[z1,QR]──R──[z1,se]──(1,014∠15°)
          (duas fontes: barra ∞ à esquerda, sistema à direita)

 Seq. 2:  igual à seq.1, porém SEM as fontes (curto-circuitadas)
```

- Marque **Q** como o nó do defeito nos três diagramas.
- A mútua da linha QR já está **embutida** em $z_{0,QR}=z_p+2z_m$ e $z_{1,QR}=z_p-z_m$.

## Questão 3 — Curto 2φ (BC) em Q, $|I_B|$ em A

> [!tip] Dupla-fase: $\bar{\imath}_1=-\bar{\imath}_2=\dfrac{\bar{v}_{th,1}}{\bar{z}_{th,1}+\bar{z}_{th,2}}$, e $|I_B|=\sqrt3\,|\bar{\imath}_1|\,I_b$.

$$
\bar{\imath}_1=\frac{0{,}9971\angle4{,}01^\circ}{2\cdot j0{,}3279}=1{,}5203\angle{-86{,}0^\circ}\ \text{pu}
$$
$$
|I_B|=\sqrt3\cdot1{,}5203\cdot 4183{,}7\approx 11016\ \text{A}
$$

> [!success] Resposta Q3
> $$\boxed{|I_B|\approx 11{,}0\ \text{kA}\ (11016\ \text{A})}$$ ✅ (confere com a folha, 1,5/1,5)

## Questão 4 — Curto 3φ (ABC) em Q, $|I_A|$ em A

$$
\bar{\imath}_{cc,3\phi}=\frac{\bar{v}_{th,1}}{\bar{z}_{th,1}}=\frac{0{,}9971\angle4{,}01^\circ}{0{,}3279\angle90^\circ}=3{,}0405\angle{-86{,}0^\circ}\ \text{pu}
$$
$$
|I_A|=3{,}0405\cdot 4183{,}7\approx 12720\ \text{A}
$$

> [!success] Resposta Q4
> $$\boxed{|I_A|\approx 12{,}7\ \text{kA}\ (12720\ \text{A})}$$ ✅ (confere com a folha, 1,5/1,5)

## Questão 5 — Contribuição da **barra infinita** para curto fase A-terra, $|I_A|$ em A

> [!danger] Atenção — questão que o aluno errou (0/1) e enunciado parcialmente transcrito
> A folha usa resistência de falta $Z_f=2\,\Omega\Rightarrow 3\bar{z}_f=3{,}15$ pu, mas o enunciado transcrito não deixa esse dado explícito. Abaixo está o **método correto**; o número final depende de $Z_f$ ser ou não considerado.

**Passo 1 — corrente de sequência do defeito 1φ-T** (redes em série $+3\bar{z}_f$):
$$
\bar{\imath}_0=\bar{\imath}_1=\bar{\imath}_2=\frac{\bar{v}_{th,1}}{\bar{z}_{th,0}+\bar{z}_{th,1}+\bar{z}_{th,2}+3\bar{z}_f}
$$

**Passo 2 — tensões de sequência no nó Q:**
$$
\bar{v}_1=\bar{v}_{th,1}-\bar{z}_{th,1}\bar{\imath}_1,\quad \bar{v}_2=-\bar{z}_{th,2}\bar{\imath}_2,\quad \bar{v}_0=-\bar{z}_{th,0}\bar{\imath}_0
$$

**Passo 3 — corrente que vem SÓ da barra infinita** (ramo PQ de cada sequência):
$$
\bar{\imath}_{P1}=\frac{1\angle0^\circ-\bar{v}_1}{\bar{z}_{1,PQ}},\quad
\bar{\imath}_{P2}=\frac{0-\bar{v}_2}{\bar{z}_{1,PQ}},\quad
\bar{\imath}_{P0}=\frac{0-\bar{v}_0}{\bar{z}_{0,PQ}}
$$

**Passo 4 — recompõe a fase A e multiplica por $I_b$:**
$$
I_A^{(P)}=(\bar{\imath}_{P0}+\bar{\imath}_{P1}+\bar{\imath}_{P2})\,I_b
$$

> [!note] Resultados de referência
> - Com $Z_f=2\,\Omega$: $|I_A^{(P)}|\approx 0{,}55\ \text{pu}\Rightarrow\approx 2{,}3\ \text{kA}$.
> - Com $Z_f=0$ (defeito franco): $|I_A^{(P)}|\approx 2{,}24\ \text{pu}\Rightarrow\approx 9{,}4\ \text{kA}$ (o ramo PQ tem menor impedância, leva a maior parcela).
>
> O valor $1799\,\text{A}$ da folha foi anulado pela banca. **O que vale para estudar é o procedimento dos 4 passos.**

---

# BLOCO 3 — Questões 6 a 10 (rede com G1, G2, T1, T2, linha e carga)

> [!info] Estratégia
> Esse bloco é grande. O foco didático é: (a) **mudança de bases por áreas**, (b) **cálculo de pré-falta** com a carga, (c) montagem das **redes de sequência** respeitando as ligações dos transformadores. Vários itens da folha receberam nota parcial; sigo o método correto.

### Áreas e bases ($S_b=1000\,\text{MVA}$)

| Área | $V_b$ | $Z_b$ |
| :-- | :-- | :-- |
| 1 (G1, T1 baixa) | $20\,\text{kV}$ | $0{,}40\,\Omega$ |
| 2 (G2, T2 baixa) | $22\,\text{kV}$ | $0{,}484\,\Omega$ |
| 3 (LT, AT) | $500\,\text{kV}$ | $250\,\Omega$ |

Convertendo (lembrando $\bar{x}_{novo}=\bar{x}\cdot\frac{S_b}{S_{nom}}\cdot\frac{V_{nom}^2}{V_b^2}$):

- **G1:** $x_1=x_2=0{,}1$; $x_0=0{,}05$; $x_{at}=0{,}1$ (⇒ $3x_{at}=0{,}3$).
- **G2:** $x_1=x_2=0{,}1875$; $x_0=0{,}1$ (Y-**isolada** ⇒ aberta na seq. 0).
- **T1** (Yat/Δ): $\bar{x}_{cc}=0{,}175$.
- **T2** (Yat/Yat): $\bar{x}_{cc}=0{,}2$; $\bar{x}_{at}=0{,}05$.
- **LT:** $x_1=x_2=0{,}1$; $x_0=4/15\approx0{,}2667$.
- **Carga** ($1500\,\text{MVA}$, FP $0{,}92$): $\bar{z}_c=\frac{2}{3}\angle23{,}07^\circ$ pu.
- Ponto de falta F: $515\,\text{kV}\Rightarrow v_{pf}=1{,}03$ pu.

### Pré-falta (Questões 6 e 7)

Corrente da carga e divisão entre G1/G2:
$$
\dot{I}_c=\frac{1{,}03}{\frac{2}{3}\angle23{,}07^\circ}=1{,}545\angle{-23{,}07^\circ},\quad
\dot{\imath}_2=\left(\frac{\bar{S}}{\bar{V}}\right)^{*}=0{,}7274\angle{-15{,}64^\circ},\quad
\dot{\imath}_1=\dot{I}_c-\dot{\imath}_2=0{,}829\angle{-29{,}38^\circ}
$$

**Q6 — tensão interna de G1:**
$$
\dot{V}_1=(\bar{x}_{T1}+\bar{x}_{G1})\,\dot{\imath}_1+\dot{V}=(j0{,}175+j0{,}1)\,\dot{\imath}_1+1{,}03 \;\xrightarrow{\times V_b}\; \boxed{|V_1|\approx 25\,007\ \text{V}}
$$
**Q7 — tensão interna de G2:**
$$
\dot{V}_2=(\bar{x}_{G2}+\bar{x}_{T2})\,\dot{\imath}_2+\dot{V}=(j0{,}1875+j0{,}2)\,\dot{\imath}_2+1{,}03\;\xrightarrow{\times V_b}\;\boxed{|V_2|\approx 27\,230\ \text{V}}
$$

> [!success] Respostas Q6 e Q7
> $|V_{1}|\approx 25{,}0\ \text{kV}$ (G1) e $|V_{2}|\approx 27{,}2\ \text{kV}$ (G2). ✅

### Faltas em F (Questões 8 e 9) — método

Monte os Thévenin de sequência **vistos de F**, com a carga ligada:
$$
\bar{z}_{th,1}\approx 0{,}216\angle72{,}7^\circ,\quad \bar{z}_{th,2}=\bar{z}_{th,1},\quad \bar{z}_{th,0}\approx 0{,}368\angle59{,}6^\circ
$$

**Q8 — fase A-terra com $r_f=2\,\Omega$** (séries das 3 redes $+3r_f$):
$$
\dot{\imath}=\frac{1{,}03}{\bar{z}_{th,0}+\bar{z}_{th,1}+\bar{z}_{th,2}+3\bar{r}_f},\qquad I_A=3\dot{\imath}\Rightarrow \text{aplicar } I_b
$$
A folha registrou $\approx 4440\,\text{A}$ (anulada). O procedimento é o que vale.

**Q9 — dupla-fase BC com $r_f=2\,\Omega$ na fase B** (seq. 1 e 2 em paralelo $+r_f$):
$$
\dot{\imath}=\frac{\bar{v}_{th,1}}{\bar{z}_{th,1}+\bar{z}_{th,2}+\bar{r}_f}=2{,}372\angle{-71{,}7^\circ}
\;\Rightarrow\;
|I_B|=\sqrt3\,|\dot{\imath}|\,I_b\approx 4744\ \text{A}
$$

### 🖊️ Como desenhar as redes de sequência (rede grande)

```
 Seq. 0:  G1 ─x0─┐(3x_at)        F        ┌─ aberta (G2 Y-isolada)
                 ├─[T1 Δ bloqueia]──LT0──[T2 Yat-Yat]┤
              terra                    (carga em // em F)

 Seq. 1:  (E_G1)─x1─[T1 ±30°]──LT1──F──LT?──[T2]─x1─(E_G2)
                                  │
                               [z_carga]

 Seq. 2:  igual seq.1, fontes curto-circuitadas; T1 introduz +30° (oposto)
```

> [!important] Pontos que mais derrubam nota aqui
> - **G2 é Y-isolada** → ramo **aberto** na seq. zero (não contribui com $\bar{\imath}_0$).
> - **T1 é Δ/Yat** → o **delta bloqueia** a seq. zero do lado do G1; só o lado AT (Yat) dá caminho à terra.
> - O **defasamento $\pm30^\circ$** dos transformadores Δ-Y só afeta **fases** (Q10), não os módulos de corrente de falta.

## Questão 10 (Bônus) — corrente de falta na fase C de G2 (superposição, sem pré-falta)

> [!note]
> Use superposição: zere as fontes (só a tensão $-\bar{v}_F$ no ponto de falta), resolva as redes de sequência, ache as correntes de sequência **no ramo do G2**, aplique o **defasamento $\pm30^\circ$ de T2** e recomponha a fase C. A folha não registrou valor legível (0/1).

---

> [!abstract] Resumo das respostas (2019)
> | Q | Grandeza | Resposta |
> |:-:|:--|:--|
> | 1 | $|V|$ cargas | $\approx 0{,}950$ pu (folha 0,9583, parcial) |
> | 2 | $P_1$ carga Z | $\approx 0{,}180$ pu |
> | 3 | Curto 2φ em Q | $\approx 11{,}0$ kA ✅ |
> | 4 | Curto 3φ em Q | $\approx 12{,}7$ kA ✅ |
> | 5 | Contribuição barra ∞ (1φ-T) | método dos 4 passos (folha 1799 A anulada) |
> | 6 | $V_{int}$ G1 | $\approx 25{,}0$ kV ✅ |
> | 7 | $V_{int}$ G2 | $\approx 27{,}2$ kV ✅ |
> | 8 | 1φ-T em F ($r_f=2\,\Omega$) | método (folha 4440 A anulada) |
> | 9 | 2φ BC em F | $\approx 4744$ A |
> | 10 | Bônus fase C de G2 | superposição + defasagem T2 |
