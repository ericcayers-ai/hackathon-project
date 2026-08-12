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
        type: 'must_include',
        value: '14/03/1948',
        severity: 'must',
        note: 'The DOB is a calendar date and should be reproducible verbatim if referenced, not decomposed as a duration.',
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
]
