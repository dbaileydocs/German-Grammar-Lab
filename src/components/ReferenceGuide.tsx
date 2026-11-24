import type { CategoryKey } from '../types/grammar';

interface ReferenceGuideProps {
  activeTab: CategoryKey;
  onSelectTab: (tab: CategoryKey) => void;
}

const REFERENCE_TABS: { key: CategoryKey; label: string }[] = [
  { key: 'prepositions', label: 'Prepositions & Contractions' },
  { key: 'separable', label: 'Separable Verbs & Satzklammer' },
  { key: 'conjunctions', label: 'Conjunctions & Word Order' },
];

export function ReferenceGuide({ activeTab, onSelectTab }: ReferenceGuideProps) {
  return (
    <section
      className="flex flex-col gap-6 mt-4 pt-10 border-t-2 border-[#c4d0bf]"
      aria-label="Comprehensive Grammar Reference Guide"
    >
      <div>
        <p className="font-mono text-xs font-semibold tracking-wider text-[#8c561e] mb-1">
          Structural Compendium
        </p>
        <h2 className="font-[var(--font-headline)] text-2xl sm:text-3xl font-semibold text-[#1f2b22] m-0">
          German Grammar Reference Guide
        </h2>
        <p className="mt-1.5 text-[#465649] max-w-[68ch]">
          Detailed rules, contraction tables, sentence-bracket diagrams, and clause word-order
          patterns covering all three quiz modules.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Reference topics">
        {REFERENCE_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectTab(tab.key)}
              className={`min-h-[44px] px-4 py-2 rounded-xl font-semibold text-[0.9375rem] border transition-colors duration-150 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#2d6a45] text-white border-[#2d6a45]'
                  : 'bg-[#ecf1e8] text-[#1f2b22] border-[#c4d0bf]/85 hover:bg-[#e0e8da]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel 1: Prepositions & Contractions */}
      {activeTab === 'prepositions' && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="tabpanel"
          aria-label="Prepositions & Contractions"
        >
          <article className="bg-[#ecf1e8] rounded-2xl p-6 flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold tracking-wide text-[#8c561e]">
              Fixed Case: Accusative
            </span>
            <h3 className="font-[var(--font-headline)] text-xl font-semibold text-[#1f2b22] m-0">
              Accusative Prepositions
            </h3>
            <p className="text-[#465649] m-0">
              These prepositions always govern the <strong>accusative case</strong> (only masculine
              articles change: <em>der &rarr; den</em>, <em>ein &rarr; einen</em>):
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#1f2b22] m-0">
              <li>
                <strong>durch</strong> (through):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  durch den Park
                </code>
              </li>
              <li>
                <strong>für</strong> (for):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  für meinen Freund
                </code>
              </li>
              <li>
                <strong>gegen</strong> (against / around):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  gegen den Plan
                </code>
              </li>
              <li>
                <strong>ohne</strong> (without):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  ohne einen Schirm
                </code>
              </li>
              <li>
                <strong>um</strong> (around / at [time]):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  um acht Uhr
                </code>
              </li>
              <li>
                <strong>bis</strong> (until / as far as):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  bis nächsten Freitag
                </code>
              </li>
            </ul>
          </article>

          <article className="bg-[#ecf1e8] rounded-2xl p-6 flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold tracking-wide text-[#2d6a45]">
              Fixed Case: Dative
            </span>
            <h3 className="font-[var(--font-headline)] text-xl font-semibold text-[#1f2b22] m-0">
              Dative Prepositions
            </h3>
            <p className="text-[#465649] m-0">
              These prepositions always require the <strong>dative case</strong> (
              <em>der/das &rarr; dem</em>, <em>die [sg.] &rarr; der</em>,{' '}
              <em>die [pl.] &rarr; den + -n</em>):
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#1f2b22] m-0">
              <li>
                <strong>aus</strong> (from / out of):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  aus dem Büro
                </code>
              </li>
              <li>
                <strong>bei</strong> (at / near / with):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  beim Arzt
                </code>
              </li>
              <li>
                <strong>mit</strong> (with / by transport):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  mit dem Zug
                </code>
              </li>
              <li>
                <strong>nach</strong> (after / to [cities, countries]):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  nach dem Kurs
                </code>
              </li>
              <li>
                <strong>seit</strong> (since / for [time]):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  seit einem Jahr
                </code>
              </li>
              <li>
                <strong>von</strong> (from / by):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  vom Bahnhof
                </code>
              </li>
              <li>
                <strong>zu</strong> (to [people, places]):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  zur Arbeit / zum Amt
                </code>
              </li>
              <li>
                <strong>gegenüber</strong> (opposite):{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  gegenüber der Post
                </code>
              </li>
            </ul>
          </article>

          <article className="md:col-span-2 bg-white border border-[#c4d0bf]/85 rounded-2xl p-6 flex flex-col gap-4">
            <span className="font-mono text-xs font-semibold tracking-wide text-[#2d6a45]">
              Two-Way Rules
            </span>
            <h3 className="font-[var(--font-headline)] text-xl font-semibold text-[#1f2b22] m-0">
              Wechselpräpositionen (Accusative vs. Dative)
            </h3>
            <p className="text-[#465649] m-0">
              Nine spatial prepositions (
              <strong>an, auf, hinter, in, neben, über, unter, vor, zwischen</strong>) switch
              case depending on whether the verb expresses <strong>directed movement</strong> or{' '}
              <strong>static location</strong>:
            </p>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-[0.9375rem] text-left">
                <thead>
                  <tr className="bg-[#ecf1e8] border-b border-[#c4d0bf]">
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Question
                    </th>
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Case
                    </th>
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Typical Verbs
                    </th>
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#c4d0bf]/70">
                    <td className="p-3 align-top">
                      <strong>Wohin?</strong> (Where to?)
                    </td>
                    <td className="p-3 align-top">
                      <strong>Accusative</strong> (movement / change of place)
                    </td>
                    <td className="p-3 align-top">
                      <em>gehen, fahren, stellen, legen, setzen, hängen</em>
                    </td>
                    <td className="p-3 align-top">
                      Ich gehe <strong className="text-[#2d6a45]">ins</strong> Kino. / Er legt das
                      Buch <strong className="text-[#2d6a45]">auf den</strong> Tisch.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 align-top">
                      <strong>Wo?</strong> (Where?)
                    </td>
                    <td className="p-3 align-top">
                      <strong>Dative</strong> (static position / location)
                    </td>
                    <td className="p-3 align-top">
                      <em>sein, bleiben, stehen, liegen, sitzen, warten, arbeiten</em>
                    </td>
                    <td className="p-3 align-top">
                      Ich bin <strong className="text-[#2d6a45]">im</strong> Kino. / Das Buch liegt{' '}
                      <strong className="text-[#2d6a45]">auf dem</strong> Tisch.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className="md:col-span-2 bg-white border border-[#c4d0bf]/85 rounded-2xl p-6 flex flex-col gap-4">
            <span className="font-mono text-xs font-semibold tracking-wide text-[#8c561e]">
              Complete Lookup Chart
            </span>
            <h3 className="font-[var(--font-headline)] text-xl font-semibold text-[#1f2b22] m-0">
              Standard German Prepositional Contractions
            </h3>
            <p className="text-[#465649] m-0">
              In everyday and written German, frequent preposition + definite article pairs fuse
              into a single word without an apostrophe:
            </p>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-[0.9375rem] text-left">
                <thead>
                  <tr className="bg-[#ecf1e8] border-b border-[#c4d0bf]">
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Contraction
                    </th>
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Components
                    </th>
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Case &amp; Gender
                    </th>
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Natural Usage Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { c: 'im', comp: 'in + dem', cg: 'Dative (masc. / neut.)', ex: <>Wir warten <strong className="text-[#2d6a45]">im</strong> Büro. / <strong className="text-[#2d6a45]">im</strong> Januar</> },
                    { c: 'ins', comp: 'in + das', cg: 'Accusative (neuter)', ex: <>Sie geht heute Abend <strong className="text-[#2d6a45]">ins</strong> Kino.</> },
                    { c: 'am', comp: 'an + dem', cg: 'Dative (masc. / neut.)', ex: <>Der Termin ist <strong className="text-[#2d6a45]">am</strong> Montag. / <strong className="text-[#2d6a45]">am</strong> Fenster</> },
                    { c: 'ans', comp: 'an + das', cg: 'Accusative (neuter)', ex: <>Er geht <strong className="text-[#2d6a45]">ans</strong> Telefon. / Wir fahren <strong className="text-[#2d6a45]">ans</strong> Meer.</> },
                    { c: 'zum', comp: 'zu + dem', cg: 'Dative (masc. / neut.)', ex: <>Ich fahre <strong className="text-[#2d6a45]">zum</strong> Bahnhof. / <strong className="text-[#2d6a45]">zum</strong> Arzt</> },
                    { c: 'zur', comp: 'zu + der', cg: 'Dative (feminine)', ex: <>Sie geht zu Fuß <strong className="text-[#2d6a45]">zur</strong> Post / <strong className="text-[#2d6a45]">zur</strong> Schule.</> },
                    { c: 'vom', comp: 'von + dem', cg: 'Dative (masc. / neut.)', ex: <>Er kommt gerade <strong className="text-[#2d6a45]">vom</strong> Rathaus / <strong className="text-[#2d6a45]">vom</strong> Zahnarzt.</> },
                    { c: 'beim', comp: 'bei + dem', cg: 'Dative (masc. / neut.)', ex: <>Ich war gestern <strong className="text-[#2d6a45]">beim</strong> Bäcker / <strong className="text-[#2d6a45]">beim</strong> Friseur.</> },
                    { c: 'aufs', comp: 'auf + das', cg: 'Accusative (neuter)', ex: <>Sie stellt die Tasse <strong className="text-[#2d6a45]">aufs</strong> Regal.</> },
                    { c: 'fürs', comp: 'für + das', cg: 'Accusative (neuter)', ex: <>Vielen Dank <strong className="text-[#2d6a45]">fürs</strong> Zuhören!</> },
                    { c: 'durchs', comp: 'durch + das', cg: 'Accusative (neuter)', ex: <>Die Kinder laufen <strong className="text-[#2d6a45]">durchs</strong> Haus.</> },
                    { c: 'ums', comp: 'um + das', cg: 'Accusative (neuter)', ex: <>Wir gehen einmal <strong className="text-[#2d6a45]">ums</strong> Gebäude.</> },
                  ].map((row, idx, arr) => (
                    <tr
                      key={row.c}
                      className={idx < arr.length - 1 ? 'border-b border-[#c4d0bf]/70' : ''}
                    >
                      <td className="p-3 font-bold text-[#2d6a45] align-top">{row.c}</td>
                      <td className="p-3 align-top">{row.comp}</td>
                      <td className="p-3 align-top">{row.cg}</td>
                      <td className="p-3 align-top">{row.ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}

      {/* Panel 2: Separable Verbs & Satzklammer */}
      {activeTab === 'separable' && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="tabpanel"
          aria-label="Separable Verbs & Satzklammer"
        >
          <article className="bg-[#ecf1e8] rounded-2xl p-6 flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold tracking-wide text-[#2d6a45]">
              Prefix Inventory
            </span>
            <h3 className="font-[var(--font-headline)] text-xl font-semibold text-[#1f2b22] m-0">
              Separable vs. Inseparable Prefixes
            </h3>
            <p className="text-[#465649] m-0">
              Stressed prefixes detach from the verb stem in main clauses; unstressed prefixes stay
              permanently attached.
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#1f2b22] m-0">
              <li>
                <strong>Always separable (stressed):</strong>{' '}
                <em>
                  ab-, an-, auf-, aus-, bei-, ein-, fern-, mit-, nach-, vor-, weg-, zu-, zurück-,
                  zusammen-
                </em>
                .
                <br />
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded mt-1 inline-block">
                  abfahren &rarr; Der Zug fährt um 9 Uhr ab.
                </code>
              </li>
              <li>
                <strong>Always inseparable (unstressed):</strong>{' '}
                <em>be-, emp-, ent-, er-, ge-, miss-, ver-, zer-</em>.
                <br />
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded mt-1 inline-block">
                  verstehen &rarr; Ich verstehe den Text.
                </code>
              </li>
              <li>
                <strong>
                  No <em>ge-</em> in Perfekt for inseparable verbs:
                </strong>{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  Ich habe das Formular bezahlt.
                </code>
              </li>
            </ul>
          </article>

          <article className="bg-[#ecf1e8] rounded-2xl p-6 flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold tracking-wide text-[#8c561e]">
              Modal &amp; Clause Interactions
            </span>
            <h3 className="font-[var(--font-headline)] text-xl font-semibold text-[#1f2b22] m-0">
              When Separable Verbs Stay Together
            </h3>
            <p className="text-[#465649] m-0">
              A separable verb only splits when it is the conjugated finite verb in a main clause:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#1f2b22] m-0">
              <li>
                <strong>With a modal verb:</strong> The modal sits in Position 2; the separable verb
                moves to the end in its <strong>full infinitive</strong>.
                <br />
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded mt-1 inline-block">
                  Sie müssen das Formular <strong>ausfüllen</strong>.
                </code>
              </li>
              <li>
                <strong>
                  In subordinate clauses (<em>weil, dass, wenn</em>):
                </strong>{' '}
                The conjugated verb stays attached to its prefix at the very end.
                <br />
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded mt-1 inline-block">
                  ..., weil der Bus pünktlich <strong>ankommt</strong>.
                </code>
              </li>
              <li>
                <strong>In the Imperative:</strong> Conjugated stem in Position 1, prefix at the
                end.
                <br />
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded mt-1 inline-block">
                  Füllen Sie bitte das Formular <strong>aus</strong>!
                </code>
              </li>
              <li>
                <strong>In the Perfekt tense:</strong> <em>-ge-</em> sits between prefix and
                participle.
                <br />
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded mt-1 inline-block">
                  ausfüllen &rarr; aus<strong>ge</strong>füllt
                </code>{' '}
                /{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded mt-1 inline-block">
                  einziehen &rarr; ein<strong>ge</strong>zogen
                </code>
              </li>
            </ul>
          </article>

          <article className="md:col-span-2 bg-white border border-[#c4d0bf]/85 rounded-2xl p-6 flex flex-col gap-4">
            <span className="font-mono text-xs font-semibold tracking-wide text-[#2d6a45]">
              Satzklammer Blueprint
            </span>
            <h3 className="font-[var(--font-headline)] text-xl font-semibold text-[#1f2b22] m-0">
              The German Sentence Bracket (Satzklammer)
            </h3>
            <p className="text-[#465649] m-0">
              Position 2 holds the conjugated verb; the detached prefix, infinitive, or past
              participle closes the clause at the very end, enclosing time, manner, and objects
              inside the bracket.
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-2.5 items-stretch bg-[#f6f8f4] border border-[#c4d0bf]/80 rounded-xl p-4"
              aria-label="Sentence bracket structure"
            >
              <div className="bg-[#d8efe0] text-[#174328] font-bold px-4 py-2.5 rounded-lg text-center">
                <span className="block font-mono text-[11px] tracking-wider opacity-85 mb-0.5">
                  Position 2 (Left Bracket)
                </span>
                ruft / muss / hat
              </div>
              <div className="bg-[#ecf1e8] text-[#465649] px-4 py-2.5 rounded-lg text-center">
                <span className="block font-mono text-[11px] tracking-wider opacity-85 mb-0.5">
                  Mittelfeld (Time · Manner · Place · Objects)
                </span>
                am Nachmittag seine Kollegin im Büro
              </div>
              <div className="bg-[#f5dbb3] text-[#63390b] font-bold px-4 py-2.5 rounded-lg text-center">
                <span className="block font-mono text-[11px] tracking-wider opacity-85 mb-0.5">
                  End Position (Right Bracket)
                </span>
                an / anrufen / angerufen
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Panel 3: Conjunctions & Word Order */}
      {activeTab === 'conjunctions' && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="tabpanel"
          aria-label="Conjunctions & Word Order"
        >
          <article className="bg-[#ecf1e8] rounded-2xl p-6 flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold tracking-wide text-[#2d6a45]">
              Position 0
            </span>
            <h3 className="font-[var(--font-headline)] text-xl font-semibold text-[#1f2b22] m-0">
              Coordinating Conjunctions (ADUSO)
            </h3>
            <p className="text-[#465649] m-0">
              <strong>A</strong>ber, <strong>D</strong>enn, <strong>U</strong>nd,{' '}
              <strong>S</strong>ondern, <strong>O</strong>der link two main clauses at{' '}
              <strong>Position 0</strong> without altering standard subject–verb word order:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#1f2b22] m-0">
              <li>
                <strong>und</strong> (and) · <strong>oder</strong> (or) · <strong>aber</strong> (but
                / however)
              </li>
              <li>
                <strong>denn</strong> (because — main clause order: verb stays in Position 2)
              </li>
              <li>
                <strong>sondern</strong> (but rather — used only after a negative statement)
              </li>
              <li>
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  Er bleibt zu Hause, <strong>denn</strong> er <strong>hat</strong> Fieber.
                </code>
              </li>
            </ul>
          </article>

          <article className="bg-[#ecf1e8] rounded-2xl p-6 flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold tracking-wide text-[#8c561e]">
              Verb at End
            </span>
            <h3 className="font-[var(--font-headline)] text-xl font-semibold text-[#1f2b22] m-0">
              Subordinating Conjunctions
            </h3>
            <p className="text-[#465649] m-0">
              Subordinating conjunctions require a preceding comma and send the{' '}
              <strong>conjugated finite verb to the very end</strong> of the dependent clause:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#1f2b22] m-0">
              <li>
                <strong>weil / da</strong> (because / since), <strong>obwohl</strong> (although),{' '}
                <strong>dass</strong> (that), <strong>ob</strong> (whether)
              </li>
              <li>
                <strong>wenn</strong> (if / whenever / present or repeated past),{' '}
                <strong>als</strong> (when — single completed event in the past)
              </li>
              <li>
                <strong>nachdem</strong> (after), <strong>bevor</strong> (before),{' '}
                <strong>während</strong> (while)
              </li>
              <li>
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  Ich bleibe hier, <strong>weil</strong> ich heute noch arbeiten{' '}
                  <strong>muss</strong>.
                </code>
              </li>
              <li>
                <strong>Fronted clause rule:</strong> If the subordinate clause comes first, the
                main clause starts immediately with its verb:{' '}
                <code className="font-mono text-[13px] bg-white border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                  Wenn es regnet, <strong>bleiben</strong> wir drinnen.
                </code>
              </li>
            </ul>
          </article>

          <article className="md:col-span-2 bg-white border border-[#c4d0bf]/85 rounded-2xl p-6 flex flex-col gap-4">
            <span className="font-mono text-xs font-semibold tracking-wide text-[#2d6a45]">
              Position 1 + Inversion
            </span>
            <h3 className="font-[var(--font-headline)] text-xl font-semibold text-[#1f2b22] m-0">
              Adverbial Connectors &amp; Subject–Verb Inversion
            </h3>
            <p className="text-[#465649] m-0">
              Conjunctive adverbs occupy <strong>Position 1</strong> (or sit in the Mittelfeld).
              When placed at Position 1, the conjugated verb must stay in{' '}
              <strong>Position 2</strong>, forcing the subject directly behind it (Subject–Verb
              inversion).
            </p>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-[0.9375rem] text-left">
                <thead>
                  <tr className="bg-[#ecf1e8] border-b border-[#c4d0bf]">
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Connector
                    </th>
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Meaning
                    </th>
                    <th className="font-mono text-xs font-semibold tracking-wider text-[#4e6152] p-3">
                      Word Order Pattern (Pos. 1 &rarr; Pos. 2 Verb &rarr; Subject)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      conn: 'deshalb / deswegen',
                      mean: 'therefore / that is why',
                      pat: (
                        <>
                          Es regnet stark. <strong className="text-[#2d6a45]">Deshalb nehmen</strong>{' '}
                          wir die U-Bahn.
                        </>
                      ),
                    },
                    {
                      conn: 'trotzdem',
                      mean: 'nevertheless / despite that',
                      pat: (
                        <>
                          Der Bus hat Verspätung.{' '}
                          <strong className="text-[#2d6a45]">Trotzdem kommen</strong> wir pünktlich.
                        </>
                      ),
                    },
                    {
                      conn: 'dann / danach',
                      mean: 'then / afterwards',
                      pat: (
                        <>
                          Ich fülle das Formular aus.{' '}
                          <strong className="text-[#2d6a45]">Danach gebe</strong> ich es ab.
                        </>
                      ),
                    },
                    {
                      conn: 'außerdem',
                      mean: 'moreover / besides',
                      pat: (
                        <>
                          Die Wohnung ist hell.{' '}
                          <strong className="text-[#2d6a45]">Außerdem liegt</strong> sie zentral.
                        </>
                      ),
                    },
                    {
                      conn: 'sonst',
                      mean: 'otherwise',
                      pat: (
                        <>
                          Beeil dich, <strong className="text-[#2d6a45]">sonst verpassen</strong>{' '}
                          wir den Zug!
                        </>
                      ),
                    },
                  ].map((row, idx, arr) => (
                    <tr
                      key={row.conn}
                      className={idx < arr.length - 1 ? 'border-b border-[#c4d0bf]/70' : ''}
                    >
                      <td className="p-3 font-bold text-[#2d6a45] align-top">{row.conn}</td>
                      <td className="p-3 align-top">{row.mean}</td>
                      <td className="p-3 align-top">{row.pat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#465649] m-0 pt-1">
              <strong>TEKAMOLO Reminder:</strong> Inside the Mittelfeld, adverbials follow{' '}
              <strong>Te</strong>mporal (when?) &rarr; <strong>Ka</strong>usal (why?) &rarr;{' '}
              <strong>Mo</strong>dal (how?) &rarr; <strong>Lo</strong>kal (where?):{' '}
              <code className="font-mono text-[13px] bg-[#ecf1e8] border border-[#c4d0bf]/80 px-1.5 py-0.5 rounded">
                Wir fahren <em>morgen</em> (T) <em>wegen des Termins</em> (K){' '}
                <em>mit dem Zug</em> (M) <em>nach Köln</em> (L).
              </code>
            </p>
          </article>
        </div>
      )}
    </section>
  );
}
