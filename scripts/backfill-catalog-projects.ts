/**
 * Backfill script: Populates catalog_projects table with existing data
 * Sources: prod API (dev 61) + project-queue.md
 *
 * Run: npx tsx scripts/backfill-catalog-projects.ts
 */

import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://grsfqivjxhgucowocoaf.supabase.co"
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!SUPABASE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY")
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Prod projects from dev 61 API (as of 2026-03-22)
const prodProjects = [
  { catalogId: 399, name: "Sansara Pandawa Residence", location: "Bali, Bukit, Pandawa" },
  { catalogId: 398, name: "Sunny Cuddles", location: "Bali, Canggu (Berawa)" },
  { catalogId: 397, name: "YOLLA Nyang Nyang Residence", location: "Bali, Pecatu, Uluwatu" },
]

// All done projects from project-queue.md
const queueProjects = [
  { queueNum: 1, name: "SANSARA PANDAWA", score: 15, iterations: 4, date: "2026-03-09", driveUrl: "https://drive.google.com/drive/folders/1GfOS-hNxKXBP3bslGTfoUA1KUTyURR3h", sheetsUrl: "https://docs.google.com/spreadsheets/d/1X5RvHbvgE_1eNoEbfaR1DHsRXmCS78xp/edit?gid=1060186887", prodId: 399 },
  { queueNum: 2, name: "Sunny Samudra", score: 13, iterations: 3, date: "2026-03-09", driveUrl: "https://drive.google.com/drive/folders/1_VZevTUTqExY1o82s2BxRAArUnP6c5Qp", sheetsUrl: "https://docs.google.com/spreadsheets/d/12BLaCyooz__PqXLXL8oj07WS4r3RtKnj1-Kkz8EbfTg/edit?gid=1606661580", prodId: null },
  { queueNum: 3, name: "Melasti Dream LOYO", score: 12, iterations: 2, date: "2026-03-10", driveUrl: null, sheetsUrl: "https://docs.google.com/spreadsheets/d/1qVnrTG-3_UHIexFcZ8sYRDYtFin_He7tDu5g9NE9pwg/edit?gid=1184391288", prodId: null },
  { queueNum: 4, name: "SAMOLET AURA", score: 11, iterations: 3, date: "2026-03-10", driveUrl: "https://drive.google.com/drive/folders/10WoeBa4lco2ScAGiioJqSqymCLHSVQ-L", sheetsUrl: null, prodId: null },
  { queueNum: 5, name: "LOYO Ubud Dream", score: 11, iterations: 3, date: "2026-03-10", driveUrl: null, sheetsUrl: "https://docs.google.com/spreadsheets/d/1qVnrTG-3_UHIexFcZ8sYRDYtFin_He7tDu5g9NE9pwg/edit?gid=448033896", prodId: null },
  { queueNum: 6, name: "Evdekimi Silawana", score: 11, iterations: 2, date: "2026-03-10", driveUrl: "https://drive.google.com/drive/folders/1s8iZZ-c4sgj6JrosLgk9sCsGLsS-NLEu", sheetsUrl: null, prodId: null },
  { queueNum: 7, name: "BIG WAVES (SALT)", score: 11, iterations: 2, date: "2026-03-10", driveUrl: "https://drive.google.com/drive/folders/18OyGd0RdrYtYyNsDbo-UVonXNufaoIMx", sheetsUrl: null, prodId: null },
  { queueNum: 8, name: "Lyvin ULUWATU", score: 11, iterations: 2, date: "2026-03-18", driveUrl: null, sheetsUrl: null, prodId: null, corrections: 8, rulesAdded: ["RULE-075", "RULE-076", "RULE-077", "RULE-078"] },
  { queueNum: 9, name: "Sunny Cuddles", score: 11, iterations: 2, date: "2026-03-11", driveUrl: "https://drive.google.com/drive/folders/1sdC19Y_O5_H-LtdwfiQQ_yunQFinUxUb", sheetsUrl: null, prodId: 398 },
  { queueNum: 11, name: "LOYO Green Village Apts", score: 11, iterations: 3, date: "2026-03-11", driveUrl: null, sheetsUrl: "https://docs.google.com/spreadsheets/d/1qVnrTG-3_UHIexFcZ8sYRDYtFin_He7tDu5g9NE9pwg/edit?gid=1726516389", prodId: null },
  { queueNum: 13, name: "ANTA MEDISPA", score: 9, iterations: 2, date: "2026-03-12", driveUrl: "https://drive.google.com/drive/folders/1Vrk7pCGyCP4URulccedYnhMEmba5nHyK", sheetsUrl: null, prodId: null },
  { queueNum: 14, name: "YOLLA Nyang Nyang", score: 9, iterations: 2, date: "2026-03-11", driveUrl: "https://drive.google.com/drive/folders/1_NbiU6z5TgoXqmUdYP_Kdp_SaxI9O_t8", sheetsUrl: null, prodId: 397 },
  { queueNum: 15, name: "Sunny LUMA", score: 9, iterations: 3, date: "2026-03-13", driveUrl: "https://drive.google.com/drive/folders/1xQ2LvCKw0BZsT-FVfIe9Of7Kh3tssLO3", sheetsUrl: null, prodId: null },
  { queueNum: 16, name: "HQC Ardhana", score: 8, iterations: 0, date: null, driveUrl: null, sheetsUrl: null, prodId: null, notes: "Gold standard #349 (local DB)" },
  { queueNum: 23, name: "RAMADA Encore", score: 7, iterations: 2, date: "2026-03-18", driveUrl: "https://drive.google.com/drive/folders/1Ugbi3iaJqUuBMjKZDIZIPdwtgUq9sUUN", sheetsUrl: null, prodId: null },
]

