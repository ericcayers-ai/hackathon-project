// In-process stand-in for the LM Studio endpoint, used by `run-eval.mjs
// --mock`. It does NOT call a model — it returns a hand-written, correct
// rewrite for each corpus case, matched by a distinguishing substring in the
// input (patient NHI).
//
// Purpose: prove the eval harness itself (assertion checking, section
// extraction, pass/fail reporting) is correct, without needing a running
// LM Studio server. This is NOT a substitute for running `run-eval.mjs`
// against the real model — see docs/decisions/0003-prompt-stabilization.md.
// A passing `--mock` run means "the harness correctly recognizes good
// output"; it says nothing about what the real model actually produces.
//
// Keyed on NHI rather than case id because run-eval.mjs only passes the
// case's `input` text to chatFn (matching what the live code path does,
// where the harness has no other identifying info) — this mirrors that.

const RESPONSES = [
  {
    match: 'ZZZ1111', // activity-limits-absent-no-fabrication
    text: `Why you were seen
You were in hospital because of a skin infection (cellulitis) in your left lower leg.

Your medicines and what changed
- NEW: Flucloxacillin 500mg, 4 times a day by mouth. Finish the full 5-day course.
- UNCHANGED: Paracetamol 1g, 4 times a day, only if needed for pain.

Looking after yourself at home
Take all of your antibiotics as prescribed, even if the leg looks better.

Warning signs — call someone now
Call someone now if the redness spreads, you get a fever, or the pain gets worse.

Follow-up appointments
- Your GP will check the wound in 1 week if it has not settled.

Activity limits
Your notes do not mention this. [flag for nurse review]

Who to call
Contact your GP or come back to hospital if you have any of the warning signs above.`,
  },
  {
    match: 'ZZZ2222', // activity-limits-present-reported-accurately
    text: `Why you were seen
You had planned surgery to replace your right hip.

Your medicines and what changed
- UNCHANGED: Paracetamol 1g, 4 times a day, only if needed for pain.
- NEW: Enoxaparin 40mg, once a day as an injection under the skin, for 4 weeks, to help prevent blood clots.

Looking after yourself at home
Use your frame or sticks as shown by your physiotherapist.

Warning signs — call someone now
Call someone now if your calf becomes swollen or painful, your wound leaks, or you get a fever.

Follow-up appointments
- Your hip specialist will see you with an x-ray in 6 weeks.

Activity limits
Do not bend your hip more than 90 degrees for 6 weeks. Do not drive for 6 weeks. Do not lift anything heavier than 5 kg for 6 weeks.

Who to call
Contact the orthopaedic team or come back to hospital if you have any of the warning signs above.`,
  },
  {
    match: 'ZZZ3333', // date-shorthand-non-time-slashes-preserved
    text: `Why you were seen
You had a flare-up of your lung condition (COPD), caused by a viral infection. You also have high blood pressure.

Your medicines and what changed
- NEW: Prednisone 30mg, once a day by mouth. Finish the full 5-day course.
- UNCHANGED: Amlodipine 5mg, once a day.
- UNCHANGED: Salbutamol inhaler, 2 puffs, 4 times a day, only if needed.

Looking after yourself at home
Your blood pressure on admission was 148/86. Your blood test results (sodium and potassium) were within a normal range.

Warning signs — call someone now
Call someone now if your breathing gets worse, you get chest pain, or you get a fever.

Follow-up appointments
- Your GP will review you in 1 week.

Activity limits
Your notes do not mention this. [flag for nurse review]

Who to call
Contact your GP or come back to hospital if you have any of the warning signs above.

Your date of birth on file is 14/03/1948.`,
  },
  {
    match: 'ZZZ4444', // date-shorthand-compound-and-x-prefix
    text: `Why you were seen
Your heart was not pumping as well as it should, causing fluid to build up. You gained 3 kg over 10 days and had increasing leg swelling.

Your medicines and what changed
- DOSE CHANGED: Furosemide, increased from 20mg to 40mg, once a day.
- UNCHANGED: Bisoprolol 2.5mg, once a day.

Looking after yourself at home
Limit your fluids for 2 weeks, as advised by your medical team.

Warning signs — call someone now
Call someone now if you gain more than 2 kg in 2 days, or your breathing or swelling gets worse.

Follow-up appointments
- Your heart specialist will see you in 2 weeks.
- Your GP will recheck your blood tests in 1 week.

Activity limits
Your notes do not mention this. [flag for nurse review]

Who to call
Contact your GP or come back to hospital if you have any of the warning signs above.`,
  },
  {
    match: 'ZZZ9999', // date-shorthand-6-52-ceiling
    text: `Why you were seen
You had a chest infection (pneumonia) in the lower part of your right lung.

Your medicines and what changed
- NEW: Amoxicillin 500mg, 3 times a day by mouth. Finish the full 5-day course.

Looking after yourself at home
Rest and drink plenty of fluids while you recover.

Warning signs — call someone now
Call someone now if your breathing gets worse, you get chest pain, or you cough up blood.

Follow-up appointments
- 13/09/2026 (6 weeks after you left hospital) — repeat chest x-ray via your GP.

Activity limits
Your notes do not mention this. [flag for nurse review]

Who to call
Contact your GP or come back to hospital if you have any of the warning signs above.`,
  },
]

export async function mockChat(userText) {
  const hit = RESPONSES.find((r) => userText.includes(r.match))
  if (!hit) {
    throw new Error(
      'mock-backend: no canned response matches this input. Add one to app/eval/mock-backend.mjs ' +
        'if you added a new corpus case.',
    )
  }
  return hit.text
}
