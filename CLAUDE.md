## graphify

This project has a graphify knowledge graph at .graphify/.

Rules:
- For codebase or architecture questions, when `.graphify/graph.json` exists, first run `graphify query "<question>"` (or `graphify path "<A>" "<B>"` / `graphify explain "<concept>"`); these return a scoped subgraph, usually much smaller than `GRAPH_REPORT.md` or raw grep output
- If .graphify/wiki/index.md exists, navigate it instead of reading raw files
- If .graphify/graph.json is missing but graphify-out/graph.json exists, run `graphify migrate-state --dry-run` first; if tracked legacy artifacts are reported, ask before using the recommended `git mv -f graphify-out .graphify` and commit message
- If .graphify/needs_update exists or .graphify/branch.json has stale=true, warn before relying on semantic results and run /graphify . --update when appropriate
- Before proposing or committing .graphify artifacts, run `graphify portable-check .graphify`; commit-safe graph artifacts must use repo-relative paths, and never commit .graphify/branch.json, .graphify/worktree.json, .graphify/needs_update, or .graphify/cache/. If a repo already tracks any of them, first add them to .gitignore, then propose `git rm --cached .graphify/branch.json .graphify/worktree.json .graphify/needs_update` and `git rm -r --cached .graphify/cache`; never mutate git state without asking
- Before deep graph traversal, prefer `graphify summary --graph .graphify/graph.json` for compact first-hop orientation
- For review impact on changed files, use `graphify review-delta --graph .graphify/graph.json` instead of generic traversal
- Read `.graphify/GRAPH_REPORT.md` only for broad architecture review or when `query` / `path` / `explain` do not surface enough context
- After modifying code files in this session, run `npx graphify hook-rebuild` to keep the graph current

CRITICAL: You must run `graphify query` or read `graphify-out/GRAPH_REPORT.md` (or `.graphify/graph.json` / `.graphify/studio/studio.html` on newer Graphify builds) before any raw file read, Glob, or Grep. This is non-negotiable.

# Graphify enforcement

- Treat `graphify` as mandatory for understanding this codebase. `grep`/`Grep` and raw file reads are a fallback only, to be used after consulting the graph, never before it.
- Any subagent spawned inside this project must follow the same rule: query the graph first, fall back to grep only if the graph doesn't have the answer.
- At the start of a session: use `graphify-out/GRAPH_REPORT.md` (or the current project's `.graphify/graph.json`) before searching files. Do not use raw grep first.
- Strict-mode enforcement is active for this project (`graphify install --project --strict`, `GRAPHIFY_HOOK_STRICT=1`, and a `PreToolUse` hook installed via `graphify claude install` in `.claude/settings.json`). The first raw source read of a session is hard-blocked and redirected to the graph; file search and bash commands are intercepted by the hook.

# Companion tooling

The following are installed once at user scope (`~/.claude/`) and are active in every session in this project, not just this one. They don't overlap or need to be invoked manually - each reacts to its own lifecycle hook or slash command:

- **claude-mem** - captures what happens in this session (files read/edited, decisions made) and injects relevant memories back in at the start of future sessions. Nothing to do here; it runs on Claude Code's own SessionStart/PostToolUse/Stop hooks.
- **headroom** - a live context-window usage bar in the statusline, reading the actual session JSONL rather than estimating. Purely observational - use it to decide when to `/compact` or start a fresh session, especially important on a long OmniRoute-routed session where compression changes what "context used" looks like.
- **claude-code-setup** - read-only; if asked to recommend MCP servers, hooks, skills, or subagents for this project, this is the mechanism, invoked via its own skill.
- **task-observer** - a skill for spotting when an existing skill in this project is out of date or missing something, based on how it's actually being used.
- **claude-md-management** - this file. Run `/revise-claude-md` (or press `#` mid-session) to capture a learning - a discovered build flag, a naming convention you were corrected on - directly into this file instead of losing it at session end. Keep additions concise and merged into the relevant existing section rather than appended as a new one where one already fits.

# hackathon-ai-strategist agent

This project has a dedicated subagent at `.claude/agents/hackathon-ai-strategist.md` — an elite hackathon strategist persona (concept ideation, judge-perspective scoring, team/time allocation, pitch coaching).

Rules:
- For any task involving: choosing/ranking hackathon ideas, judging-criteria fit, scoping what's buildable in the event's time window, team/role allocation, demo triage, or pitch/deck structure — dispatch to the `hackathon-ai-strategist` subagent via the Agent tool rather than answering directly.
- The agent requires context before advising: hackathon duration, theme/tracks, team composition, starting point, sponsor APIs, mandatory constraints. Gather these from the user or existing docs (`docs/SDG_Hackathon_Idea_Guide.docx`, `docs/AI Hackathon Festival 2026 - Participant Info.pdf`) before invoking it, or let the agent ask.
- Use it throughout the project lifecycle, not just at kickoff: ideation, mid-build triage, and pre-pitch prep are all in scope.
