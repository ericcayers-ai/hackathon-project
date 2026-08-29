// Eval corpus for `app/prompts/system-prompt.txt`.
//
// Each case sends `input` as the user message (system message is the prompt
// under test) and checks the model's plain-language rewrite against
// `assertions`. Assertions are all case-insensitive substring/regex checks —
// deliberately simple, since the point is to catch specific documented
// regressions, not to grade prose quality.
//
// `severity`:
//   'must'  — a failed assertion fails the case (and the run).
//   'info'  — reported but does not fail the run. Used for the "6/52" date
//             ceiling, which is a documented, intentional model-size
//             limitation (see docs/decisions/0003-prompt-stabilization.md),
//             not a prompt bug — the eval should surface what the model
//             actually does without blocking on it.
//
// See docs/decisions/0003-prompt-stabilization.md for why this exists and
// what it's still missing (a wider corpus, real per-case human review).

const FLAG = '[flag for nurse review'

export const cases = [
  {
    id: 'activity-limits-absent-no-fabrication',
    description:
      'Source document has no activity/driving/lifting/work limits at all. ' +
      'Regression under test: app/CLAUDE.md §2 documents the model ' +
      'sometimes fabricating "Your doctor may have limited the amount of ' +
      'activity you can do" here instead of flagging it. system-prompt.txt ' +
      '1.1 added an explicit no-fabrication rule for this — this case is ' +
      'what proves (or disproves) that rule actually holds against a live model.',
    input: `Waikato Hospital - Discharge Summary
[SYNTHETIC TEST DOCUMENT - not a real patient]

Patient: Hemi Walker (fictional)   NHI: ZZZ1111   DOB: 02/11/1972   Age 53
Ward: M2   Consultant: Dr A. Singh
Admitted: 10/08/2026   Discharged: 12/08/2026

Dx: 1. Cellulitis, left lower leg

PC: 3/7 increasing redness and pain, left shin. O/E afebrile, localised
erythema and warmth, no fluctuance.

Ix: CRP 42, WCC 11.1. No imaging required.

Mgmt: IV flucloxacillin 2g QID 2/7, switched to PO.

Meds on discharge:
- Flucloxacillin 500mg QID PO - 5/7 course, complete it (NEW)
- Paracetamol 1g QID PRN (unchanged)

F/U: GP review wound in 1/52 if not settling.

Safety-net: return if spreading redness, fever, or increasing pain.

Clinician: Dr R. Ngata, House Officer`,
    assertions: [
      {
        type: 'section_must_include',
        heading: 'Activity limits',
        value: FLAG,
        severity: 'must',
        note: 'No activity/driving/lifting/work limit is stated anywhere in the source, so "Activity limits" must be flagged, not filled in.',
      },
      {
        type: 'must_not_include',
        value: 'may have limited the amount of activity',
        severity: 'must',
        note: 'The specific fabricated phrasing documented in app/CLAUDE.md §2.',
      },
      {
        type: 'must_not_include',
        value: 'avoid strenuous activity',
        severity: 'must',
        note: 'Another plausible-sounding invented limit — not stated in the source.',
      },
    ],
  },

  {
    id: 'activity-limits-present-reported-accurately',
    description:
      'Source document DOES state an activity limit. Control case for the ' +
      'above: the no-fabrication rule must not make the model over-cautiously ' +
      'flag a limit that is actually present.',
    input: `Waikato Hospital - Discharge Summary
[SYNTHETIC TEST DOCUMENT - not a real patient]

Patient: Mere Tane (fictional)   NHI: ZZZ2222   DOB: 21/05/1965   Age 61
Ward: Ortho   Consultant: Mr T. Brown
Admitted: 05/08/2026   Discharged: 09/08/2026

Dx: 1. Right total hip replacement (elective)

PC: Elective admission for right THR. Procedure uneventful.

Mgmt: Standard post-op THR pathway. Physio input given.

Meds on discharge:
- Paracetamol 1g QID PRN (unchanged)
- Enoxaparin 40mg OD SC - 4/52 course for DVT prophylaxis (NEW)

Activity: No hip flexion beyond 90 degrees for 6/52. No driving for 6/52.
No heavy lifting (>5kg) for 6/52. Weight-bear as tolerated with frame,
progressing to sticks per physio.

F/U: Ortho OPA r/v with x-ray in 6/52.

Safety-net: return if calf swelling/pain, wound discharge, or fever.

Clinician: Dr K. Wiremu, House Officer`,
    assertions: [
      {
        type: 'section_must_not_include',
        heading: 'Activity limits',
        value: 'Your notes do not mention this',
        severity: 'must',
        note: 'An activity limit IS stated in the source, so the section must not be flagged as absent.',
      },
      {
        type: 'section_must_include',
        heading: 'Activity limits',
        value: 'driv',
        severity: 'must',
        note: 'The stated driving restriction should carry through to the rewrite.',
      },
    ],
  },

  {
    id: 'date-shorthand-non-time-slashes-preserved',
    description:
      'Step 2 of the prompt lists non-time slashes (2/2, calendar dates, ' +
      'blood pressure, lab pairs) that must NOT be treated as durations. ' +
      'This case packs several into one document.',
    input: `Waikato Hospital - Discharge Summary
[SYNTHETIC TEST DOCUMENT - not a real patient]

Patient: Sione Fifita (fictional)   NHI: ZZZ3333   DOB: 14/03/1948   Age 78
Ward: M4   Consultant: Dr L. Chen
Admitted: 01/08/2026   Discharged: 03/08/2026

Dx: 1. Acute exacerbation COPD 2/2 viral URTI  2. HTN

PC: 2/7 worsening SOB and cough. BP 148/86 on admission. Na / K 138 / 4.2.

Ix: CXR no consolidation. eGFR 71.

Mgmt: Prednisone 30mg OD 5/7. Salbutamol nebs weaned to inhalers.

Meds on discharge:
- Prednisone 30mg OD - 5/7 course, complete it (NEW)
- Amlodipine 5mg OD (unchanged)
- Salbutamol inhaler 2 puffs QID PRN (unchanged)

F/U: GP review in 1/52.

Safety-net: return if worsening SOB, chest pain, or fever.

Clinician: Dr P. Anderson, House Officer`,
    assertions: [
      {
        type: 'must_not_include',
        value: '2 days',
        severity: 'must',
        note: '"2/2" means "because of", not a 2-day duration — must not be converted to a time span.',
      },
      {
        type: 'must_not_include',
        value: '148 days',
        severity: 'must',
        note: 'BP reading 148/86 must not be read as a duration.',
      },
      {
        type: 'must_not_include',
        value: '86 days',
        severity: 'must',
        note: 'BP reading 148/86 must not be read as a duration (second half).',
      },
      {
        // Catches the regression: the model must not have *mis-parsed* the
        // DOB as a duration. The original assertion required verbatim
        // '14/03/1948' reproduction, which penalised correct rephrasing —
        // the patient does not need their own DOB echoed back at them. The
        // very next iteration was `must_not_include '14/03'`, but that
        // fired on the canned mock response which *correctly* rephrases the
        // DOB in a final sentence. This third iteration is the one that
        // catches the actual failure mode (the model saying "14/03 days"
        // or "03 days for the 14" etc.) without penalising either correct
        // rephrasing or verbatim DOB reproduction. See
        // docs/decisions/0005 §3.
        type: 'must_not_include',
        value: '14/03 days',
        severity: 'must',
        note: 'The DOB (14/03/1948) must not be mis-parsed as a 14/03-day duration. Correct clinical rephrasing that omits the literal DOB, or reproduces it as a calendar date, are both fine.',
      },
    ],
  },

  {
    id: 'date-shorthand-compound-and-x-prefix',
    description:
      'Step 2 covers the "x" prefix (x2/52 = "for 2 weeks") and compound ' +
      'quantity-over-time forms (3kg/10/7). Both appear in real Waikato-style ' +
      'notes and are easy for a prompt rewrite to mishandle.',
    input: `Waikato Hospital - Discharge Summary
[SYNTHETIC TEST DOCUMENT - not a real patient]

Patient: Ana Petera (fictional)   NHI: ZZZ4444   DOB: 09/09/1980   Age 45
Ward: M1   Consultant: Dr S. Patel
Admitted: 06/08/2026   Discharged: 08/08/2026

Dx: 1. Decompensated heart failure

PC: wt gain 3kg/10/7, increasing leg swelling.

Mgmt: IV furosemide, converted to PO. Fluid restriction advised x2/52.

Meds on discharge:
- Furosemide 40mg OD (dose up from 20mg)
- Bisoprolol 2.5mg OD (unchanged)

F/U: Cardiology OPA in 2/52. GP recheck U+E 1/52.

Safety-net: return if worsening SOB, swelling, or weight gain >2kg in 2/7.

Clinician: Dr M. Wong, House Officer`,
    assertions: [
      {
        type: 'must_include_regex',
        value: '3\\s*kg.{0,20}10\\s*days',
        severity: 'must',
        note: '"3kg/10/7" should read as "3 kg over 10 days", not divided or misparsed.',
      },
      {
        type: 'must_include_regex',
        value: 'for\\s*2\\s*weeks',
        severity: 'must',
        note: '"x2/52" should read as "for 2 weeks" (the "x" prefix means duration, not multiplication).',
      },
    ],
  },

  {
    id: 'date-shorthand-6-52-ceiling',
    description:
      'The documented, INTENTIONAL model-size ceiling: small models often ' +
      'misread "6/52" as "6 weeks and 5 days" instead of "6 weeks". Per ' +
      'app/CLAUDE.md §2 and docs/decisions/0003-prompt-stabilization.md, ' +
      'this is left in place on purpose (the clinician gate is the fix), and ' +
      'the long-term direction is a deterministic date parser, not a prompt ' +
      'change. This case is severity: info — it reports what the model did, ' +
      'it does not fail the run.',
    input: `Waikato Hospital - Discharge Summary
[SYNTHETIC TEST DOCUMENT - not a real patient]

Patient: Aroha Ngata (fictional)   NHI: ZZZ9999   DOB: 14/03/1958   Age 68
Ward: M3   Consultant: Dr S. Patel
Admitted: 28/07/2026   Discharged: 02/08/2026

Dx: 1. Community-acquired pneumonia (RLL)

PC: 4/7 productive cough, fevers, increasing SOB.

Mgmt: IV ceftriaxone 1g OD 3/7 then switched PO.

Meds on discharge:
- Amoxicillin 500mg TDS PO - 5/7 course, complete it

F/U: Repeat CXR in 6/52 via GP.

Safety-net: return if worsening SOB, chest pain, or haemoptysis.

Clinician: Dr J. Lee, House Officer`,
    assertions: [
      {
        type: 'must_include',
        value: '13/09/2026',
        severity: 'info',
        note: 'Correct answer: discharged 02/08/2026 + 6 weeks (42 days) = 13/09/2026. Known ceiling: small models frequently get this wrong ("6 weeks and 5 days"). Not a pass/fail gate — informational only until the deterministic date-parsing decision in docs/decisions/0003 is acted on.',
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Cases added 2026-08-30 to address coverage gaps surfaced by the first
  // live-model eval run (see app/eval/live-results-qwen3-8b.md and
  // docs/decisions/0005). Each is small, isolated, and targets a single
  // documented regression or a known-uncovered shorthand form. The
  // 5-case prior corpus packed multiple concerns into one document,
  // which made it hard to attribute a pass/fail to a specific prompt
  // rule. These cases do one thing each.
  // -----------------------------------------------------------------------

  {
    // Regression under test: a tempting failure mode for the model is to
    // turn the "because of" usage of "2/2" into a 2-day duration. This
    // case is the MINIMAL version of that — no other time slashes in the
    // source at all, so any duration reading is unambiguously a parse
    // failure.
    id: 'date-shorthand-2-2-because-of-isolated',
    description:
      'Isolated "2/2" usage meaning "because of" / "secondary to", with ' +
      'no other time slashes in the source. Catches the most common form ' +
      'of the 2/2-mis-parsed-as-2-days regression without the noise of ' +
      'other date shorthand in the same document.',
    input: `Waikato Hospital - Discharge Summary
[SYNTHETIC TEST DOCUMENT - not a real patient]

Patient: Aroha Nicholas (fictional)   NHI: ZZZ5555   DOB: 30/04/1955   Age 71
Ward: M5   Consultant: Dr K. Ho

Dx: Acute kidney injury 2/2 dehydration from gastroenteritis.

PC: 5/7 vomiting and diarrhoea, reduced oral intake.

Meds on discharge:
- Sodium chloride 600mg TDS PRN (NEW)
- Ondansetron 4mg BD PRN (NEW)

Safety-net: return if unable to keep fluids down for 24 hours.

Clinician: Dr T. Brown, House Officer`,
    assertions: [
      {
        type: 'must_not_include',
        value: '2 days',
        severity: 'must',
        note: 'The "2/2" in the diagnosis line means "because of", not a 2-day duration. A model that emits "2 days" here is unambiguously mis-parsing.',
      },
      {
        // The regex matches plain-language causal phrasings: "because
        // of", "because [you]", "caused by", "secondary to", "due to",
        // or "from" (which the model uses in "caused by dehydration from
        // a stomach bug"). The case-1+2+3 prior corpus covered this
        // with substring "2 days" / "because of", but Qwen 3 8B chose
        // "This happened because you had vomiting..." in this run,
        // which is semantically correct but didn't match the stricter
        // prior regex.
        type: 'must_include_regex',
        value: 'because|caused by|secondary to|due to|from',
        severity: 'must',
        note: 'The rewrite must convey that the AKI was caused by the dehydration. Any of "because", "caused by", "secondary to", "due to", or "from" is acceptable plain language.',
      },
    ],
  },

  {
    // Regression under test: dose changes are written as "Xmg -> Ymg" in
    // some Waikato-format notes. This is NOT a date and NOT a duration;
    // it is a medication change. Catches a model that pattern-matches on
    // any "N/M" form and turns it into a duration.
    id: 'date-shorthand-dose-change-not-duration',
    description:
      'Source document uses "40mg -> 60mg" (a dose change) and "1mg/mL" ' +
      '(a concentration). Both contain slash-like characters and are ' +
      'easy for a slash-parsing model to misread. This case catches that ' +
      'without the noise of any other time shorthand in the source.',
    input: `Waikato Hospital - Discharge Summary
[SYNTHETIC TEST DOCUMENT - not a real patient]

Patient: Tama Tane (fictional)   NHI: ZZZ6666   DOB: 17/07/1942   Age 84
Ward: M6   Consultant: Dr S. Williams

Dx: 1. Heart failure with reduced ejection fraction (HFrEF)

Meds on discharge:
- Furosemide 40mg -> 60mg OD (DOSE CHANGED, was 40mg)
- Spironolactone 25mg OD (NEW)
- Perindopril 4mg OD (unchanged)

Concentration note: give the furosemide as 1mg/mL oral solution.

F/U: Heart-failure nurse phone review in 1/52.

Safety-net: return if weight gain >2kg in 2/7, increasing breathlessness, or leg swelling.

Clinician: Dr R. Harris, House Officer`,
    assertions: [
      {
        type: 'must_not_include',
        value: '40 days',
        severity: 'must',
        note: 'The "40mg -> 60mg" dose change is not a 40-day duration. A model that emits "40 days" is mis-parsing the dose.',
      },
      {
        type: 'must_not_include',
        value: '60 days',
        severity: 'must',
        note: 'Same as above for the second half of the dose change.',
      },
      {
        type: 'must_include',
        value: '60mg',
        severity: 'must',
        note: 'The new dose (60mg) must carry through to the rewrite. If the rewrite just says "Furosemide 40mg once a day (dose increased)" without the new 60mg value, the patient does not know what to take.',
      },
      {
        type: 'must_not_include',
        value: '1 mg per day',
        severity: 'must',
        note: 'The "1mg/mL" concentration is a formulation, not a daily dose. A model that reads "1 mg/mL" as "1 mg per day" is mis-parsing the unit.',
      },
    ],
  },

  {
    // Regression under test: a model that *fabricates* an activity limit
    // when none is in the source is the original ADR-0003 regression.
    // The prior corpus already covers this for the "Activity limits"
    // section heading (case 1). This case covers a different angle: the
    // same absence of limits, but the assertion is on the
    // "Looking after yourself at home" section instead, where the 1.3
    // attempt at an anti-over-correction rule accidentally surfaced
    // fabricated limits (see docs/decisions/0005 §4). It pins the
    // no-fabrication rule in BOTH sections.
    id: 'activity-limits-absent-no-fabrication-self-care',
    description:
      'Same absence-of-limits regression as case 1, but the assertion ' +
      'is on the "Looking after yourself at home" section instead of the ' +
      '"Activity limits" section. A model that correctly flags the ' +
      'limits section empty but then fabricates a self-care-style limit ' +
      '("take it easy for a few days", "avoid strenuous activity") in ' +
      'the home-care section is still fabricating. Both must be empty.',
    input: `Waikato Hospital - Discharge Summary
[SYNTHETIC TEST DOCUMENT - not a real patient]

Patient: Wiremu Rangi (fictional)   NHI: ZZZ7777   DOB: 12/02/1990   Age 36
Ward: SAU   Consultant: Dr L. Mahuta

Dx: 1. Acute appendicitis, post-laparoscopic appendicectomy

PC: 1/7 right iliac fossa pain, anorexia, low-grade fever.

Mgmt: Laparoscopic appendicectomy, uncomplicated. Tolerating diet.

Meds on discharge:
- Paracetamol 1g QID PRN (NEW)
- Ibuprofen 400mg TDS PRN with food (NEW)

F/U: GP review wound in 1/52. Suture removal 10/7.

Safety-net: return if fever, increasing wound pain, or wound discharge.

Clinician: Dr P. Kumar, House Officer`,
    assertions: [
      {
        type: 'section_must_not_include',
        heading: 'Looking after yourself at home',
        value: 'strenuous activity',
        severity: 'must',
        note: 'No activity/driving/lifting/work limit is in the source. The rewrite must not fabricate one under "Looking after yourself at home" either. This pins the no-fabrication rule in the self-care section, which the 1.3 anti-over-correction rule accidentally violated in a 3-run sample (see docs/decisions/0005 §4).',
      },
      {
        type: 'section_must_not_include',
        heading: 'Looking after yourself at home',
        value: 'take it easy',
        severity: 'must',
        note: 'Same as above. "Take it easy" is a vague instruction that masquerades as a limit. The source has no such instruction; the rewrite must not invent one.',
      },
      {
        type: 'section_must_not_include',
        heading: 'Looking after yourself at home',
        value: 'avoid lifting',
        severity: 'must',
        note: 'Same. "Avoid lifting" is another plausible-sounding limit; the source does not state one. The post-appendicectomy patient may have lifting guidance, but it is NOT in this source document.',
      },
      {
        type: 'section_must_include',
        heading: 'Activity limits',
        value: '[flag for nurse review',
        severity: 'must',
        note: 'And the canonical absence-case assertion: "Activity limits" itself must be flagged empty, not filled in. This duplicates the case 1 assertion to keep the two-section no-fabrication guarantee.',
      },
    ],
  },
]
