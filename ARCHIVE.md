# Archived: the site before the KYC redesign

This branch keeps jamesliuzx.com as it was on 2026-11-12, before the "Know your
candidate" redesign landed on `main`. It is here for comparison only; nothing
deploys from it to production. Vercel builds it as a preview.

The archived site is `f0c718a`, the last commit on `main` before the redesign.
This branch adds only this note, which also keeps it safe from the "Prune
merged branches" workflow: that workflow deletes only branches whose commits
are all on `main`.

For a permanent marker, tag it from a machine that can push tags (the session
that made this branch could not):

    git tag archive-2026-11-12-classic f0c718a
    git push origin archive-2026-11-12-classic
