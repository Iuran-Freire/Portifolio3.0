import type React from "react";

/*
  Ilustrações da trajetória, desenhadas em SVG no estilo do site:
  traço claro, superfícies escuras e detalhes em vermelho.
  Elementos com data-pop "surgem" quando a cena entra na tela.
  Todas usam o mesmo viewBox (400 x 280) e a mesma figura de pessoa.
  O gradiente de brilho (#journey-glow) é definido uma vez em JourneyWalk.
*/

const S = {
  line: "var(--ink-muted)",
  ink: "var(--ink)",
  surface: "var(--surface)",
  grid: "var(--line)",
  signal: "var(--signal)",
};

type SceneProps = { title: string };

function Frame({ title, children }: SceneProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 400 280" role="img" aria-label={title} className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* chão */}
      <line x1="20" y1="248" x2="380" y2="248" stroke={S.grid} strokeWidth="2" />
      {children}
    </svg>
  );
}

// Pessoa simples: cabeça, tronco e membros. Mesma figura em todas as cenas.
function Person({ x, y, scale = 1, sitting = false }: { x: number; y: number; scale?: number; sitting?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={S.ink} strokeWidth="3">
      <circle cx="0" cy="-62" r="11" fill={S.surface} />
      <path d="M0 -50 L0 -18" />
      <path d="M0 -40 L-14 -24 M0 -40 L14 -26" />
      {sitting ? <path d="M0 -18 L18 -18 L18 0 M0 -18 L-4 0" /> : <path d="M0 -18 L-10 0 M0 -18 L10 0" />}
    </g>
  );
}

// 1. Curiosidade: deitado na cama, só o celular acendendo o quarto.
export function ScenePhone({ title }: SceneProps) {
  return (
    <Frame title={title}>
      {/* janela com a lua */}
      <rect data-pop x="270" y="34" width="86" height="70" rx="6" stroke={S.line} strokeWidth="2" />
      <line x1="313" y1="34" x2="313" y2="104" stroke={S.line} strokeWidth="2" />
      <circle data-pop cx="296" cy="58" r="10" fill={S.ink} opacity="0.85" />
      {/* cama */}
      <rect x="40" y="186" width="250" height="34" rx="6" fill={S.surface} stroke={S.line} strokeWidth="2" />
      <line x1="40" y1="220" x2="40" y2="248" stroke={S.line} strokeWidth="3" />
      <line x1="290" y1="220" x2="290" y2="248" stroke={S.line} strokeWidth="3" />
      <rect x="52" y="168" width="54" height="20" rx="8" fill={S.surface} stroke={S.line} strokeWidth="2" />
      {/* pessoa deitada segurando o celular */}
      <g stroke={S.ink} strokeWidth="3">
        <circle cx="86" cy="164" r="12" fill={S.surface} />
        <path d="M100 172 L230 176" />
        <path d="M230 176 L262 170 M230 176 L264 184" />
        <path d="M112 170 L128 130" />
      </g>
      {/* luz da tela */}
      <circle data-pop cx="132" cy="122" r="46" fill="url(#journey-glow)" />
      <rect data-pop x="122" y="104" width="18" height="30" rx="3" fill={S.signal} />
      {/* ideias saindo do celular */}
      <g data-pop fill="none" stroke={S.signal} strokeWidth="2">
        <path d="M160 82 l10 6 -10 6 z" fill={S.signal} />
      </g>
      <text data-pop x="186" y="66" fill={S.ink} fontFamily="var(--font-plex-mono)" fontSize="14">{"</>"}</text>
      <text data-pop x="150" y="48" fill={S.line} fontFamily="var(--font-plex-mono)" fontSize="12">?</text>
    </Frame>
  );
}

