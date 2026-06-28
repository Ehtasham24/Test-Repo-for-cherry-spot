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
| `test/edge-cases` | TC-010 to TC-012 | UI edge cases |
| `test/multi-conflict` | TC-013 | Two files conflict simultaneously |
| `test/bulk-commits` | TC-014 to TC-028 | Scroll / 50-commit limit test |

---

## Test Cases

### TC-A: Basic Cherry-Pick (Happy Path)
**Goal:** Cherry-pick a clean commit with no conflicts.

1. Open Cherry Spot → repo `C:\Code\TestRepo`
2. Select branch `feature/notifications`
3. Search: `TC-007`
4. Select the commit → target branch: `staging` → Cherry Pick
5. **Expected:** Success result, commit applied cleanly

---

### TC-B: Squash Cherry-Pick
**Goal:** Squash multiple commits into one before applying.

1. Select branch `feature/notifications`
2. Select TC-007, TC-008, TC-009 (all three)
3. Enable **Squash** toggle → target: `staging` → Squash Pick
4. **Expected:** Single squashed commit applied to staging

---

### TC-C: Single-File Conflict
**Goal:** Trigger conflict resolution screen.

1. Select branch `feature/payments`
2. Search `TC-006` → select it → target: `staging` → Cherry Pick
3. **Expected:** Conflict screen appears (`src/tasks/taskService.js`)
4. Test each resolution button:
   - **Keep ours** → Mark resolved → Continue
   - **Accept incoming** → Mark resolved → Continue
   - **Open in editor** → resolve manually → Mark resolved → Continue
   - **Abort** → verify staging is back to clean state

---

### TC-D: Multi-File Conflict
**Goal:** Two files conflict at once.

1. Select branch `test/multi-conflict`
2. Select TC-013 → target: `staging` → Cherry Pick
3. **Expected:** Conflict screen shows **two files** (`login.js` and `widgets.js`)
4. Resolve both files → Continue

---

### TC-E: Uncommitted Changes (Stash Prompt)
**Goal:** Trigger the stash-and-continue flow.

1. In `C:\Code\TestRepo`, manually edit any file without committing
2. Open Cherry Spot → attempt any cherry-pick onto `staging`
3. **Expected:** Stash Prompt screen appears
4. Click **Stash & Continue** → cherry-pick proceeds
5. Verify local edits are restored after cherry-pick

---

### TC-F: Search by Task ID
**Goal:** Verify search filters commits correctly.

| Search term | Expected result |
|---|---|
| `TC-001` | 1 commit |
| `TC-007` | 1 commit |
| `auth` | TC-001, TC-002, TC-013 |
| `notifications` | TC-007, TC-008 |
| `fix` | TC-002, TC-027 |
| `xyznotexist` | 0 results |

---

### TC-G: Date Range Filter
**Goal:** Filter commits by date range.

| From | To | Branch | Expected |
|---|---|---|---|
| `2026-06-01` | `2026-06-10` | `staging` | TC-001, TC-002, TC-003 |
| `2026-06-12` | `2026-06-12` | `staging` | TC-004 only |
| `2026-05-01` | `2026-05-31` | `test/bulk-commits` | TC-014 to TC-028 (May commits) |
| `2026-07-01` | `2026-07-31` | any | 0 results |

---

### TC-H: All Branches Mode
**Goal:** Search across every configured branch simultaneously.

1. Enable **Search all branches** toggle
2. Search `TC-` → should show commits from all branches combined
3. Search `feat` → should aggregate results from all branches
4. **Expected:** Branch badges appear on each commit row showing its source branch

---

### TC-I: Long Commit Message (UI Truncation)
**Goal:** Verify long messages are truncated without breaking layout.

1. Select branch `test/edge-cases`
2. Find TC-011 (very long message about `appConfig`)
3. **Expected:** Message truncated with ellipsis in list; full message visible in diff viewer

---

### TC-J: Multi-File Diff Viewer
**Goal:** Verify diff viewer shows all changed files.

1. Select branch `test/edge-cases`
2. Find TC-012 (changes `routes.js`, `errorHandler.js`, `index.js`)
3. Click **Files** button on the commit row
4. **Expected:** 3 files listed in left panel; clicking each shows correct diff

---

### TC-K: Scroll / 50-Commit Limit
**Goal:** Verify commit list scrolls and respects the 50-commit cap.

1. Select branch `test/bulk-commits`
2. Leave search empty → all commits load
3. **Expected:** Up to 50 commits shown, list is scrollable
4. Search `TC-01` → narrow results, confirm filtering works on bulk branch

---

### TC-L: Push After Cherry-Pick
**Goal:** Verify the Push button works after a successful cherry-pick.

1. Complete any successful cherry-pick onto `staging`
2. On the result screen, click **Push staging**
3. **Expected:** Commit pushed to `origin/staging`; confirm on GitHub

---

### TC-M: Abort Cherry-Pick
**Goal:** Verify abort leaves the repo clean.

1. Trigger any conflict (TC-C or TC-D)
2. On conflict screen, click **Abort**
3. **Expected:** Back to idle state; `staging` branch unchanged; no `CHERRY_PICK_HEAD` file in `.git/`

---

### TC-N: Minimize / Tray / Drag
**Goal:** Window management edge cases.

| Action | Expected |
|---|---|
| Drag title bar | Window moves |
| Click `−` | Window minimizes to taskbar; visible in alt-tab |
| Alt-tab away | App stays open; does NOT auto-hide |
| Restore from taskbar | Window comes back normally |
| Click `×` | Window hides to system tray |
| Click tray icon | Window restores |
| `Ctrl+Shift+F` while minimized | Window restores |

---

### TC-O: Empty Search
**Goal:** With no search text, all recent commits should show.

1. Open Cherry Spot → select any branch
2. Leave search box empty
3. **Expected:** Up to 50 most recent commits load automatically (no blank screen)
4. Clear dates if any → full list returns

---

## Reset Staging After Testing

After running conflict tests, staging will have extra commits. To reset:

```bash
cd C:\Code\TestRepo
git checkout staging
git reset --hard origin/staging   # reset to remote state
# OR to a specific commit:
git reset --hard <hash>
git push origin staging --force-with-lease
```
