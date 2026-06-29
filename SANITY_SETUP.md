# OBMP content editing (Sanity) — setup

This lets your brother edit the site from a friendly dashboard. His changes
appear on the live site **without any redeploy or code changes**. Until it's set
up (or for any section not yet connected), the site shows its built-in content,
so nothing ever breaks.

Right now the **Fleet** section is wired to Sanity as the working template.
Once you confirm it works, I'll connect Services, Team, About, and Hero/Contact
the same way.

---

## A. Create the Sanity project (one time, ~3 min)

1. Go to **sanity.io** and sign up (free).
2. Create a **new project** → name it "Ocean-Bay Marine & Petroleum", dataset
   name **production**.
3. Open **manage.sanity.io** → your project → copy the **Project ID**.
4. Make the dataset readable by the website:
   - **Datasets** → set `production` to **Public** (marketing content, fine to be public), **and**
   - **API → CORS origins** → **Add origin** `https://obmp.vercel.app` (and your
     custom domain later). Leave "Allow credentials" off.

## B. Connect the website (reads)

1. In **Vercel** → your project → **Settings → Environment Variables**, add:
   - `VITE_SANITY_PROJECT_ID` = *your project id*
   - `VITE_SANITY_DATASET` = `production`
2. **Redeploy** (Deployments → ⋯ → Redeploy, or push any commit).
3. For local `npm run dev`, create a file named `.env` in the project root with
   the same two lines (it's git-ignored):
   ```
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   ```

## C. Deploy the Studio (the editor your brother uses)

In a terminal:

```bash
cd studio
npm install
npx sanity login              # sign in with the same Sanity account
```

Then open **`studio/projectId.js`** and paste your Project ID (replace
`REPLACE_WITH_PROJECT_ID`). Save, then:

```bash
npx sanity deploy             # pick a hostname, e.g. "oceanbay"
```

This publishes the editor at a URL like **https://oceanbay.sanity.studio**.
Share that link with your brother — he logs in and edits there.

## D. Add content

In the Studio, create **Fleet vessel** entries (name, type, flag line, photo,
specs, display order) and **Publish**. The site's Fleet section shows them on the
next page load — no redeploy needed. Add the real **MT Ocean Bay** name and an
**MT Crazy** photo here whenever you have them.

---

### Notes
- The schemas for **Services, Team, Core Values, and Site Settings (hero +
  contact)** are already in the Studio — they'll appear as editable types. I'll
  connect them to the site after Fleet is confirmed.
- Keep the dataset **public** for the simplest setup (no secret token in the
  browser). If you'd rather keep it private, tell me and I'll switch reads to a
  read-only token.