// 2. Curso técnico: sala de aula, circuito no quadro.
export function SceneClassroom({ title }: SceneProps) {
  return (
    <Frame title={title}>
      <rect x="70" y="30" width="260" height="120" rx="8" fill={S.surface} stroke={S.line} strokeWidth="2" />
      {/* circuito no quadro */}
      <g data-pop stroke={S.ink} strokeWidth="2">
        <path d="M100 90 L140 90 L150 76 L162 104 L174 76 L186 104 L196 90 L236 90" />
        <path d="M236 70 L236 110 M246 78 L246 102" />
        <path d="M246 90 L300 90 L300 60 L100 60 L100 90" />
      </g>
      <circle data-pop cx="300" cy="60" r="5" fill={S.signal} />
      <text data-pop x="112" y="132" fill={S.line} fontFamily="var(--font-plex-mono)" fontSize="11">V = R × I</text>
      {/* mesas e alunos */}
      <rect x="60" y="214" width="120" height="10" rx="3" fill={S.surface} stroke={S.line} strokeWidth="2" />
      <rect x="220" y="214" width="120" height="10" rx="3" fill={S.surface} stroke={S.line} strokeWidth="2" />
      <Person x={110} y={232} sitting />
      <Person x={270} y={232} sitting />
      <rect data-pop x="138" y="204" width="26" height="10" rx="2" fill={S.signal} />
    </Frame>
  );
}

// 3. Fábrica: assistente de instrumentação medindo um manômetro.
export function SceneFactory({ title }: SceneProps) {
  return (
    <Frame title={title}>
      {/* tubulação */}
      <g stroke={S.line} strokeWidth="10" opacity="0.6">
        <path d="M20 120 L220 120 L220 248" />
        <path d="M300 30 L300 180 L380 180" />
      </g>
      {/* manômetro */}
      <g data-pop>
        <circle cx="220" cy="96" r="30" fill={S.surface} stroke={S.ink} strokeWidth="3" />
        <path d="M200 106 A22 22 0 0 1 240 106" stroke={S.line} strokeWidth="2" />
        <line x1="220" y1="96" x2="236" y2="80" stroke={S.signal} strokeWidth="3" />
        <circle cx="220" cy="96" r="3" fill={S.signal} />
      </g>
      {/* máquina */}
      <rect x="300" y="190" width="70" height="58" rx="6" fill={S.surface} stroke={S.line} strokeWidth="2" />
      <circle data-pop cx="322" cy="214" r="6" fill={S.signal} />
      <rect x="336" y="208" width="24" height="12" rx="2" stroke={S.line} strokeWidth="2" />
      {/* pessoa com multímetro */}
      <Person x={150} y={248} scale={1.4} />
      <rect data-pop x="168" y="170" width="18" height="26" rx="3" fill={S.surface} stroke={S.signal} strokeWidth="2" />
      <path data-pop d="M186 178 C200 170 205 140 210 124" stroke={S.signal} strokeWidth="2" />
    </Frame>
  );
}

// 4. Faculdade: entrando no prédio da universidade.
export function SceneUniversity({ title }: SceneProps) {
  return (
    <Frame title={title}>
      {/* prédio com frontão e colunas */}
      <path data-pop d="M180 70 L290 30 L400 70 Z" fill={S.surface} stroke={S.line} strokeWidth="2" />
      <rect x="186" y="70" width="208" height="12" fill={S.surface} stroke={S.line} strokeWidth="2" />
      {[206, 246, 286, 326, 366].map((x) => (
        <rect key={x} x={x - 6} y="82" width="12" height="140" fill={S.surface} stroke={S.line} strokeWidth="2" />
      ))}
      <rect x="180" y="222" width="220" height="10" fill={S.surface} stroke={S.line} strokeWidth="2" />
      <rect x="170" y="232" width="240" height="16" fill={S.surface} stroke={S.line} strokeWidth="2" />
      <circle data-pop cx="290" cy="56" r="6" fill={S.signal} />
      {/* pessoa com mochila caminhando até a porta */}
      <Person x={100} y={248} scale={1.4} />
      <rect data-pop x="80" y="160" width="16" height="26" rx="4" fill={S.signal} />
      <path data-pop d="M128 210 L160 210 M150 200 L160 210 L150 220" stroke={S.signal} strokeWidth="2" />
    </Frame>
  );
}

