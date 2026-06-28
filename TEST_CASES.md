# Cherry Spot — Test Cases & Edge Cases

**Repo path for Cherry Spot settings:** `C:\Code\TestRepo`

---

## Branch Map

| Branch | Commits | Purpose |
|---|---|---|
| `master` | Initial scaffold | Base — never cherry-pick onto this |
| `staging` | TC-001 to TC-004 | Primary **target** branch for cherry-picks |
| `feature/notifications` | TC-007 to TC-009 | Clean cherry-pick source (no conflicts) |
| `feature/payments` | TC-005, TC-006 | TC-006 conflicts with staging/TC-003 |
| `test/edge-cases` | TC-010 to TC-012 | Long message, multi-file diff |
| `test/multi-conflict` | TC-013 | Two files conflict simultaneously |
| `test/bulk-commits` | TC-014 to TC-028 | Scroll / 50-commit limit test |
| `test/already-applied` | TC-029 | Identical diff to TC-003 → SKIPPED status |
| `test/chain-conflict` | TC-030a, TC-030b | Two sequential conflicts on different files |
| `test/rename-file` | TC-031 | File rename — diff viewer R-status test |

---

## Test Cases

### TC-A: Basic Cherry-Pick (Happy Path)
**Goal:** Cherry-pick a clean commit with no conflicts.

1. Open Cherry Spot → repo `C:\Code\TestRepo`
2. Select branch `feature/notifications`
3. Search: `TC-007`
4. Select the commit → target branch: `staging` → Cherry Pick
5. **Expected:** Success result, commit applied cleanly, new HEAD hash shown

---

### TC-B: Squash Cherry-Pick
**Goal:** Squash multiple commits into one before applying.

1. Select branch `feature/notifications`
2. Select **TC-007, TC-008, TC-009** (all three — Ctrl+click each)
3. Enable **Squash** toggle → target: `staging` → Squash Pick
4. **Expected:** Single squashed commit applied; result screen shows "Squashed 3 commits"

---

### TC-C: Single-File Conflict
**Goal:** Trigger the conflict resolution screen (one file).

1. Select branch `feature/payments`
2. Search `TC-006` → select it → target: `staging` → Cherry Pick
3. **Expected:** Conflict screen appears with `src/tasks/taskService.js`
4. Test each button in turn (reset staging between attempts):
   - **Accept Ours** → Mark Resolved → Continue → success
   - **Accept Incoming** → Mark Resolved → Continue → success
   - **Open in Editor** → fix markers manually → Mark Resolved → Continue → success
   - **Abort** → staging unchanged, no `.git/CHERRY_PICK_HEAD`

---

### TC-D: Multi-File Conflict (Two Files Simultaneously)
**Goal:** Both conflict files appear on the same conflict screen.

1. Select branch `test/multi-conflict`
2. Select TC-013 → target: `staging` → Cherry Pick
3. **Expected:** Conflict screen shows **two files**:
   - `src/auth/login.js`
   - `src/dashboard/widgets.js`
4. Resolve both → Continue

---

### TC-E: Uncommitted Changes → Stash Prompt
**Goal:** Trigger the stash-and-continue flow.

1. In `C:\Code\TestRepo`, manually edit any file (e.g. add a comment) without committing
2. Open Cherry Spot → attempt any cherry-pick onto `staging`
3. **Expected:** Stash Prompt screen appears ("You have uncommitted changes")
4. Click **Stash & Continue** → cherry-pick proceeds
5. After success: verify your local edit is restored (`git stash show`)

---

### TC-F: Search by Task ID / Keyword
**Goal:** Verify search filters commits correctly.

| Search term | Branch | Expected |
|---|---|---|
| `TC-001` | `staging` | 1 commit |
| `TC-007` | `feature/notifications` | 1 commit |
| `auth` | `staging` | TC-001, TC-002 |
| `notifications` | `feature/notifications` | TC-007, TC-008 |
| `fix` | `staging` | TC-002 |
| `xyznotexist` | any | 0 results (empty state shown) |

---

### TC-G: Date Range Filter
**Goal:** Filter commits by date range.

| From | To | Branch | Expected |
|---|---|---|---|
| `2026-06-01` | `2026-06-10` | `staging` | TC-001, TC-002, TC-003 |
| `2026-06-12` | `2026-06-12` | `staging` | TC-004 only |
| `2026-05-01` | `2026-05-31` | `test/bulk-commits` | TC-014 to TC-025 (May commits) |
| `2026-07-01` | `2026-07-31` | any | 0 results |
| Clear dates | any | all | full list returns |

---

### TC-H: All Branches Mode
**Goal:** Search aggregates results across all configured branches.

1. Enable **Search all branches** toggle
2. Search `TC-` → commits from all branches appear together
3. Verify each commit row shows its **branch badge** (violet for author, coloured for branch)
4. Search `feat` → large combined result set, branch badges distinguish sources

