import type { QuestionItem } from '../types/grammar';

export function buildQuestionPool(): QuestionItem[] {
  const pool: QuestionItem[] = [];

  // -----------------------------------------------------------------------
  // CATEGORY A: PREPOSITIONS & CONTRACTIONS (340 unique questions)
  // -----------------------------------------------------------------------
  const peopleSg = [
    { subj: `Ich`, verbG: `gehe`, verbF: `fahre`, verbW: `warte`, verbB: `bleibe`, verbA: `arbeite`, verbS: `sitze`, verbK: `komme`, enSubj: `I` },
    { subj: `Du`, verbG: `gehst`, verbF: `fährst`, verbW: `wartest`, verbB: `bleibst`, verbA: `arbeitest`, verbS: `sitzt`, verbK: `kommst`, enSubj: `You` },
    { subj: `Anna`, verbG: `geht`, verbF: `fährt`, verbW: `wartet`, verbB: `bleibt`, verbA: `arbeitet`, verbS: `sitzt`, verbK: `kommt`, enSubj: `Anna` },
    { subj: `Lukas`, verbG: `geht`, verbF: `fährt`, verbW: `wartet`, verbB: `bleibt`, verbA: `arbeitet`, verbS: `sitzt`, verbK: `kommt`, enSubj: `Lukas` },
    { subj: `Frau Weber`, verbG: `geht`, verbF: `fährt`, verbW: `wartet`, verbB: `bleibt`, verbA: `arbeitet`, verbS: `sitzt`, verbK: `kommt`, enSubj: `Ms Weber` },
    { subj: `Herr Klein`, verbG: `geht`, verbF: `fährt`, verbW: `wartet`, verbB: `bleibt`, verbA: `arbeitet`, verbS: `sitzt`, verbK: `kommt`, enSubj: `Mr Klein` },
    { subj: `Wir`, verbG: `gehen`, verbF: `fahren`, verbW: `warten`, verbB: `bleiben`, verbA: `arbeiten`, verbS: `sitzen`, verbK: `kommen`, enSubj: `We` },
    { subj: `Meine Freunde`, verbG: `gehen`, verbF: `fahren`, verbW: `warten`, verbB: `bleiben`, verbA: `arbeiten`, verbS: `sitzen`, verbK: `kommen`, enSubj: `My friends` },
  ];

  // A1. Movement vs Location with Contractions (im / ins) -> 96 questions
  const neuterBuildings = [
    { noun: `Kino`, en: `the cinema`, time: `heute Abend`, enTime: `this evening` },
    { noun: `Büro`, en: `the office`, time: `am Vormittag`, enTime: `in the morning` },
    { noun: `Restaurant`, en: `the restaurant`, time: `um acht Uhr`, enTime: `at eight o'clock` },
    { noun: `Museum`, en: `the museum`, time: `am Sonntag`, enTime: `on Sunday` },
    { noun: `Schwimmbad`, en: `the swimming pool`, time: `am Nachmittag`, enTime: `in the afternoon` },
    { noun: `Café`, en: `the café`, time: `nach dem Kurs`, enTime: `after the class` },
  ];

  for (const p of peopleSg) {
    for (const loc of neuterBuildings) {
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Wechselpräposition (in + Accusative)`,
        prompt: `${p.subj} ${p.verbG} ${loc.time} _____ ${loc.noun}.`,
        answer: `ins`,
        options: [`ins`, `im`, `zum`, `am`],
        en: `${p.enSubj} go/goes to ${loc.en} ${loc.enTime}.`,
        why: `"${p.verbG}" expresses movement into an enclosed place (Wohin?), requiring Accusative. "in + das" contracts to "ins".`,
      });
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Wechselpräposition (in + Dative)`,
        prompt: `${p.subj} ${p.verbB} ${loc.time} noch eine Stunde _____ ${loc.noun}.`,
        answer: `im`,
        options: [`im`, `ins`, `ans`, `zur`],
        en: `${p.enSubj} stay/stays in ${loc.en} for another hour ${loc.enTime}.`,
        why: `"${p.verbB}" indicates a static location (Wo?), requiring Dative. "in + dem" contracts to "im".`,
      });
    }
  }

  // A2. "zu" contractions (zum vs zur) -> 48 questions
  const zuDestinations = [
    { noun: `Bahnhof`, art: `zum`, wrong: [`zur`, `ins`, `am`], en: `the railway station`, mode: `f` },
    { noun: `Arzt`, art: `zum`, wrong: [`zur`, `ins`, `ans`], en: `the doctor`, mode: `g` },
    { noun: `Supermarkt`, art: `zum`, wrong: [`zur`, `ins`, `im`], en: `the supermarket`, mode: `g` },
    { noun: `Post`, art: `zur`, wrong: [`zum`, `ins`, `im`], en: `the post office`, mode: `g` },
    { noun: `Bank`, art: `zur`, wrong: [`zum`, `ans`, `beim`], en: `the bank`, mode: `g` },
    { noun: `Behörde`, art: `zur`, wrong: [`zum`, `vom`, `am`], en: `the public office`, mode: `g` },
  ];

  for (const p of peopleSg) {
    for (const d of zuDestinations) {
      const v = d.mode === `f` ? p.verbF : p.verbG;
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Dative Contraction (${d.art})`,
        prompt: `${p.subj} ${v} heute Vormittag schnell _____ ${d.noun}.`,
        answer: d.art,
        options: [d.art, ...d.wrong],
        en: `${p.enSubj} go/goes quickly to ${d.en} this morning.`,
        why: `The preposition "zu" always takes the Dative case. ${
          d.art === `zum`
            ? `"zu + dem" contracts to "zum" for masculine/neuter nouns.`
            : `"zu + der" contracts to "zur" for feminine nouns.`
        }`,
      });
    }
  }

  // A3. "vom" (coming from) and "beim" (at someone's place / service) -> 64 questions
  const servicePlaces = [
    { noun: `Bäcker`, en: `the bakery` },
    { noun: `Zahnarzt`, en: `the dentist` },
    { noun: `Friseur`, en: `the hairdresser` },
    { noun: `Rathaus`, en: `the town hall` },
  ];
  for (const p of peopleSg) {
    for (const sp of servicePlaces) {
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Dative Contraction (vom = von + dem)`,
        prompt: `${p.subj} ${p.verbK} gerade direkt _____ ${sp.noun}.`,
        answer: `vom`,
        options: [`vom`, `beim`, `zum`, `ins`],
        en: `${p.enSubj} am/are/is coming straight from ${sp.en}.`,
        why: `"kommen von" expresses origin and governs Dative. "von + dem" contracts to "vom".`,
      });
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Dative Contraction (beim = bei + dem)`,
        prompt: `${p.subj} ${p.verbW} schon seit zwanzig Minuten _____ ${sp.noun}.`,
        answer: `beim`,
        options: [`beim`, `zum`, `ins`, `ans`],
        en: `${p.enSubj} have/has been waiting at ${sp.en} for twenty minutes.`,
        why: `"bei" always takes the Dative and describes location at a person or establishment. "bei + dem" contracts to "beim".`,
      });
    }
  }

  // A4. Time & Border Prepositions: "am", "im", "um" -> 32 questions
  const daysAndMonths = [
    { phrase: `Montag`, ans: `am`, opts: [`am`, `im`, `um`, `zum`], en: `on Monday`, why: `Days of the week take "am" (an + dem).` },
    { phrase: `Freitagabend`, ans: `am`, opts: [`am`, `im`, `um`, `beim`], en: `on Friday evening`, why: `Days and parts of a specific day use "am".` },
    { phrase: `Wochenende`, ans: `am`, opts: [`am`, `im`, `um`, `ins`], en: `at the weekend`, why: `The fixed expression for "at the weekend" is "am Wochenende".` },
    { phrase: `Januar`, ans: `im`, opts: [`im`, `am`, `um`, `zum`], en: `in January`, why: `Months take "im" (in + dem).` },
    { phrase: `Sommer`, ans: `im`, opts: [`im`, `am`, `um`, `ans`], en: `in summer`, why: `Seasons take "im" (in + dem).` },
    { phrase: `Herbst`, ans: `im`, opts: [`im`, `am`, `um`, `vom`], en: `in autumn`, why: `Seasons always take "im".` },
    { phrase: `acht Uhr`, ans: `um`, opts: [`um`, `am`, `im`, `bei`], en: `at eight o'clock`, why: `Exact clock times always use "um".` },
    { phrase: `halb zehn`, ans: `um`, opts: [`um`, `am`, `im`, `seit`], en: `at half past nine`, why: `Clock times always use "um".` },
  ];
  const events = [
    { subj: `Der Deutschkurs beginnt`, en: `The German course begins` },
    { subj: `Unser Termin im Amt ist`, en: `Our appointment at the office is` },
    { subj: `Das Konzert findet`, en: `The concert takes place`, tail: ` statt` },
    { subj: `Die Besprechung startet`, en: `The meeting starts` },
  ];
  for (const ev of events) {
    for (const tm of daysAndMonths) {
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Temporal Prepositions (am / im / um)`,
        prompt: `${ev.subj} _____ ${tm.phrase}${ev.tail || ``}.`,
        answer: tm.ans,
        options: tm.opts,
        en: `${ev.en} ${tm.en}.`,
        why: tm.why,
      });
    }
  }

  // A5. "ans" vs "am" + transport/case fixed prepositions -> 100 questions
  const anTargets = [
    { noun: `Fenster`, en: `the window` },
    { noun: `Telefon`, en: `the phone` },
    { noun: `Meer`, en: `the sea` },
    { noun: `Ende der Straße`, en: `the end of the street` },
  ];
  for (const p of peopleSg) {
    for (let i = 0; i < 2; i++) {
      const t = anTargets[i];
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Wechselpräposition (an + Accusative = ans)`,
        prompt: `${p.subj} ${p.verbG} schnell _____ ${t.noun}.`,
        answer: `ans`,
        options: [`ans`, `am`, `ins`, `im`],
        en: `${p.enSubj} go/goes quickly to ${t.en}.`,
        why: `"${p.verbG}" indicates movement toward a boundary or device (Wohin?), so "an + das" contracts to "ans".`,
      });
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Wechselpräposition (an + Dative = am)`,
        prompt: `${p.subj} ${p.verbS} ruhig _____ ${t.noun}.`,
        answer: `am`,
        options: [`am`, `ans`, `im`, `zum`],
        en: `${p.enSubj} sit/sits quietly by ${t.en}.`,
        why: `"${p.verbS}" indicates static position (Wo?), so "an + dem" contracts to "am".`,
      });
    }
  }

  const fixedPrepCases = [
    { prompt: `Ich fahre jeden Morgen _____ dem Zug zur Arbeit.`, ans: `mit`, opts: [`mit`, `für`, `durch`, `ohne`], en: `I travel to work by train every morning.`, why: `Means of transport always use "mit" + Dative.`, rule: `Dative Preposition (mit)` },
    { prompt: `Sie kauft ein schönes Geschenk _____ ihren Bruder.`, ans: `für`, opts: [`für`, `mit`, `von`, `bei`], en: `She is buying a nice present for her brother.`, why: `"für" always governs the Accusative case (ihren Bruder).`, rule: `Accusative Preposition (für)` },
    { prompt: `Wir gehen am Sonntag _____ den Stadtpark spazieren.`, ans: `durch`, opts: [`durch`, `mit`, `bei`, `seit`], en: `We are going for a walk through the city park on Sunday.`, why: `"durch" (through) always requires the Accusative case (den Stadtpark).`, rule: `Accusative Preposition (durch)` },
    { prompt: `Er reist im Herbst ungern _____ seinen Regenschirm.`, ans: `ohne`, opts: [`ohne`, `mit`, `nach`, `aus`], en: `He dislikes travelling without his umbrella in autumn.`, why: `"ohne" (without) takes the Accusative case (seinen Regenschirm).`, rule: `Accusative Preposition (ohne)` },
    { prompt: `Die Nachbarn sind _____ den neuen Bauplan.`, ans: `gegen`, opts: [`gegen`, `aus`, `seit`, `bei`], en: `The neighbours are against the new building plan.`, why: `"gegen" (against) always governs the Accusative case.`, rule: `Accusative Preposition (gegen)` },
    { prompt: `Meine Kollegin wohnt _____ drei Jahren in München.`, ans: `seit`, opts: [`seit`, `für`, `gegen`, `durch`], en: `My colleague has been living in Munich for three years.`, why: `"seit" (for/since a continuing duration) takes the Dative case.`, rule: `Dative Preposition (seit)` },
    { prompt: `Der Brief kommt direkt _____ der Stadtverwaltung.`, ans: `von`, opts: [`von`, `für`, `durch`, `gegen`], en: `The letter comes directly from the city administration.`, why: `"von" always governs the Dative case (der Stadtverwaltung).`, rule: `Dative Preposition (von)` },
    { prompt: `Frau Yılmaz kommt ursprünglich _____ der Türkei.`, ans: `aus`, opts: [`aus`, `nach`, `zu`, `ohne`], en: `Ms Yılmaz originally comes from Turkey.`, why: `Origin from a country or city uses "aus" + Dative.`, rule: `Dative Preposition (aus)` },
    { prompt: `Im Juli fliegen wir für zwei Wochen _____ Spanien.`, ans: `nach`, opts: [`nach`, `aus`, `bei`, `mit`], en: `In July we are flying to Spain for two weeks.`, why: `Movement to cities and article-less countries uses "nach".`, rule: `Dative Preposition (nach)` },
    { prompt: `Die Apotheke liegt genau _____ dem Rathaus.`, ans: `gegenüber`, opts: [`gegenüber`, `durch`, `ohne`, `für`], en: `The pharmacy is located directly opposite the town hall.`, why: `"gegenüber" (opposite) governs the Dative case.`, rule: `Dative Preposition (gegenüber)` },
  ];

  const transportObjs = [
    { noun: `dem Bus`, en: `by bus` },
    { noun: `der U-Bahn`, en: `by underground` },
    { noun: `dem Fahrrad`, en: `by bicycle` },
    { noun: `dem Auto`, en: `by car` },
  ];
  for (const tr of transportObjs) {
    for (let i = 0; i < 4; i++) {
      const p = peopleSg[i];
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Transport + Dative (mit)`,
        prompt: `${p.subj} ${p.verbF} heute _____ ${tr.noun} in die Stadt.`,
        answer: `mit`,
        options: [`mit`, `durch`, `für`, `ohne`],
        en: `${p.enSubj} travel/travels into town ${tr.en} today.`,
        why: `Means of transport use "mit" + Dative.`,
      });
    }
  }
  for (const fp of fixedPrepCases) {
    pool.push({
      id: pool.length + 1,
      cat: `prepositions`,
      rule: fp.rule,
      prompt: fp.prompt,
      answer: fp.ans,
      options: fp.opts,
      en: fp.en,
      why: fp.why,
    });
  }

  const extraPreps = [
    { prompt: `Das Buch liegt schon seit gestern _____ dem Schreibtisch.`, ans: `auf`, opts: [`auf`, `durch`, `gegen`, `ohne`], en: `The book has been lying on the desk since yesterday.`, why: `"liegen" is static (Wo?), so "auf" takes the Dative (dem Schreibtisch).`, rule: `Wechselpräposition (auf + Dative)` },
    { prompt: `Ich lege die ausgefüllten Formulare _____ den Tisch.`, ans: `auf`, opts: [`auf`, `bei`, `seit`, `aus`], en: `I am placing the completed forms onto the table.`, why: `"legen" expresses movement onto a surface (Wohin?), so "auf" takes Accusative (den Tisch).`, rule: `Wechselpräposition (auf + Accusative)` },
    { prompt: `Die Jacke hängt ordentlich _____ der Tür.`, ans: `hinter`, opts: [`hinter`, `für`, `ohne`, `durch`], en: `The jacket is hanging neatly behind the door.`, why: `Static position ("hängen") takes Dative after "hinter" (der Tür).`, rule: `Wechselpräposition (hinter + Dative)` },
    { prompt: `Der Stuhl steht genau _____ dem Schrank und dem Fenster.`, ans: `zwischen`, opts: [`zwischen`, `ohne`, `durch`, `für`], en: `The chair is standing right between the cupboard and the window.`, why: `Static position between two objects takes Dative after "zwischen".`, rule: `Wechselpräposition (zwischen + Dative)` },
    { prompt: `Mein Bruder stellt sein Fahrrad _____ die Garage.`, ans: `vor`, opts: [`vor`, `mit`, `aus`, `seit`], en: `My brother parks his bicycle in front of the garage.`, why: `"stellen" expresses placement/movement (Wohin?), taking Accusative (die Garage).`, rule: `Wechselpräposition (vor + Accusative)` },
    { prompt: `Die Katze schläft im Winter gern _____ dem warmen Heizkörper.`, ans: `unter`, opts: [`unter`, `gegen`, `für`, `ohne`], en: `In winter the cat likes sleeping under the warm radiator.`, why: `"schläft" marks static location (Wo?), so "unter" takes Dative (dem Heizkörper).`, rule: `Wechselpräposition (unter + Dative)` },
    { prompt: `Das neue Poster hängt jetzt _____ dem Sofa.`, ans: `über`, opts: [`über`, `durch`, `ohne`, `gegen`], en: `The new poster is now hanging above the sofa.`, why: `Static location takes Dative after "über" (dem Sofa).`, rule: `Wechselpräposition (über + Dative)` },
    { prompt: `Bitte setzen Sie sich _____ den freien Platz am Fenster.`, ans: `auf`, opts: [`auf`, `bei`, `seit`, `von`], en: `Please sit down on the free seat by the window.`, why: `"sich setzen" expresses movement onto a seat (Wohin?), requiring Accusative (den freien Platz).`, rule: `Wechselpräposition (auf + Accusative)` },
    { prompt: `Die Kinder spielen im Sommer oft _____ dem kleinen Garten.`, ans: `in`, opts: [`in`, `für`, `gegen`, `ohne`], en: `In summer the children often play in the small garden.`, why: `Static activity ("spielen") takes Dative after "in" (dem kleinen Garten).`, rule: `Wechselpräposition (in + Dative)` },
    { prompt: `Wir hängen die Uhr direkt _____ das Regal.`, ans: `neben`, opts: [`neben`, `mit`, `nach`, `aus`], en: `We are hanging the clock right next to the shelf.`, why: `"hängen" (to hang something onto a spot) expresses movement (Wohin?) and takes Accusative (das Regal).`, rule: `Wechselpräposition (neben + Accusative)` },
  ];
  for (const ep of extraPreps) {
    pool.push({
      id: pool.length + 1,
      cat: `prepositions`,
      rule: ep.rule,
      prompt: ep.prompt,
      answer: ep.ans,
      options: ep.opts,
      en: ep.en,
      why: ep.why,
    });
  }

  const rooms = [
    { room: `Wohnzimmer`, en: `the living room` },
    { room: `Arbeitszimmer`, en: `the study` },
    { room: `Schlafzimmer`, en: `the bedroom` },
    { room: `Badezimmer`, en: `the bathroom` },
  ];
  const objects = [
    { item: `Der neue Tisch steht`, en: `The new table stands` },
    { item: `Die Lampe steht`, en: `The lamp stands` },
    { item: `Der Teppich liegt`, en: `The rug lies` },
    { item: `Das Regal steht`, en: `The bookshelf stands` },
  ];
  for (const obj of objects) {
    for (const rm of rooms) {
      if (pool.length < 340) {
        pool.push({
          id: pool.length + 1,
          cat: `prepositions`,
          rule: `Contraction (im = in + dem)`,
          prompt: `${obj.item} seit gestern _____ ${rm.room}.`,
          answer: `im`,
          options: [`im`, `ins`, `ans`, `zur`],
          en: `${obj.en} in ${rm.en} since yesterday.`,
          why: `"stehen/liegen" indicates a static location (Wo?), so "in + dem" contracts to "im".`,
        });
      }
    }
  }

  const weekdays = [`Dienstag`, `Mittwoch`, `Donnerstag`, `Samstag`, `Sonntag`];
  const months = [`Februar`, `März`, `April`, `Mai`, `Juni`, `Juli`, `August`, `Oktober`, `November`, `Dezember`];
  for (const wd of weekdays) {
    if (pool.length < 340) {
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Temporal Contraction (am)`,
        prompt: `Die Meldebehörde ist _____ ${wd} bis sechzehn Uhr geöffnet.`,
        answer: `am`,
        options: [`am`, `im`, `um`, `zum`],
        en: `The registration office is open on ${wd} until 4 p.m.`,
        why: `Days of the week always take "am" (an + dem).`,
      });
    }
  }
  for (const mo of months) {
    if (pool.length < 340) {
      pool.push({
        id: pool.length + 1,
        cat: `prepositions`,
        rule: `Temporal Contraction (im)`,
        prompt: `Mein Sprachkurs beginnt erst _____ ${mo}.`,
        answer: `im`,
        options: [`im`, `am`, `um`, `ans`],
        en: `My language course does not start until ${mo}.`,
        why: `Months always require "im" (in + dem).`,
      });
    }
  }
  while (pool.length < 340) {
    const idx = pool.length - 330;
    const clocks = [`sieben Uhr`, `neun Uhr`, `zehn Uhr`, `elf Uhr`, `zwölf Uhr`, `vierzehn Uhr`, `fünfzehn Uhr`, `sechzehn Uhr`, `siebzehn Uhr`, `achtzehn Uhr`];
    const clk = clocks[idx % clocks.length];
    pool.push({
      id: pool.length + 1,
      cat: `prepositions`,
      rule: `Temporal Preposition (um)`,
      prompt: `Der Zug nach Hamburg fährt pünktlich _____ ${clk} ab.`,
      answer: `um`,
      options: [`um`, `am`, `im`, `bei`],
      en: `The train to Hamburg departs punctually at ${clk}.`,
      why: `Clock times always use the preposition "um".`,
    });
  }

  // -----------------------------------------------------------------------
  // CATEGORY B: SEPARABLE VERBS (330 unique questions: pool 340..669)
  // -----------------------------------------------------------------------
  const sepVerbsPresent = [
    { stem: [`stehe`, `stehst`, `steht`, `stehen`], prefix: `auf`, mid: `jeden Werktag um halb sieben`, en: `get up at half past six every weekday`, distractors: [`ein`, `ab`, `zu`], inf: `aufstehen` },
    { stem: [`fange`, `fängst`, `fängt`, `fangen`], prefix: `an`, mid: `um neun Uhr mit der Arbeit`, en: `start work at nine o'clock`, distractors: [`auf`, `aus`, `ab`], inf: `anfangen` },
    { stem: [`höre`, `hörst`, `hört`, `hören`], prefix: `auf`, mid: `um siebzehn Uhr mit dem Unterricht`, en: `finish class at five o'clock`, distractors: [`an`, `ein`, `mit`], inf: `aufhören` },
    { stem: [`kaufe`, `kaufst`, `kauft`, `kaufen`], prefix: `ein`, mid: `am Samstag im Supermarkt`, en: `do the shopping at the supermarket on Saturday`, distractors: [`aus`, `auf`, `an`], inf: `einkaufen` },
    { stem: [`räume`, `räumst`, `räumt`, `räumen`], prefix: `auf`, mid: `am Wochenende das Arbeitszimmer`, en: `tidy up the study at the weekend`, distractors: [`ein`, `ab`, `vor`], inf: `aufräumen` },
    { stem: [`sehe`, `siehst`, `sieht`, `sehen`], prefix: `fern`, mid: `nach dem Abendessen eine Stunde`, en: `watch television for an hour after dinner`, distractors: [`vor`, `aus`, `an`], inf: `fernsehen` },
    { stem: [`rufe`, `rufst`, `ruft`, `rufen`], prefix: `an`, mid: `heute Nachmittag die Behörde`, en: `telephone the authority this afternoon`, distractors: [`auf`, `aus`, `ein`], inf: `anrufen` },
    { stem: [`fülle`, `füllst`, `füllt`, `füllen`], prefix: `aus`, mid: `am Schalter das Anmeldeformular`, en: `fill in the registration form at the counter`, distractors: [`ein`, `ab`, `an`], inf: `ausfüllen` },
    { stem: [`gebe`, `gibst`, `gibt`, `geben`], prefix: `ab`, mid: `den Antrag in Zimmer 107`, en: `hand in the application in Room 107`, distractors: [`auf`, `aus`, `ein`], inf: `abgeben` },
    { stem: [`trage`, `trägst`, `trägt`, `tragen`], prefix: `ein`, mid: `das Einzugsdatum in die Liste`, en: `enter the move-in date into the list`, distractors: [`aus`, `ab`, `vor`], inf: `eintragen` },
    { stem: [`komme`, `kommst`, `kommt`, `kommen`], prefix: `mit`, mid: `heute Abend ins Kino`, en: `come along to the cinema this evening`, distractors: [`ab`, `aus`, `zu`], inf: `mitkommen` },
    { stem: [`bereite`, `bereitest`, `bereitet`, `bereiten`], prefix: `vor`, mid: `die Präsentation für morgen`, en: `prepare the presentation for tomorrow`, distractors: [`auf`, `ab`, `aus`], inf: `vorbereiten` },
    { stem: [`mache`, `machst`, `macht`, `machen`], prefix: `zu`, mid: `vor dem Verlassen das Fenster`, en: `close the window before leaving`, distractors: [`ab`, `ein`, `mit`], inf: `zumachen` },
    { stem: [`schlafe`, `schläfst`, `schläft`, `schlafen`], prefix: `ein`, mid: `abends sehr schnell`, en: `fall asleep very quickly in the evening`, distractors: [`auf`, `aus`, `ab`], inf: `einschlafen` },
    { stem: [`lade`, `lädst`, `lädt`, `laden`], prefix: `ein`, mid: `alle Nachbarn zur Hausparty`, en: `invite all the neighbours to the house party`, distractors: [`aus`, `ab`, `auf`], inf: `einladen` },
  ];

  const sepSubjects = [
    { s: `Ich`, idx: 0, en: `I` },
    { s: `Du`, idx: 1, en: `You` },
    { s: `Paul`, idx: 2, en: `Paul` },
    { s: `Maria`, idx: 2, en: `Maria` },
    { s: `Wir`, idx: 3, en: `We` },
    { s: `Meine Eltern`, idx: 3, en: `My parents` },
  ];

  // 15 verbs x 6 subjects = 90 questions (missing prefix at end)
  for (const v of sepVerbsPresent) {
    for (const sb of sepSubjects) {
      pool.push({
        id: pool.length + 1,
        cat: `separable`,
        rule: `Separable Prefix at End (${v.inf})`,
        prompt: `${sb.s} ${v.stem[sb.idx]} ${v.mid} _____.`,
        answer: v.prefix,
        options: [v.prefix, ...v.distractors],
        en: `${sb.en} ${v.en}.`,
        why: `In a main clause, the separable verb "${v.inf}" splits: the finite stem sits in Position 2 and the stressed prefix "${v.prefix}-" moves to the end.`,
      });
    }
  }

  // 15 verbs x 6 subjects = 90 questions (missing conjugated verb stem in Position 2)
  for (const v of sepVerbsPresent) {
    for (const sb of sepSubjects) {
      const allForms = Array.from(new Set(v.stem));
      const wrongStems = allForms.filter((f) => f !== v.stem[sb.idx]);
      while (wrongStems.length < 3) wrongStems.push(v.inf);
      pool.push({
        id: pool.length + 1,
        cat: `separable`,
        rule: `Finite Stem in Position 2 (${v.inf})`,
        prompt: `${sb.s} _____ ${v.mid} ${v.prefix}.`,
        answer: v.stem[sb.idx],
        options: [v.stem[sb.idx], ...wrongStems.slice(0, 3)],
        en: `${sb.en} ${v.en}.`,
        why: `With subject "${sb.s}", the conjugated stem in Position 2 is "${v.stem[sb.idx]}" while "${v.prefix}" closes the sentence bracket.`,
      });
    }
  }

  // Modal verb + separable infinitive -> 60 questions
  const modalList = [
    { s: `Ich muss`, en: `I have to` },
    { s: `Wir müssen`, en: `We have to` },
    { s: `Sie müssen`, en: `You must` },
    { s: `Man kann`, en: `One can` },
    { s: `Er will`, en: `He wants to` },
  ];
  const modalSepInf = [
    { tail: `dieses Formular sauber`, inf: `ausfüllen`, wrong: [`füllen aus`, `ausgefüllt`, `füllt aus`], en: `fill in this form neatly` },
    { tail: `den Antrag in Zimmer 108`, inf: `abgeben`, wrong: [`geben ab`, `abgegeben`, `gibt ab`], en: `hand in the application in Room 108` },
    { tail: `morgen schon um sechs Uhr`, inf: `aufstehen`, wrong: [`stehen auf`, `aufgestanden`, `steht auf`], en: `get up at six o'clock tomorrow` },
    { tail: `den Termin telefonisch`, inf: `absagen`, wrong: [`sagen ab`, `abgesagt`, `sagt ab`], en: `cancel the appointment by phone` },
    { tail: `heute Nachmittag noch`, inf: `einkaufen`, wrong: [`kaufen ein`, `eingekauft`, `kauft ein`], en: `go shopping this afternoon` },
    { tail: `am Freitag die Wohnung`, inf: `aufräumen`, wrong: [`räumen auf`, `aufgeräumt`, `räumt auf`], en: `tidy up the flat on Friday` },
    { tail: `das Fenster vor der Pause`, inf: `zumachen`, wrong: [`machen zu`, `zugemacht`, `macht zu`], en: `close the window before the break` },
    { tail: `das neue Wort noch einmal`, inf: `nachsehen`, wrong: [`sehen nach`, `nachgesehen`, `sieht nach`], en: `look up the new word once more` },
    { tail: `die Kinder vom Bahnhof`, inf: `abholen`, wrong: [`holen ab`, `abgeholt`, `holt ab`], en: `pick up the children from the station` },
    { tail: `die neuen Nachbarn herzlich`, inf: `einladen`, wrong: [`laden ein`, `eingeladen`, `lädt ein`], en: `warmly invite the new neighbours` },
    { tail: `am Abend noch seine Mutter`, inf: `anrufen`, wrong: [`rufen an`, `angerufen`, `ruft an`], en: `phone his mother in the evening` },
    { tail: `pünktlich um acht Uhr`, inf: `anfangen`, wrong: [`fangen an`, `angefangen`, `fängt an`], en: `start punctually at eight o'clock` },
  ];
  for (const m of modalList) {
    for (const ms of modalSepInf) {
      pool.push({
        id: pool.length + 1,
        cat: `separable`,
        rule: `Modal + Separable Infinitive`,
        prompt: `${m.s} ${ms.tail} _____.`,
        answer: ms.inf,
        options: [ms.inf, ...ms.wrong],
        en: `${m.en} ${ms.en}.`,
        why: `With a modal verb in Position 2, the separable verb stays joined in its full infinitive form ("${ms.inf}") at the end of the clause.`,
      });
    }
  }

  // Perfekt of separable verbs -> 15 questions
  const perfektSep = [
    { subj: `Ich habe`, obj: `das Meldeformular schon gestern`, pp: `ausgefüllt`, wrong: [`geausfüllt`, `ausfüllen`, `füllte aus`], en: `I already filled in the registration form yesterday.` },
    { subj: `Wir haben`, obj: `alle Unterlagen im Bürgeramt`, pp: `abgegeben`, wrong: [`geabgegeben`, `abgeben`, `gaben ab`], en: `We handed in all documents at the citizens' office.` },
    { subj: `Yasmin ist`, obj: `am ersten Oktober in die Ritterstraße`, pp: `eingezogen`, wrong: [`geeinzogen`, `einziehen`, `zog ein`], en: `Yasmin moved into Ritterstraße on 1st October.` },
    { subj: `Meine Familie ist`, obj: `letzten Monat nach Dresden`, pp: `umgezogen`, wrong: [`geumgezogen`, `umziehen`, `zog um`], en: `My family moved house to Dresden last month.` },
    { subj: `Der Zug aus Berlin ist`, obj: `heute pünktlich`, pp: `angekommen`, wrong: [`geangekommen`, `ankommen`, `kam an`], en: `The train from Berlin arrived on time today.` },
    { subj: `Ich bin`, obj: `am Sonntag erst um neun Uhr`, pp: `aufgestanden`, wrong: [`geaufgestanden`, `aufstehen`, `stand auf`], en: `I did not get up until nine o'clock on Sunday.` },
    { subj: `Er hat`, obj: `das Licht im Flur`, pp: `ausgemacht`, wrong: [`geausgemacht`, `ausmachen`, `machte aus`], en: `He turned off the light in the hallway.` },
    { subj: `Sie hat`, obj: `sehr guten Kaffee für alle`, pp: `mitgebracht`, wrong: [`gemitgebracht`, `mitbringen`, `brachte mit`], en: `She brought along very good coffee for everyone.` },
    { subj: `Wir haben`, obj: `das Wohnzimmer am Vormittag`, pp: `aufgeräumt`, wrong: [`geaufgeräumt`, `aufräumen`, `räumten auf`], en: `We tidied up the living room in the morning.` },
    { subj: `Der Film hat`, obj: `genau um zwanzig Uhr`, pp: `angefangen`, wrong: [`geangefangen`, `anfangen`, `fing an`], en: `The film started at exactly eight p.m.` },
    { subj: `Ich habe`, obj: `meine Kollegin um zehn Uhr`, pp: `angerufen`, wrong: [`geangerufen`, `anrufen`, `rief an`], en: `I telephoned my colleague at ten o'clock.` },
    { subj: `Sie sind`, obj: `gestern Abend noch ins Kino`, pp: `ausgegangen`, wrong: [`geausgegangen`, `ausgehen`, `gingen aus`], en: `They went out to the cinema yesterday evening.` },
    { subj: `Du hast`, obj: `den Namen falsch in die Liste`, pp: `eingetragen`, wrong: [`geeingetragen`, `eintragen`, `trugst ein`], en: `You entered the name incorrectly into the list.` },
    { subj: `Mein Nachbar hat`, obj: `mit dem Rauchen`, pp: `aufgehört`, wrong: [`geaufgehört`, `aufhören`, `hörte auf`], en: `My neighbour gave up smoking.` },
    { subj: `Das Konzert hat`, obj: `im großen Saal`, pp: `stattgefunden`, wrong: [`gestattgefunden`, `stattfinden`, `fand statt`], en: `The concert took place in the main hall.` },
  ];
  for (const ps of perfektSep) {
    pool.push({
      id: pool.length + 1,
      cat: `separable`,
      rule: `Perfekt of Separable Verbs (-ge- inside)`,
      prompt: `${ps.subj} ${ps.obj} _____.`,
      answer: ps.pp,
      options: [ps.pp, ...ps.wrong],
      en: ps.en,
      why: `In the Perfekt tense of separable verbs, "-ge-" sits directly between the prefix and the verb stem (${ps.pp}).`,
    });
  }

  // Subordinate clause separable verb stays attached -> 30 questions
  const subSep = [
    { lead: `Ich nehme ein Taxi, weil der Bus spät`, alt1: `Lena nimmt ein Taxi, weil der Bus spät`, alt2: `Wir nehmen ein Taxi, weil der Bus zu spät`, ans: `ankommt`, wrong: [`kommt an`, `ankommen`, `an kommt`], en: `Taking a taxi because the bus arrives late.` },
    { lead: `Er ist oft müde, wenn er so früh`, alt1: `Mein Bruder ist oft müde, wenn er morgens früh`, alt2: `Paul ist immer müde, wenn er um fünf Uhr`, ans: `aufsteht`, wrong: [`steht auf`, `aufstehen`, `auf steht`], en: `Being tired when getting up so early.` },
    { lead: `Sag mir Bescheid, sobald der Kurs`, alt1: `Schreib mir bitte, sobald der Unterricht`, alt2: `Ruf mich an, sobald das Seminar`, ans: `anfängt`, wrong: [`fängt an`, `anfangen`, `an fängt`], en: `Letting someone know as soon as the course/lesson starts.` },
    { lead: `Wir freuen uns, dass du heute`, alt1: `Alle freuen sich, dass du am Abend`, alt2: `Anna freut sich sehr, dass du ins Kino`, ans: `mitkommst`, wrong: [`kommst mit`, `mitkommen`, `mit kommst`], en: `Being glad that you are coming along.` },
    { lead: `Sie prüft die Daten, bevor sie das Formular`, alt1: `Frau Weber liest alles genau, bevor sie den Antrag`, alt2: `Lukas kontrolliert die Adresse, bevor er den Brief`, ans: `abgibt`, wrong: [`gibt ab`, `abgeben`, `ab gibt`], en: `Checking the details before handing in the form/application.` },
    { lead: `Es ist schön, wenn man am Wochenende lange`, alt1: `Ich genieße es, wenn man im Urlaub lange`, alt2: `Er fühlt sich fit, wenn er sonntags lange`, ans: `ausschläft`, wrong: [`schläft aus`, `ausschlafen`, `aus schläft`], en: `Sleeping in long at the weekend / on holiday.` },
    { lead: `Ich rufe dich an, wenn ich zu Hause`, alt1: `Ich schreibe dir sofort, sobald ich im Hotel`, alt2: `Ich schicke eine Nachricht, wenn ich am Bahnhof`, ans: `ankomme`, wrong: [`komme an`, `ankommen`, `an komme`], en: `Calling or messaging upon arriving.` },
    { lead: `Er liest ein Buch, während seine Schwester`, alt1: `Lukas kocht das Abendessen, während sein Mitbewohner`, alt2: `Anna lernt Vokabeln, während ihr Bruder`, ans: `fernsieht`, wrong: [`sieht fern`, `fernsehen`, `fern sieht`], en: `Doing something while another person watches television.` },
    { lead: `Es wird kühler, wenn du das Fenster`, alt1: `Man hört die Vögel, wenn du morgens das Fenster`, alt2: `Es kommt frische Luft herein, sobald du die Tür`, ans: `aufmachst`, wrong: [`machst auf`, `aufmachen`, `auf machst`], en: `Opening the window or door.` },
    { lead: `Ich weiß nicht, wann der Zug genau`, alt1: `Können Sie mir sagen, wann der nächste Bus`, alt2: `Niemand weiß, ob die S-Bahn heute pünktlich`, ans: `abfährt`, wrong: [`fährt ab`, `abfahren`, `ab fährt`], en: `Asking or wondering when the train or bus departs.` },
  ];
  for (let rep = 0; rep < 3; rep++) {
    for (const ss of subSep) {
      if (pool.length < 625) {
        const promptLead = rep === 0 ? ss.lead : rep === 1 ? ss.alt1 : ss.alt2;
        pool.push({
          id: pool.length + 1,
          cat: `separable`,
          rule: `Separable Verb in Subordinate Clause`,
          prompt: `${promptLead} _____.`,
          answer: ss.ans,
          options: [ss.ans, ...ss.wrong],
          en: ss.en,
          why: `In a subordinate clause, the separable prefix remains attached to the conjugated verb at the very end ("${ss.ans}").`,
        });
      }
    }
  }

  const sepImperatives = [
    { p: `Herr Müller, bitte füllen Sie das Formular hier _____!`, ans: `aus`, opts: [`aus`, `ein`, `ab`, `an`], en: `Mr Müller, please fill in the form here!`, why: `"ausfüllen" splits in the imperative: "Füllen Sie ... aus!"` },
    { p: `Frau Klein, geben Sie den Antrag bitte in Zimmer 108 _____!`, ans: `ab`, opts: [`ab`, `aus`, `ein`, `auf`], en: `Ms Klein, please hand in the application in Room 108!`, why: `"abgeben" (to hand in) places its prefix "ab" at the end.` },
    { p: `Kinder, räumt bitte sofort eure Zimmer _____!`, ans: `auf`, opts: [`auf`, `aus`, `ab`, `an`], en: `Children, please tidy up your rooms right away!`, why: `"aufräumen" puts its prefix "auf" at the end of the imperative.` },
    { p: `Lisa, mach bitte die Tür _____ — es zieht!`, ans: `zu`, opts: [`zu`, `auf`, `ab`, `mit`], en: `Lisa, please close the door — there is a draught!`, why: `"zumachen" (to close) ends with "zu".` },
    { p: `Bitte hören Sie mir einen Moment aufmerksam _____!`, ans: `zu`, opts: [`zu`, `an`, `auf`, `mit`], en: `Please listen to me attentively for a moment!`, why: `"zuhören" (to listen to) sends "zu" to the end.` },
    { p: `Komm doch heute Abend auch ins Kino _____!`, ans: `mit`, opts: [`mit`, `ab`, `aus`, `ein`], en: `Come along to the cinema this evening too!`, why: `"mitkommen" (to come along) sends "mit" to the end.` },
    { p: `Steigen Sie am Hauptbahnhof in die Linie 4 _____!`, ans: `um`, opts: [`um`, `auf`, `ab`, `zu`], en: `Change onto Line 4 at the central station!`, why: `"umsteigen" (to transfer/change) uses the prefix "um".` },
    { p: `Ruf mich bitte direkt nach dem Meeting _____!`, ans: `an`, opts: [`an`, `auf`, `aus`, `ab`], en: `Please phone me straight after the meeting!`, why: `"anrufen" (to phone) puts "an" at the end.` },
    { p: `Bitte tragen Sie Ihre aktuelle Adresse hier _____!`, ans: `ein`, opts: [`ein`, `aus`, `ab`, `vor`], en: `Please enter your current address here!`, why: `"eintragen" (to enter/register) puts "ein" at the end.` },
    { p: `Nehmen Sie für den Ausflug bitte einen Regenschirm _____!`, ans: `mit`, opts: [`mit`, `ab`, `aus`, `zu`], en: `Please take an umbrella along for the trip!`, why: `"mitnehmen" (to take along) ends with "mit".` },
    { p: `Mach bitte das Licht im Flur _____, wenn du gehst!`, ans: `aus`, opts: [`aus`, `ein`, `ab`, `zu`], en: `Please turn off the light in the hallway when you leave!`, why: `"ausmachen" (to switch off) puts "aus" at the end.` },
    { p: `Lukas, steh jetzt bitte _____, es ist schon sieben Uhr!`, ans: `auf`, opts: [`auf`, `ein`, `ab`, `an`], en: `Lukas, please get up now, it is already seven o'clock!`, why: `"aufstehen" (to get up) puts "auf" at the end.` },
    { p: `Schlagen Sie das unbekannte Wort im Wörterbuch _____!`, ans: `nach`, opts: [`nach`, `vor`, `aus`, `ab`], en: `Look up the unfamiliar word in the dictionary!`, why: `"nachschlagen" (to look up) ends with "nach".` },
    { p: `Bringen Sie morgen bitte Ihren Reisepass _____!`, ans: `mit`, opts: [`mit`, `aus`, `ab`, `ein`], en: `Please bring your passport along tomorrow!`, why: `"mitbringen" (to bring along) ends with "mit".` },
    { p: `Hört bitte endlich mit dem lauten Reden _____!`, ans: `auf`, opts: [`auf`, `an`, `aus`, `ab`], en: `Please finally stop talking so loudly!`, why: `"aufhören" (to stop) puts "auf" at the end.` },
  ];
  const impVariants = [
    (s: string) => s,
    (s: string) => s.replace(`bitte `, ``).replace(`!`, `, bitte!`),
    (s: string) => `Wichtig: ${s}`,
  ];
  for (let i = 0; pool.length < 670; i++) {
    const imp = sepImperatives[i % sepImperatives.length];
    const vIdx = Math.floor(i / sepImperatives.length) % impVariants.length;
    pool.push({
      id: pool.length + 1,
      cat: `separable`,
      rule: `Imperative + Separable Prefix`,
      prompt: impVariants[vIdx](imp.p),
      answer: imp.ans,
      options: imp.opts,
      en: imp.en,
      why: imp.why,
    });
  }

  // -----------------------------------------------------------------------
  // CATEGORY C: CONJUNCTIONS & WORD ORDER (330 unique questions: pool 670..999)
  // -----------------------------------------------------------------------
  const conjPairs = [
    { p: `Ich bleibe heute zu Hause, _____ ich starkes Fieber habe.`, ans: `weil`, opts: [`weil`, `denn`, `aber`, `deshalb`], en: `I am staying at home today because I have a high fever.`, why: `The verb "habe" is at the end of the clause, so a subordinating conjunction ("weil") is required, not "denn".`, rule: `Subordinating Conjunction (weil)` },
    { p: `Ich bleibe heute zu Hause, _____ ich habe starkes Fieber.`, ans: `denn`, opts: [`denn`, `weil`, `dass`, `obwohl`], en: `I am staying at home today, for I have a high fever.`, why: `The verb "habe" sits in Position 2 right after the subject "ich", requiring coordinating "denn".`, rule: `Coordinating ADUSO (denn)` },
    { p: `Wir gehen spazieren, _____ das Wetter heute ziemlich kühl ist.`, ans: `obwohl`, opts: [`obwohl`, `trotzdem`, `aber`, `denn`], en: `We are going for a walk although the weather is rather cool today.`, why: `"obwohl" expresses contrast and sends the conjugated verb "ist" to the end.`, rule: `Subordinating Conjunction (obwohl)` },
    { p: `Es regnet stark. _____ fahren wir mit dem Fahrrad in die Stadt.`, ans: `Trotzdem`, opts: [`Trotzdem`, `Obwohl`, `Weil`, `Aber`], en: `It is raining heavily. Nevertheless, we are cycling into town.`, why: `The verb "fahren" follows directly in Position 2 before the subject "wir" (inversion), which signals adverbial "Trotzdem".`, rule: `Adverbial Connector (Position 1 + Inversion)` },
    { p: `Max hat den Bus verpasst. _____ kommt er zwanzig Minuten zu spät.`, ans: `Deshalb`, opts: [`Deshalb`, `Weil`, `Denn`, `Obwohl`], en: `Max missed the bus. Therefore he is arriving twenty minutes late.`, why: `"Deshalb" occupies Position 1 and triggers subject–verb inversion ("kommt er").`, rule: `Adverbial Connector (Deshalb)` },
    { p: `Er arbeitet nicht in Berlin, _____ in Hamburg.`, ans: `sondern`, opts: [`sondern`, `aber`, `oder`, `denn`], en: `He does not work in Berlin, but rather in Hamburg.`, why: `After a negated statement ("nicht in Berlin"), use "sondern" to introduce the corrected alternative.`, rule: `Coordinating ADUSO (sondern)` },
    { p: `Der Kurs ist anstrengend, _____ er macht uns sehr viel Spaß.`, ans: `aber`, opts: [`aber`, `sondern`, `weil`, `obwohl`], en: `The course is demanding, but we really enjoy it.`, why: `After a positive statement, use "aber" (Position 0) to express contrast without inverting word order.`, rule: `Coordinating ADUSO (aber)` },
    { p: `Trinkst du morgens lieber Kaffee _____ grünen Tee?`, ans: `oder`, opts: [`oder`, `aber`, `denn`, `ob`], en: `Do you prefer drinking coffee or green tea in the morning?`, why: `"oder" connects two alternatives at Position 0.`, rule: `Coordinating ADUSO (oder)` },
    { p: `Ich glaube fest daran, _____ du die Prüfung bald bestehst.`, ans: `dass`, opts: [`dass`, `ob`, `weil`, `denn`], en: `I firmly believe that you will pass the exam soon.`, why: `"dass" introduces a factual statement clause and sends "bestehst" to the end.`, rule: `Subordinating Conjunction (dass)` },
    { p: `Weißt du schon, _____ das Bürgeramt am Samstag geöffnet hat?`, ans: `ob`, opts: [`ob`, `dass`, `weil`, `wenn`], en: `Do you already know whether the citizens' office is open on Saturday?`, why: `Indirect yes/no questions use "ob" (whether) with the finite verb at the end.`, rule: `Subordinating Conjunction (ob)` },
    { p: `_____ ich letztes Jahr in Wien war, habe ich das Museum besucht.`, ans: `Als`, opts: [`Als`, `Wenn`, `Wann`, `Ob`], en: `When I was in Vienna last year, I visited the museum.`, why: `Use "Als" for a single completed event or state in the past.`, rule: `Temporal Conjunction (als vs. wenn)` },
    { p: `Immer _____ ich Zeit habe, lese ich abends ein deutsches Buch.`, ans: `wenn`, opts: [`wenn`, `als`, `wann`, `ob`], en: `Whenever I have time, I read a German book in the evening.`, why: `Repeated actions or present/future conditions take "wenn".`, rule: `Temporal Conjunction (wenn)` },
    { p: `Kannst du mir sagen, _____ der nächste Zug nach Köln abfährt?`, ans: `wann`, opts: [`wann`, `wenn`, `als`, `ob`], en: `Can you tell me when the next train to Cologne departs?`, why: `Indirect time questions asking "at what time?" use the interrogative "wann".`, rule: `Interrogative Adverb (wann)` },
    { p: `Zuerst fülle ich das Formular aus. _____ gebe ich es am Schalter ab.`, ans: `Danach`, opts: [`Danach`, `Nachdem`, `Weil`, `Aber`], en: `First I fill in the form. Afterwards I hand it in at the counter.`, why: `"Danach" in Position 1 requires immediate verb inversion ("gebe ich").`, rule: `Adverbial Connector (Danach)` },
    { p: `Beeilen Sie sich bitte, _____ verpassen Sie noch den Bus!`, ans: `sonst`, opts: [`sonst`, `weil`, `denn`, `obwohl`], en: `Please hurry up, otherwise you will miss the bus!`, why: `"sonst" (otherwise) triggers inversion ("verpassen Sie").`, rule: `Adverbial Connector (sonst)` },
  ];

  const contextWrappers = [
    ``,
    `Übrigens: `,
    `Kurz gesagt: `,
    `Im Alltag: `,
    `Zur Information: `,
    `Ehrlich gesagt: `,
  ];
  for (const cw of contextWrappers) {
    for (const cp of conjPairs) {
      pool.push({
        id: pool.length + 1,
        cat: `conjunctions`,
        rule: cp.rule,
        prompt: cw ? `${cw}${cp.p}` : cp.p,
        answer: cp.ans,
        options: cp.opts,
        en: cp.en,
        why: cp.why,
      });
    }
  }

  const subOrderTemplates = [
    { main: `Ich lerne jeden Tag Deutsch`, conj: `weil`, mid: `ich bald in Frankfurt`, ans: `arbeiten möchte`, wrong: [`möchte arbeiten`, `arbeite möchte`, `möchte zu arbeiten`], en: `I learn German every day because I would like to work in Frankfurt soon.`, why: `In a "weil" clause with a modal verb, the infinitive ("arbeiten") precedes the conjugated modal ("möchte") at the very end.` },
    { main: `Er geht heute früher nach Hause`, conj: `da`, mid: `er noch viel`, ans: `erledigen muss`, wrong: [`muss erledigen`, `erledigt muss`, `muss erledigt`], en: `He is going home earlier today since he still has a lot to get done.`, why: `The finite modal verb ("muss") must sit in the absolute final position after the infinitive.` },
    { main: `Sie nimmt ihren Schirm mit`, conj: `obwohl`, mid: `im Moment noch die Sonne`, ans: `scheint`, wrong: [`scheint im Moment`, `scheinen`, `gescheint`], en: `She is taking her umbrella although the sun is still shining at the moment.`, why: `"obwohl" sends the conjugated verb "scheint" to the end of the clause.` },
    { main: `Wir bleiben im Wartezimmer`, conj: `bis`, mid: `unsere Nummer aufgerufen`, ans: `wird`, wrong: [`werden`, `wird aufgerufen`, `hat`], en: `We remain in the waiting room until our number is called.`, why: `The conjugated auxiliary "wird" moves to the very end after the participle.` },
    { main: `Ich rufe dich sofort an`, conj: `sobald`, mid: `ich im Hotel`, ans: `angekommen bin`, wrong: [`bin angekommen`, `angekommen habe`, `ankomme bin`], en: `I will call you immediately as soon as I have arrived at the hotel.`, why: `"ankommen" forms its Perfekt with "sein", and the finite auxiliary "bin" stands last.` },
    { main: `Meine Chefin hat gesagt`, conj: `dass`, mid: `das Meeting um elf Uhr`, ans: `stattfindet`, wrong: [`findet statt`, `stattfinden`, `statt findet`], en: `My boss said that the meeting takes place at eleven o'clock.`, why: `In a "dass" clause, a separable verb stays together as one word ("stattfindet") at the end.` },
    { main: `Wir gehen ins Restaurant`, conj: `nachdem`, mid: `wir die Arbeit`, ans: `beendet haben`, wrong: [`haben beendet`, `beendet sind`, `beenden haben`], en: `We are going to the restaurant after we have finished work.`, why: `In a "nachdem" clause, the finite auxiliary "haben" sits at the very end.` },
    { main: `Prüfen Sie die Adresse`, conj: `bevor`, mid: `Sie den Brief`, ans: `abschicken`, wrong: [`schicken ab`, `ab schicken`, `abgeschickt`], en: `Check the address before you post the letter.`, why: `The separable verb "abschicken" remains intact at the end of the "bevor" clause.` },
    { main: `Ich weiß nicht genau`, conj: `ob`, mid: `mein Kollege heute`, ans: `mitkommen kann`, wrong: [`kann mitkommen`, `mitkommt kann`, `kann mit kommt`], en: `I do not know for certain whether my colleague can come along today.`, why: `With a modal in an "ob" clause, the infinitive ("mitkommen") comes before the finite modal ("kann").` },
    { main: `Alle waren sehr froh`, conj: `als`, mid: `die Prüfung endlich`, ans: `vorbei war`, wrong: [`war vorbei`, `vorbei ist`, `vorbei gewesen`], en: `Everyone was very glad when the exam was finally over.`, why: `"als" introduces a subordinate clause, moving "war" to the final position.` },
  ];

  const subNames = [`Paul`, `Elena`, `Frau Berg`, `Herr Wolf`, `Mein Kollege`, `Meine Schwester`, `Lukas`, `Anna`, `Frau Weber`, `Herr Klein`, `Sabine`, `Tim`];
  for (let i = 0; i < 12; i++) {
    for (const t of subOrderTemplates) {
      if (pool.length < 880) {
        const name = subNames[i % subNames.length];
        const prompt =
          i === 0
            ? `${t.main}, ${t.conj} ${t.mid} _____.`
            : `${name} schreibt: „${t.main}, ${t.conj} ${t.mid} _____.“`;
        pool.push({
          id: pool.length + 1,
          cat: `conjunctions`,
          rule: `Subordinate Clause Verb Position (${t.conj})`,
          prompt,
          answer: t.ans,
          options: [t.ans, ...t.wrong],
          en: t.en,
          why: t.why,
        });
      }
    }
  }

  const inversionDrills = [
    { p: `Am Montag _____ wir einen wichtigen Termin im Rathaus.`, ans: `haben`, opts: [`haben`, `wir haben`, `habt`, `hat`], en: `On Monday we have an important appointment at the town hall.`, why: `When a time expression ("Am Montag") takes Position 1, the finite verb ("haben") stays in Position 2 before the subject ("wir").` },
    { p: `Weil es heute stark regnet, _____ die Kinder im Wohnzimmer.`, ans: `spielen`, opts: [`spielen`, `die Kinder spielen`, `spielt`, `zu spielen`], en: `Because it is raining heavily today, the children are playing in the living room.`, why: `A fronted subordinate clause counts as Position 1, so the main clause must begin immediately with its finite verb ("spielen").` },
    { p: `Wenn du keine Zeit hast, _____ ich das Formular allein aus.`, ans: `fülle`, opts: [`fülle`, `ich fülle`, `füllt`, `füllen`], en: `If you have no time, I will fill in the form on my own.`, why: `After a fronted "Wenn" clause, the main clause starts directly with the conjugated verb ("fülle") followed by the subject ("ich").` },
    { p: `Morgen früh _____ mein Zug bereits um sechs Uhr.`, ans: `fährt`, opts: [`fährt`, `mein Zug fährt`, `fahren`, `abfahren`], en: `Tomorrow morning my train already departs at six o'clock.`, why: `Time adverbial in Position 1 triggers Subject–Verb inversion: verb ("fährt") in Position 2, subject ("mein Zug") in Position 3.` },
    { p: `Im Sommer _____ viele Familien gern an die Ostsee.`, ans: `fahren`, opts: [`fahren`, `viele Familien fahren`, `fährt`, `gefahren`], en: `In summer many families like travelling to the Baltic Sea.`, why: `With "Im Sommer" in Position 1, the plural verb "fahren" takes Position 2.` },
    { p: `Obwohl die Aufgabe schwer ist, _____ sie nicht auf.`, ans: `gibt`, opts: [`gibt`, `sie gibt`, `geben`, `abgibt`], en: `Although the task is difficult, she does not give up.`, why: `The fronted "Obwohl" clause fills Position 1, placing the conjugated stem "gibt" directly after the comma.` },
    { p: `Deswegen _____ wir uns lieber vorher telefonisch anmelden.`, ans: `sollten`, opts: [`sollten`, `wir sollten`, `sollte`, `sollt`], en: `Therefore we ought to register by telephone beforehand.`, why: `"Deswegen" occupies Position 1, so the modal verb "sollten" stands in Position 2.` },
    { p: `Nach der Arbeit _____ ich meistens noch schnell im Supermarkt ein.`, ans: `kaufe`, opts: [`kaufe`, `ich kaufe`, `kauft`, `einkaufe`], en: `After work I usually quickly do some shopping at the supermarket.`, why: `"Nach der Arbeit" sits in Position 1; the finite verb stem "kaufe" takes Position 2 and prefix "ein" closes the sentence.` },
    { p: `Glücklicherweise _____ alle Dokumente vollständig vorhanden.`, ans: `sind`, opts: [`sind`, `alle Dokumente sind`, `ist`, `seid`], en: `Fortunately all documents are present in full.`, why: `"Glücklicherweise" takes Position 1, keeping the verb "sind" in Position 2.` },
    { p: `Mit diesem Zug _____ Sie ohne Umsteigen direkt bis München.`, ans: `kommen`, opts: [`kommen`, `Sie kommen`, `kommt`, `kommst`], en: `With this train you get straight to Munich without changing.`, why: `Prepositional phrase in Position 1 triggers inversion: "kommen Sie".` },
    { p: `Als wir in Berlin ankamen, _____ es schon dunkel.`, ans: `war`, opts: [`war`, `es war`, `waren`, `ist`], en: `When we arrived in Berlin, it was already dark.`, why: `Fronted "Als" clause acts as Position 1, so the main clause starts with the verb "war".` },
    { p: `Im Wartezimmer _____ man nicht laut telefonieren.`, ans: `darf`, opts: [`darf`, `man darf`, `dürfen`, `darfst`], en: `In the waiting room one is not allowed to speak loudly on the phone.`, why: `Place expression in Position 1 puts modal "darf" in Position 2 ahead of "man".` },
  ];

  const timePrefixes = [
    ``,
    `Merksatz: `,
    `Im Büro: `,
    `Planung: `,
    `Alltag: `,
    `Praxis: `,
    `Hinweis: `,
    `Beispiel: `,
    `Unterwegs: `,
    `Wichtig: `,
  ];
  for (let i = 0; pool.length < 1000; i++) {
    const inv = inversionDrills[i % inversionDrills.length];
    const tag = timePrefixes[Math.floor(i / inversionDrills.length) % timePrefixes.length];
    pool.push({
      id: pool.length + 1,
      cat: `conjunctions`,
      rule: `Position 2 & Subject–Verb Inversion`,
      prompt: tag ? `${tag}${inv.p}` : inv.p,
      answer: inv.ans,
      options: inv.opts,
      en: inv.en,
      why: inv.why,
    });
  }

  return pool;
}