// 5. Estágio: o primeiro computador, um dashboard na tela.
export function SceneInternship({ title }: SceneProps) {
  return (
    <Frame title={title}>
      {/* monitor com dashboard */}
      <rect x="150" y="50" width="200" height="130" rx="8" fill={S.surface} stroke={S.ink} strokeWidth="3" />
      <g data-pop fill={S.signal}>
        <rect x="174" y="130" width="18" height="34" rx="2" />
        <rect x="200" y="112" width="18" height="52" rx="2" />
        <rect x="226" y="98" width="18" height="66" rx="2" opacity="0.7" />
        <rect x="252" y="120" width="18" height="44" rx="2" />
      </g>
      <path data-pop d="M282 150 L300 128 L316 136 L334 96" stroke={S.ink} strokeWidth="2" />
      <rect x="236" y="180" width="28" height="22" fill={S.surface} stroke={S.line} strokeWidth="2" />
      {/* mesa */}
      <rect x="110" y="202" width="270" height="10" rx="3" fill={S.surface} stroke={S.line} strokeWidth="2" />
      <line x1="130" y1="212" x2="130" y2="248" stroke={S.line} strokeWidth="3" />
      <line x1="360" y1="212" x2="360" y2="248" stroke={S.line} strokeWidth="3" />
      <Person x={70} y={248} scale={1.35} sitting />
      <rect data-pop x="190" y="194" width="60" height="6" rx="2" fill={S.line} />
    </Frame>
  );
}

// 6. Dos dados ao software: código na tela e o app validando uma peça.
export function SceneSoftware({ title }: SceneProps) {
  return (
    <Frame title={title}>
      {/* janela de código */}
      <rect x="40" y="40" width="200" height="150" rx="8" fill={S.surface} stroke={S.ink} strokeWidth="3" />
      <g stroke={S.line} strokeWidth="2">
        <circle cx="58" cy="56" r="3" />
        <circle cx="70" cy="56" r="3" />
      </g>
      <g data-pop strokeWidth="4">
        <line x1="60" y1="84" x2="140" y2="84" stroke={S.signal} />
        <line x1="76" y1="102" x2="200" y2="102" stroke={S.line} />
        <line x1="76" y1="120" x2="170" y2="120" stroke={S.line} />
        <line x1="92" y1="138" x2="210" y2="138" stroke={S.signal} />
        <line x1="60" y1="156" x2="120" y2="156" stroke={S.line} />
      </g>
      {/* celular lendo o Data Matrix */}
      <rect x="276" y="70" width="80" height="150" rx="12" fill={S.surface} stroke={S.ink} strokeWidth="3" />
      <g data-pop fill={S.ink}>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => ((r + c) % 2 === 0 || r === 3 || c === 0 ? <rect key={`${r}${c}`} x={296 + c * 10} y={104 + r * 10} width="8" height="8" /> : null)),
        )}
      </g>
      <circle data-pop cx="316" cy="178" r="14" fill={S.signal} />
      <path data-pop d="M309 178 L314 183 L324 172" stroke={S.surface} strokeWidth="3" />
      <path data-pop d="M244 118 L270 118 M262 110 L270 118 L262 126" stroke={S.signal} strokeWidth="2" />
    </Frame>
  );
}

// 7. Hoje: a próxima porta, a primeira vaga em tecnologia.
export function SceneToday({ title }: SceneProps) {
  return (
    <Frame title={title}>
      {/* sol nascendo */}
      <circle data-pop cx="300" cy="248" r="90" fill="url(#journey-glow)" />
      <path data-pop d="M250 248 A50 50 0 0 1 350 248" fill={S.signal} opacity="0.9" />
      {/* porta aberta com luz */}
      <rect x="270" y="110" width="60" height="138" fill={S.surface} stroke={S.ink} strokeWidth="3" />
      <path data-pop d="M270 110 L250 122 L250 248 L270 248" fill={S.signal} opacity="0.35" stroke={S.signal} strokeWidth="2" />
      {/* caminho até a porta */}
      <path d="M40 248 C120 230 200 250 270 246" stroke={S.line} strokeWidth="2" strokeDasharray="6 8" />
      <Person x={150} y={248} scale={1.4} />
      <path data-pop d="M186 200 L230 200 M220 190 L230 200 L220 210" stroke={S.signal} strokeWidth="2" />
      <text data-pop x="40" y="60" fill={S.line} fontFamily="var(--font-plex-mono)" fontSize="12">next()</text>
    </Frame>
  );
}

export const scenes = [ScenePhone, SceneClassroom, SceneFactory, SceneUniversity, SceneInternship, SceneSoftware, SceneToday];