---

### TC-I: Long Commit Message (UI Truncation)
**Goal:** Long message doesn't overflow or break layout.

1. Select branch `test/edge-cases`
2. Find TC-011 (message about centralising env-var config — 200+ chars)
3. **Expected:** Message truncated with `…` in list row; **Files** panel shows full message

---

### TC-J: Multi-File Diff Viewer
**Goal:** Diff viewer correctly lists and renders all changed files.

1. Select branch `test/edge-cases`
2. Find TC-012 (changes `routes.js`, `errorHandler.js`, `index.js`)
3. Click the **Files** button on the commit row
4. **Expected:** 3 files in left panel; clicking each renders correct green/red diff

---

### TC-K: Scroll / 50-Commit Limit
**Goal:** Commit list scrolls smoothly and caps at 50 entries.

1. Select branch `test/bulk-commits`
2. Leave search empty → all commits load automatically
3. **Expected:** 15 commits visible, list is scrollable (branch has 15 unique commits)
4. Search `TC-01` → narrowed subset, still works correctly

---

### TC-L: Already-Applied Commit (Skip Status)
**Goal:** Cherry-picking an identical diff shows "skipped" result, not an error.

1. Select branch `test/already-applied`
2. Select TC-029 → target: `staging` → Cherry Pick
3. **Expected:** Result screen shows **SKIPPED** status ("Already applied or no changes")
4. Staging branch unchanged (no extra commit)

> **Why this works:** TC-029 makes the exact same changes as TC-003 which is already in staging. Git detects "nothing to commit" and skips cleanly.

---

### TC-M: Chain Conflict (Two Sequential Commits, Each Conflicts)
**Goal:** Pick two commits in one operation where each triggers a separate conflict.

1. Select branch `test/chain-conflict`
2. Select **both** TC-030a AND TC-030b → target: `staging` → Cherry Pick
3. **Expected on TC-030a:** Conflict screen (`taskService.js`) → resolve → Continue
4. **Expected on TC-030b:** Conflict screen again (`widgets.js`) → resolve → Continue
5. Final result: two commits applied to staging

---

### TC-N: File Rename in Diff Viewer
**Goal:** Diff viewer shows renamed files correctly with old → new path.

1. Select branch `test/rename-file`
2. Select TC-031 → click **Files**
3. **Expected:** File listed as `validators.js → inputValidators.js` with status `R` (Renamed)
4. Clicking the file shows the diff (no actual content change, just rename)

---

### TC-O: Abort Cherry-Pick
**Goal:** Abort leaves the repo in a perfectly clean state.

1. Trigger any conflict (TC-C or TC-D)
2. On conflict screen, click **Abort**
3. **Expected:** Back to idle; staging unchanged; `C:\Code\TestRepo\.git\CHERRY_PICK_HEAD` does not exist

```bash
# Verify in terminal:
cd C:\Code\TestRepo && git status   # should be "nothing to commit"
ls .git\CHERRY_PICK_HEAD 2>nul && echo EXISTS || echo CLEAN
```

---

### TC-P: Minimize / Tray / Drag
**Goal:** Window management behaves like a normal app.

| Action | Expected |
|---|---|
| Drag title bar | Window moves |
| Click `−` (minus) | Minimizes to taskbar; visible in Alt-Tab |
| Alt-tab to another app | Cherry Spot goes behind — does NOT auto-hide |
| Click Cherry Spot in taskbar | Restores normally |
| Click `×` (close) | Hides to system tray icon |
| Click tray icon | Window restores |
| `Ctrl+Shift+F` while hidden | Window restores |
| `Ctrl+Shift+F` while visible | Window hides to tray |

---

### TC-Q: Browse Button for Repo Path
**Goal:** Folder picker sets the repo path without typing.

1. Open Settings (gear icon)
2. Click the **folder icon** button next to the repo path input
3. Navigate to `C:\Code\TestRepo` in the OS folder picker → OK
4. **Expected:** Path field fills automatically
5. Click **Save & Close**

---

### TC-R: Invalid Branch Auto-Clean
**Goal:** Switching repos removes branches that don't exist in the new repo.

1. In Settings, change repo path to a different git repo (or any folder)
2. Click **Save & Close**
3. **Expected:** Branches that don't exist in the new repo are automatically removed from the list (no raw git error)

---

### TC-S: Empty Search (Auto-Load on Branch Select)
**Goal:** Commits load automatically when a branch is selected, no search needed.

1. Open Cherry Spot → select branch `staging`
2. Leave search box empty
3. **Expected:** TC-001 through TC-004 appear immediately, no button press required

---

## Reset Staging After Testing

Conflict tests add extra commits to `staging`. Reset with:

```bash
cd C:\Code\TestRepo
git checkout staging
git reset --hard origin/staging
# If you pushed test commits:
git push origin staging --force-with-lease
```