// Pending projects from queue (for tracking)
const pendingProjects = [
  { queueNum: 12, name: "LOYO Pandawa Dream", score: 10, sheetsUrl: "https://docs.google.com/spreadsheets/d/1qVnrTG-3_UHIexFcZ8sYRDYtFin_He7tDu5g9NE9pwg/edit?gid=1454365306", notes: "Awaiting data" },
  { queueNum: 17, name: "HQC Aravita", score: 8, notes: "Pending redo" },
  { queueNum: 18, name: "BREIG Edem II", score: 8, driveUrl: "https://drive.google.com/drive/u/0/folders/1viTxF_krxHDaaDXQchS12MCrpDr9zfaG", notes: "Pending redo" },
  { queueNum: 19, name: "BALI BAZA KEDUNGU", score: 8, notes: "No Drive (Pak Agent)" },
  { queueNum: 20, name: "Sunny Family Ubud", score: 8, driveUrl: "https://drive.google.com/drive/folders/1VwrJWeWod3txoidOIMspK3UX2ZBB7ldP", notes: "Awaiting data" },
]

async function backfill() {
  console.log("Starting backfill...")

  // Use a counter for local-only projects that don't have prod IDs
  // We'll use negative numbers as placeholders for local-only catalog IDs
  let localIdCounter = -1

  // 1. Insert done projects
  for (const p of queueProjects) {
    const catalogId = p.prodId ?? localIdCounter--
    const { error } = await supabase.from("catalog_projects").upsert({
      catalog_id: catalogId,
      name: p.name,
      location: prodProjects.find((pp) => pp.catalogId === p.prodId)?.location ?? "",
      status: "filled",
      fill_date: p.date ? new Date(p.date).toISOString() : null,
      fill_iterations: p.iterations,
      fill_corrections: (p as any).corrections ?? 0,
      rules_added: (p as any).rulesAdded ?? [],
      queue_score: p.score,
      notes: (p as any).notes ?? (p.prodId ? "On prod (dev 61)" : "Local DB only"),
      drive_folder_url: p.driveUrl ?? "",
      sheets_url: p.sheetsUrl ?? "",
    }, { onConflict: "catalog_id" })

    if (error) {
      console.error(`  FAIL: ${p.name} — ${error.message}`)
    } else {
      console.log(`  OK: ${p.name} (catalog_id=${catalogId})`)
    }

    // Add Drive folder as material if exists
    if (p.driveUrl) {
      await supabase.from("project_materials").insert({
        project_id: (await supabase.from("catalog_projects").select("id").eq("catalog_id", catalogId).single()).data?.id,
        type: "drive_folder",
        title: `${p.name} — Drive Folder`,
        url: p.driveUrl,
      })
    }

    // Add Sheets as material if exists
    if (p.sheetsUrl) {
      const projectRow = await supabase.from("catalog_projects").select("id").eq("catalog_id", catalogId).single()
      if (projectRow.data) {
        await supabase.from("project_materials").insert({
          project_id: projectRow.data.id,
          type: "spreadsheet",
          title: `${p.name} — Chess Board / Price List`,
          url: p.sheetsUrl,
        })

        // Also create a chess source entry
        await supabase.from("project_chess_sources").insert({
          project_id: projectRow.data.id,
          sheets_url: p.sheetsUrl,
        })
      }
    }

    // Add initial change log entry
    const projectRow = await supabase.from("catalog_projects").select("id").eq("catalog_id", catalogId).single()
    if (projectRow.data) {
      await supabase.from("project_change_log").insert({
        project_id: projectRow.data.id,
        source: "manual",
        action: "backfill",
        summary: `Backfilled from project queue. ${p.iterations} iterations${(p as any).corrections ? `, ${(p as any).corrections} corrections` : ""}.`,
        diff: { queue_num: p.queueNum, score: p.score, prod_id: p.prodId },
      })
    }
  }

  // 2. Insert pending projects
  for (const p of pendingProjects) {
    const catalogId = localIdCounter--
    const { error } = await supabase.from("catalog_projects").upsert({
      catalog_id: catalogId,
      name: p.name,
      status: "pending",
      queue_score: p.score,
      notes: p.notes ?? "",
      drive_folder_url: (p as any).driveUrl ?? "",
      sheets_url: (p as any).sheetsUrl ?? "",
    }, { onConflict: "catalog_id" })

    if (error) {
      console.error(`  FAIL (pending): ${p.name} — ${error.message}`)
    } else {
      console.log(`  OK (pending): ${p.name}`)
    }
  }

  console.log("\nBackfill complete!")
  console.log(`  Done: ${queueProjects.length} projects`)
  console.log(`  Pending: ${pendingProjects.length} projects`)
}

backfill().catch(console.error)
