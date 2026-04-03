#!/bin/bash
# Import projects from Notion into Supabase catalog_projects
# Creates missing developers first, then inserts new projects

ACCESS_TOKEN=$(cat ~/.claude/mcp.json | python3 -c "import json,sys; d=json.load(sys.stdin); args=d['mcpServers']['supabase']['args']; i=args.index('--access-token'); print(args[i+1])")
API="https://api.supabase.com/v1/projects/grsfqivjxhgucowocoaf/database/query"

run_sql() {
  curl -s -X POST "$API" \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"query\": \"$1\"}"
}

echo "=== Step 1: Create missing developers ==="

# New developers to create (those not already in the developers table)
NEW_DEVS=(
  "Aura Investment"
  "Bali Balance"
  "Bali Capital Group"
  "Bali Invest Club"
  "Balimass"
  "Dolphin Hill"
  "Elysium Group Bali"
  "Emybali"
  "Evdekimi"
  "Oakwood"
  "Our Place Invest"
  "Pintu Development"
  "Prana Home"
  "Pulau"
  "Solace"
  "Swatch Development"
  "White Development"
  "Young Properties"
)

CREATED_DEVS=()
for dev in "${NEW_DEVS[@]}"; do
  # Check if exists (case-insensitive)
  EXISTS=$(run_sql "SELECT id FROM developers WHERE lower(name) = lower('${dev//\'/\'\'}')" | python3 -c "import json,sys; d=json.load(sys.stdin); print(len(d))" 2>/dev/null)
  if [ "$EXISTS" = "0" ]; then
    echo "  Creating: $dev"
    run_sql "INSERT INTO developers (name, origin_tag, research_status, sales_status) VALUES ('${dev//\'/\'\'}', 'int', 'not_started', 'lead')" > /dev/null
    CREATED_DEVS+=("$dev")
  else
    echo "  Already exists: $dev"
  fi
  sleep 0.3
done

echo ""
echo "Created ${#CREATED_DEVS[@]} new developers:"
for d in "${CREATED_DEVS[@]}"; do echo "  + $d"; done

echo ""
echo "=== Step 2: Refresh developer map ==="
DEVS=$(run_sql "SELECT id, name FROM developers ORDER BY name")
echo "Total developers: $(echo "$DEVS" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))")"

echo ""
echo "=== Step 3: Get existing project names ==="
EXISTING=$(run_sql "SELECT lower(trim(name)) as name FROM catalog_projects")

echo ""
echo "=== Step 4: Import projects ==="

python3 << 'PYEOF'
import json, os, subprocess, time

# Load developer map
devs_raw = json.loads(os.popen("cat /dev/stdin").read()) if False else []
# We'll read from files
import sys

PYEOF

# Actually, let's do this all in python with the access token
python3 - "$ACCESS_TOKEN" << 'PYEOF'
import json, sys, urllib.request, urllib.error, time

ACCESS_TOKEN = sys.argv[1]
API = "https://api.supabase.com/v1/projects/grsfqivjxhgucowocoaf/database/query"

def run_sql(query):
    data = json.dumps({"query": query}).encode()
    req = urllib.request.Request(API, data=data, method="POST", headers={
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    })
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        print(f"SQL Error: {err[:200]}")
        return None

# Developer name mapping
NOTION_TO_SUPABASE = {
    "Sunny": "Sunny Development Group",
    "Taryan": "Taryan Group",
    "Cube Group": "CUBE Development",
    "Baza": "BAZA Development",
    "Tamora": "Tamora Group",
    "Stetsyuk": "Stetsyuk Development",
    "HQC": "High Quality Construction",
    "NOVO Development": "Novo Development",
    "618 Developments": "618 Development",
    "Mirah": "Mirah Investment & Development",
    "Mirah I&D": "Mirah Investment & Development",
    "Bali Invesments": "Bali Investments",
    "Lyvin": "Lyvin Properties",
    "Avalon": "Avalon Bali Group",
    "Predmet": "Predmet Construction",
    "Coco": "Coco Development Group",
    "Nuanu": "Nuanu Creative City",
    "Unit": "Unit Space",
    "Oxo": "OXO Living",
    "Azimut": "Azimut Development",
    "Yolla Development": "Yolla Group",
    "Yolla": "Yolla Group",
    "Bali Baza": "BAZA Development",
    "Anta": "Anta Group",
    "LOYO": "Loyo & Bondar Group",
    "Archestet": "ARCHESTET",
    "Oceaniq": "OceaniQ Villas",
    "Pertama": "Pertama Property",
    "Ecolit": "Ecolit Group / Sansara Development",
    "Vibe": "Vibe Development",
    "Arya": "Arya Properties",
    "Iji": "IJI Group",
    "Feels": "Feeels Development",
    "PCE": "Premier Global Development",
    "Almal": "Almal",
}

# Get fresh developer map
time.sleep(1)
devs = run_sql("SELECT id, name FROM developers")
dev_map = {d['name']: d['id'] for d in (devs or [])}

# Get existing project names
time.sleep(0.5)
existing = run_sql("SELECT lower(trim(name)) as name FROM catalog_projects")
existing_names = set(p['name'] for p in (existing or []))

def resolve_dev(notion_name):
    supa_name = NOTION_TO_SUPABASE.get(notion_name, notion_name)
    return supa_name, dev_map.get(supa_name)

def esc(s):
    if s is None: return "NULL"
    return "'" + s.replace("'", "''").strip() + "'"

# All 116 projects
projects = [
    ("Ananti", "Oakwood", "https://drive.google.com/drive/folders/1BYaWs2md_x_GucK9SXznpzmsyrwXhVzc", "https://drive.google.com/drive/folders/1BYaWs2md_x_GucK9SXznpzmsyrwXhVzc"),
    ("Sunny Nine", "Sunny", "https://drive.google.com/drive/folders/1ZsCXaFnvPf3zwSSdw-MqjGamURJB0eYP", "https://docs.google.com/spreadsheets/d/12BLaCyooz__PqXLXL8oj07WS4r3RtKnj1-Kkz8EbfTg/edit?gid=1440602102#gid=1440602102"),
    ("Anantara Dragon", "Taryan", "https://taryandragon.partners/", "https://drive.google.com/drive/u/1/folders/1CPVWlHpBeEg1KqfKbOgn32uaxZHNJr1e"),
    ("Cube Apartment", "Cube Group", "https://drive.google.com/file/d/1OYsCyg78xmKgPUTsVfSB7JsRkw8aEBCl/view?usp=sharing", None),
    ("Aura", "Aura Investment", "https://drive.google.com/drive/folders/1bs75aWOiuc4ImyBSLQs2QnyFlAgDPczY", "https://docs.google.com/spreadsheets/d/1LzfO-EVrHeQ6YLlR9oOROvq4-4DWWMwA/edit?gid=116629617#gid=116629617"),
    ("Baza Kedungu", "Baza", "https://drive.google.com/drive/folders/1iTcwBnRFL6WgNoanjZUtAscShj2Od8Dx", "https://docs.google.com/spreadsheets/d/1TWbIAHCWka3ChmSxnl_n1brWpvHWygSgQygDn7SoKMI/edit?gid=849122232#gid=849122232"),
    ("Silk Villas", "Pintu Development", "https://drive.google.com/drive/folders/12vjmbr5yHOyshNKE9hn6BOgPLaswrtAh", "https://drive.google.com/file/d/17bWaO-diWrEgSbCE0fT_vaataVRaWuIA/view"),
    ("Dolphin Hill", "Dolphin Hill", "https://drive.google.com/drive/folders/1Fhbv0KACMueAbntBJ2c1v62Sw5AafZn8", "https://docs.google.com/spreadsheets/d/1b3ddis9CEclT5f6N53Jmnfc3JMOmo30UdqxbUzxatEg/edit?gid=780064528#gid=780064528"),
    ("Nyang Nyang Beach Villas", "Swatch Development", "https://drive.google.com/drive/folders/1J8vkLgsHmUoezgStps14OjL_CCKzWoMj", "https://docs.google.com/spreadsheets/d/1uMvYnieLx-IMEqmHmpFBzY4H3NSHibLC/edit"),
    ("KAMMORA LIVING", "Bali Invest Club", "https://drive.google.com/drive/u/1/folders/1REbArQRAPCioYy0uo8qELSt6P5sKXHcr", None),
    ("Nava Tamora", "Tamora", "https://drive.google.com/drive/folders/1qP1dx8m9iBrc2wqV1uBbJgVX1AsqrqOX", "https://drive.google.com/drive/folders/16O-jZnUCFrJ_RZ-UsF9D28Ls-Yj0vLZz"),
    ("Five Oceans", "Stetsyuk", "https://docs.google.com/spreadsheets/d/1i6VH_AnxsvrjYKVQMW9qRoyCqmhEoe9V-78t5C5YmfY/edit", "https://docs.google.com/spreadsheets/d/14pVs1Lhp-mtTdr_tdOECTwpbI8ERrHI6oMJGOAApwFY/edit"),
    ("BLOOM", "HQC", "https://hqc-agent.pro/bloomen", "https://docs.google.com/spreadsheets/d/1jTkuDTSCgKdU-wSVwI68SVMA514hNWFgVJWHhd2l1rA/edit"),
    ("APURA VILLAS", "NOVO Development", "https://docs.google.com/spreadsheets/d/1P-ASc1ofzvshajMBv3lXTIlMu63CZ2yvDp6d23jyh_E/edit", "https://docs.google.com/spreadsheets/d/1P-ASc1ofzvshajMBv3lXTIlMu63CZ2yvDp6d23jyh_E/edit"),
    ("The Point Villas", "Art Villas Bali", "https://docs.google.com/spreadsheets/d/1Fqz4xRTiDjpi0LAQyPpSn0urCSQD-ICuhyABHsRvyQ8/edit", "https://drive.google.com/file/d/11fmuIjz5rHsi27zB3WU-QTjLEA55W2so/view"),
    ("Flower Estates", "618 Developments", "https://drive.google.com/drive/folders/1NDrFe2Luu1KiX_pudH8C1B6rD0t5s6Vz", None),
    ("Scorpia", "Elysium Group Bali", "https://docs.google.com/spreadsheets/d/1d7a3ujevSyvjS_Sr9D2sBINUZffkH_ogqrqOS1biOKs/edit", "https://checkered-twister-bc5.notion.site/elysiumgroupbali"),
    ("Finns", "Mirah", "https://drive.google.com/drive/folders/1q8azs-g49QpOMrO8vDk0qbyRuznnOv1p", "https://docs.google.com/spreadsheets/d/1gTYJyafTP5JY-ZW3eKr8KqmOvWCmSFXH/edit"),
    ("Canggu Secrets Apartments", "Bali Investments", "https://drive.google.com/drive/folders/1-BCn1H3ToWk7aeaS3UqzPhgxRdizA3ak", "https://docs.google.com/spreadsheets/d/1fGO_mbGJWICXUtTw2vQkqkqr9nddOtn3NiUMpt2AgmU/edit"),
    ("GARDENS", "Lyvin", "https://drive.google.com/drive/folders/10jy9ZxOJXJXUvP_kWLYB-qHw597PCcSm", "https://docs.google.com/spreadsheets/d/1ZBD4yL8S741GNqSUYoxufG4GT3Zvexd2lZd1kTxczXE/edit"),
    ("ART Boutique Hotel", "Bali Invesments", "https://drive.google.com/drive/folders/1Rsyhnwwn7nH6b3nbD2gBqsQaLzMvaG1l", "https://docs.google.com/spreadsheets/d/1fGO_mbGJWICXUtTw2vQkqkqr9nddOtn3NiUMpt2AgmU/edit"),
    ("TAO Club House", "Avalon", "https://partners.avalonbali.com/tao-en", "https://docs.google.com/spreadsheets/d/1k-n6w3qQnSz6W22NajnwaJD7nMMECBQT/edit"),
    ("Sunny Wellness SPA", "Sunny", "https://drive.google.com/drive/folders/11pdxWbAnPYL-8lefmcxPAKNb8zZW5cd3", "https://docs.google.com/spreadsheets/d/12BLaCyooz__PqXLXL8oj07WS4r3RtKnj1-Kkz8EbfTg/edit"),
    ("Sunny Ocean View", "Sunny", "https://drive.google.com/drive/folders/1_VZevTUTqExY1o82s2BxRAArUnP6c5Qp", "https://docs.google.com/spreadsheets/d/12BLaCyooz__PqXLXL8oj07WS4r3RtKnj1-Kkz8EbfTg/edit"),
    ("Sunny Muse", "Sunny", "https://drive.google.com/drive/folders/1sPCXg-9ySb9fqLYlarvf63iPCTrCgc3I", "https://docs.google.com/spreadsheets/d/12BLaCyooz__PqXLXL8oj07WS4r3RtKnj1-Kkz8EbfTg/edit"),
    ("SOMOSHOTELS", "Mirah", "https://drive.google.com/drive/folders/1q8azs-g49QpOMrO8vDk0qbyRuznnOv1p", "https://docs.google.com/spreadsheets/d/1gTYJyafTP5JY-ZW3eKr8KqmOvWCmSFXH/edit"),
    ("Predmet Cemagi", "Predmet", "https://drive.google.com/drive/folders/1h-5j9wBZ2pss6r2JH-chIuhjqNJOKh8R", "https://docs.google.com/spreadsheets/d/1rNEXqfm3I6phkeu0J4uUbiozL0k2zthFV613j431410/edit"),
    ("AZORIA", "Coco", "https://imminent-saltopus-650.notion.site/Eng-COCO-Development-Group-1c21022d119780019c26d6ac9512e68b", "https://docs.google.com/spreadsheets/d/1knQUEpDQQUfZxT5Ds-XFC8ZT41LBYUaNpTWDJEtBx48/edit"),
    ("Xhotelnuanu", "Nuanu", "https://xhotelnuanu.notion.site/x-hotel-nuanu", None),
    ("Sacred Jungle Ubud", "Evdekimi", None, "https://docs.google.com/spreadsheets/d/1yf0eQVMHS48v8l1Krt2raLNKKhWSewo-7fIzTn1kJqg/edit"),
    ("Pererenan Gate", "White Development", "https://drive.google.com/drive/folders/1hcq-oAllDHyTwltAwMCgJaloRLMOhba3", "https://docs.google.com/spreadsheets/d/1wwpPOzVzP8uHOJT3UnTdx5pVOpK5oaHLPwksbPM6Tps/edit"),
    ("Berawa Sunny Village", "Sunny", "https://drive.google.com/drive/folders/1Wyfv_MIoyPDe1jXfBVr9fPf2ca2-0qIS", "https://docs.google.com/spreadsheets/d/12BLaCyooz__PqXLXL8oj07WS4r3RtKnj1-Kkz8EbfTg/edit"),
    ("Sunny Appart 1", "Sunny", "https://drive.google.com/drive/folders/1Bn6i1KmLoVfYB2XHzfaQi2NklaFQkWOK", "https://docs.google.com/spreadsheets/d/12BLaCyooz__PqXLXL8oj07WS4r3RtKnj1-Kkz8EbfTg/edit"),
    ("Melasti Villas BB", "Bali Balance", "https://drive.google.com/drive/folders/1bRACvHX5cZPoRM5Kp_KbRQ04ScQkCCL7", "https://docs.google.com/spreadsheets/d/1RrSZfwYjcaUw4ltr7H4_HV2l4IiRSeutVSgT2wFTkGg/edit"),
    ("Eight", "Feels", "https://drive.google.com/drive/u/0/folders/11-BFUgvHrRDQj0bbq7s83REWjbLZTCG1", "https://docs.google.com/spreadsheets/d/1-Vsjey0CPjrZt_wUZSHipy-4yiNrgzUfmWWICT6euB4/edit"),
    ("De Vello", "Mirah", "https://drive.google.com/drive/folders/1q8azs-g49QpOMrO8vDk0qbyRuznnOv1p", "https://docs.google.com/spreadsheets/d/1gTYJyafTP5JY-ZW3eKr8KqmOvWCmSFXH/edit"),
    ("TEN Villas Ubud", "Bali Invesments", "https://drive.google.com/drive/folders/102lgKltHf4yd5mdQvpOVjnYgfayx0Q0B", "https://docs.google.com/spreadsheets/d/1fGO_mbGJWICXUtTw2vQkqkqr9nddOtn3NiUMpt2AgmU/edit"),
    ("Eighth Sense", "Iji", "https://drive.google.com/drive/folders/15MMlJ5KbqnUJ6_OEe40WcHDLcz2zdRWl", "https://docs.google.com/spreadsheets/d/1oPfSHkv6gPrK2FookD0oaZmg6akkIlklIMhIT_Zv1qY/edit"),
    ("NOVO UBUD", "NOVO Development", "https://docs.google.com/spreadsheets/d/1P-ASc1ofzvshajMBv3lXTIlMu63CZ2yvDp6d23jyh_E/edit", "https://docs.google.com/spreadsheets/d/1P-ASc1ofzvshajMBv3lXTIlMu63CZ2yvDp6d23jyh_E/edit"),
    ("Sanur Vibe Apartments", "Vibe", "https://vibedevelopment.pro/project/sanur-vibe-apartments", "https://vibedevelopment.pro/project/sanur-vibe-apartments"),
    ("Makalu Villas", "Swatch Development", "https://drive.google.com/drive/folders/1zWIBJ0TaPEiuywDj62eaUJ2GzumG4Yja", "https://docs.google.com/spreadsheets/d/1uMvYnieLx-IMEqmHmpFBzY4H3NSHibLC/edit"),
    ("Coco Hills", "Coco", "https://docs.google.com/spreadsheets/d/1bQ348nVHZJuxFRtdQF-pLIpaeEvJlDwGHg5B8Hb76Zc/edit", "https://docs.google.com/spreadsheets/d/12FKKwL6pD5RF0i0_gUv1irfpLqDO93FRllSt56k-CpU/edit"),
    ("Oceaniq 2", "Oceaniq", "https://drive.google.com/drive/folders/1uskfiZjJFN3Nakw53MkjUywxTm60FfX_", "https://oceaniq-nusadua.com/genplan/"),
    ("Unit Space U3", "Unit", "https://momofdragons.notion.site/5daef127be834b829ef52f0aa244fae7", "https://docs.google.com/spreadsheets/d/1g58AS0sl3X8GAxtUnX3QGwbx_hxRBl3vzc4vhSckRoI/edit"),
    ("The One", "Almal", "https://www.almal-investments.com/the-one-bali-sales", "https://almal-investments.g-plus.site/"),
    ("Amali Luxury Residence", "Mirah", "https://drive.google.com/drive/folders/1q8azs-g49QpOMrO8vDk0qbyRuznnOv1p", "https://docs.google.com/spreadsheets/d/1gTYJyafTP5JY-ZW3eKr8KqmOvWCmSFXH/edit"),
    ("Kuara Lombok", "Mirah", "https://drive.google.com/drive/folders/1q8azs-g49QpOMrO8vDk0qbyRuznnOv1p", "https://docs.google.com/spreadsheets/d/1gTYJyafTP5JY-ZW3eKr8KqmOvWCmSFXH/edit"),
    ("OceaniQ Nusa Penida", "Oceaniq", "https://drive.google.com/drive/folders/1Ns1ktWzNNpn-OLZEaFuXUm3fPwBMNDiT", "https://oceaniq-nusapenida.com/genplan/"),
    ("Black Sands Oasis", "Unit", "https://partners.unit.now/ru/knowledge/article/83", "https://docs.google.com/spreadsheets/d/1CUzlCHQUbySVNyJy3Xp16Okgec1Ic9dlIKgsLvzvCm8/edit"),
    ("Ema Villas", "Art Villas Bali", "https://docs.google.com/spreadsheets/d/1Fqz4xRTiDjpi0LAQyPpSn0urCSQD-ICuhyABHsRvyQ8/edit", "https://drive.google.com/drive/folders/112mD-XzYW70ztHVQ_KTXcaFBKfWBRX0s"),
    ("Predmet Cascade", "Predmet", "https://drive.google.com/drive/folders/1lZmIStCRCgE__mKnAcaMHoz9Z-drtNye", "https://docs.google.com/spreadsheets/d/1yy98fYnKi4-xGFGIPSVkJw3dAEZlbJjw/edit"),
    ("Bellevue Villa Complex", "Young Properties", "https://drive.google.com/drive/folders/1ArTOCHga5dnwCgZvv3jsOekhdzyF_LBN", "https://drive.google.com/drive/folders/1f_rm3OgMhcVm4UErMeVGDrT6TNRE37Oo"),
    ("White Palm", "Archestet", "https://drive.google.com/drive/folders/1FbpaJUo_tSLOrygwnAW-48bMcdYMJc-w", "https://docs.google.com/spreadsheets/d/1zWN009_kIOELo1EPmajjF8WKABZ68X0_Yf9J1LlcPt0/edit"),
    ("Habbi", "Balimass", "https://www.notion.so/balimassinvest/Habbi-Melasti-Residence-217b839c76fa80b7af64fff2d6a76807", "https://docs.google.com/spreadsheets/d/1Zhbghv-PMR63EzkZO5I7s8dL7lpAqg_Xxc-7hNIxSa8/edit"),
    ("Oceaniq 1", "Oceaniq", "https://drive.google.com/drive/folders/1jICtZtcOLZzy_XY1OW_ePFAqcmxUc-RA", "https://oceaniqvillas.com/genplan/"),
    ("Origins", "Bali Baza", "https://drive.google.com/drive/folders/1GBbyoMYol_qjsnWeuunI15wMBXSPc-s1", "https://docs.google.com/spreadsheets/d/1TWbIAHCWka3ChmSxnl_n1brWpvHWygSgQygDn7SoKMI/edit"),
    ("Sol", "Bali Capital Group", "https://drive.google.com/drive/folders/1zOikphAVYCYdA2YHQnJZrTjApkiUFEEC", "https://docs.google.com/spreadsheets/d/1GWHXB0RXf7AP6xvOBD066qTG3MlqSmDZHn-1XWx0s14/edit"),
    ("Ardhana", "HQC", "https://hqc-agent.pro/ardhanaresidenceen", "https://docs.google.com/spreadsheets/d/1Dub6fRbuB9B2YhUKgpdo-76DJAUypBGUUhAzrmLO4gA/edit"),
    ("Zamaya", "Elysium Group Bali", "https://docs.google.com/spreadsheets/d/1d7a3ujevSyvjS_Sr9D2sBINUZffkH_ogqrqOS1biOKs/edit", "https://checkered-twister-bc5.notion.site/elysiumgroupbali"),
    ("ARYA Sumba", "Arya", None, None),
    ("Village", "ADVA", "https://docs.google.com/spreadsheets/d/1mhln25Ukh-6Dw7JGXbtGwRmka5bdjOfQMW5mnXpahA8/edit", "https://docs.google.com/spreadsheets/d/1PdxdukH8gMvP5zQo8RE4RrjkcSXAKA6rPEevHfRdlfs/edit"),
    ("Ubud City Renaissance Residence", "Bali Capital Group", "https://balicapitalbook.notion.site/Bali-Capital-Group-Partners-151f17a5fd0680bca806e47702b87106", "https://docs.google.com/spreadsheets/d/1m7vUR8SWUMpYSxR4TXMELmuDWvw3eSkKPo20J6NJeX4/edit"),
    ("The Heights", "Theia", "https://accurate-suede-3dd.notion.site/The-Heights-24f8b87a5b14802ab516ce540baec12d", "https://residence.theheights.io/board/112881"),
    ("Unit Space U1", "Unit", "https://momofdragons.notion.site/5daef127be834b829ef52f0aa244fae7", "https://docs.google.com/spreadsheets/d/1g58AS0sl3X8GAxtUnX3QGwbx_hxRBl3vzc4vhSckRoI/edit"),
    ("The Residences", "Oxo", "https://drive.google.com/drive/folders/1K-0HwW5VcUGSgnv28ETwad796i3AJ7B7", "https://oxoliving.notion.site/AGENTS-2262fa4a3dd98042a3a1ce48af5755bc"),
    ("Nagaya Apartments", "Bali Capital Group", "https://balicapitalbook.notion.site/Bali-Capital-Group-Partners-151f17a5fd0680bca806e47702b87106", "https://docs.google.com/spreadsheets/d/1YSWjc1IY9VMkbnshHgh3gx4OKpKMDQFtuwmzApAMsOg/edit"),
    ("Secana", "Mirah", "https://drive.google.com/drive/folders/1q8azs-g49QpOMrO8vDk0qbyRuznnOv1p", "https://docs.google.com/spreadsheets/d/1gTYJyafTP5JY-ZW3eKr8KqmOvWCmSFXH/edit"),
    ("Melasti Apartments", "Lyvin", "https://drive.google.com/drive/folders/1m7TzbgCrzMsKP307ekCPADdiFZWsg9h1", "https://docs.google.com/spreadsheets/d/1ZBD4yL8S741GNqSUYoxufG4GT3Zvexd2lZd1kTxczXE/edit"),
    ("Suweta Complex", "Evdekimi", None, "https://docs.google.com/spreadsheets/d/1yf0eQVMHS48v8l1Krt2raLNKKhWSewo-7fIzTn1kJqg/edit"),
    ("Gate 11", "Bali Baza", "https://drive.google.com/drive/folders/1OzgLyUfn3rlWoXIeU2ijjLmw14WGuvKA", "https://docs.google.com/spreadsheets/d/1TWbIAHCWka3ChmSxnl_n1brWpvHWygSgQygDn7SoKMI/edit"),
    ("Sunny Village Batu Bolong", "Sunny", "https://drive.google.com/drive/folders/1rgBO6g6piFr2xeQTnjDooBpAnEx_4HNN", "https://docs.google.com/spreadsheets/d/12BLaCyooz__PqXLXL8oj07WS4r3RtKnj1-Kkz8EbfTg/edit"),
    ("Bali Hills Batu Bolong", "Azimut", "https://crawling-technician-cfb.notion.site/19b84c01f732808888e7c82e56bf1752", "https://docs.google.com/spreadsheets/d/1E7fyNX631PVT6m0HUcJBdx3fkIqZgFUK/edit"),
    ("Kiara Beachfront", "Mirah", "https://drive.google.com/drive/folders/1q8azs-g49QpOMrO8vDk0qbyRuznnOv1p", "https://docs.google.com/spreadsheets/d/1gTYJyafTP5JY-ZW3eKr8KqmOvWCmSFXH/edit"),
    ("Ubud City", "Bali Capital Group", "https://balicapitalbook.notion.site/Bali-Capital-Group-Partners-151f17a5fd0680bca806e47702b87106", None),
    ("Bingin Residence II", "Yolla Development", "https://drive.google.com/drive/folders/1-J2Lsku8TkNsNQS1MsD6KUStaMFnx8t8", "https://drive.google.com/file/d/1Hj5Od4p_sF_8Q31zYKgsZFkd6Z8zrGpq/view"),
    ("Ubud Central Oasis", "Bali Capital Group", "https://balicapitalbook.notion.site/Bali-Capital-Group-Partners-151f17a5fd0680bca806e47702b87106", "https://docs.google.com/spreadsheets/d/1YSWjc1IY9VMkbnshHgh3gx4OKpKMDQFtuwmzApAMsOg/edit"),
    ("The Pavilions", "Oxo", "https://drive.google.com/drive/folders/15Rkq_b_aUVvl3gSQk3DysEYXFauguIUZ", "https://oxoliving.notion.site/AGENTS-2262fa4a3dd98042a3a1ce48af5755bc"),
    ("Nyang Nyang Inanna Residence", "Yolla Development", "https://drive.google.com/drive/folders/1-bqSC77iS81eIyM7cMzUA_WfHAcRl35v", "https://drive.google.com/file/d/1Hj5Od4p_sF_8Q31zYKgsZFkd6Z8zrGpq/view"),
    ("Emy Terra", "Emybali", "https://drive.google.com/drive/folders/1Hiq4Wiejrc7qsDoPwCdFietRqy9lN4yo", "https://docs.google.com/spreadsheets/d/1DqILnvarTRliO4JP_hV0ENRIZ4kOuxdkZIC34mllHyk/edit"),
    ("Sunset Village", "Bali Baza", "https://drive.google.com/drive/folders/1i-cf4EcHS5pHUiJP7tvALoHsQLpRNwki", "https://docs.google.com/spreadsheets/d/1TWbIAHCWka3ChmSxnl_n1brWpvHWygSgQygDn7SoKMI/edit"),
    ("Anta Residence Canggu", "Anta", "https://drive.google.com/drive/folders/1dbhOR518i-Rey9foaP3UJ1o7fP7Oij7R", "https://docs.google.com/spreadsheets/d/1bYDJsgyTO4oO3hc6j9t_mx0mZyMRFEH7eDCFd12XLC0/edit"),
    ("Dreamland", "Feels", "https://drive.google.com/drive/u/0/folders/1YMc_iQY7ebt38VRz-5P_LPN9ozb9oxmA", "https://docs.google.com/spreadsheets/d/1-Vsjey0CPjrZt_wUZSHipy-4yiNrgzUfmWWICT6euB4/edit"),
    ("Pandawa Dream", "LOYO", "https://loyobondar.notion.site/Pandawa-Dream-22aaf03a590281c49ba4e3b092b475e7", "https://docs.google.com/spreadsheets/d/1qVnrTG-3_UHIexFcZ8sYRDYtFin_He7tDu5g9NE9pwg/preview"),
    ("Nila Residence", "Mirah I&D", "https://drive.google.com/drive/folders/1q8azs-g49QpOMrO8vDk0qbyRuznnOv1p", "https://docs.google.com/spreadsheets/d/1gTYJyafTP5JY-ZW3eKr8KqmOvWCmSFXH/edit"),
    ("Smart Villas Club", "Our Place Invest", "https://drive.google.com/drive/folders/1IHP_kJWtklkSiaSFKoJyCjBL-YAY33HL", "https://smart-villas.g-plus.site/"),
    ("Sunny Apart 2", "Sunny", "https://drive.google.com/drive/folders/1IFZbNAalONZvdwsJWN8IneUXMh2NwhBH", "https://docs.google.com/spreadsheets/d/12BLaCyooz__PqXLXL8oj07WS4r3RtKnj1-Kkz8EbfTg/edit"),
    ("Beraban Luxury Lofts", "Pertama", "https://docs.google.com/spreadsheets/d/1vv-zzAVYaHmLkWNNgIKuhHg99hYzA3xeaGwn_gcrAjQ/edit", "https://docs.google.com/spreadsheets/d/1vv-zzAVYaHmLkWNNgIKuhHg99hYzA3xeaGwn_gcrAjQ/edit"),
    ("Bingin Palm Residence 1", "Yolla", "https://drive.google.com/drive/folders/19FQXjTy6TnWe_UQRLD8DAhh2okEH9nC8", "https://drive.google.com/file/d/1Hj5Od4p_sF_8Q31zYKgsZFkd6Z8zrGpq/view"),
    ("SATORI Nusa Dua Resort", "HQC", "https://hqc-agent.pro/satorien", "https://docs.google.com/spreadsheets/d/1w7GdhMB8bFjlx-hdfIIcEeGggXqAi12b5KmiiCf8on8/edit"),
    ("Pandawa Residence", "Ecolit", "https://drive.google.com/drive/folders/1wwXepNiAEEv_GVC3gKstX8bp5WBJZtuh", "https://pandawa-residence.com/ru/genplan/#/"),
    ("The Bank", "Oxo", "https://drive.google.com/drive/folders/1og3tKylfSNcgl0WHaftJi7P85HcbdRoa", "https://oxoliving.notion.site/AGENTS-2262fa4a3dd98042a3a1ce48af5755bc"),
    ("Pulau", "Pulau", "https://drive.google.com/drive/u/0/folders/1NKcJtrisCOL8GRa88u_qOTd-2LrXY-Ah", "https://drive.google.com/drive/folders/1RPzwz18JwJVhZLcYK2GQHZeXoad9i2ox"),
    ("Solace", "Solace", "https://solacedg.com/solace_residence/", None),
    ("Cocana Resort", "Mirah", "https://drive.google.com/drive/folders/1q8azs-g49QpOMrO8vDk0qbyRuznnOv1p", "https://docs.google.com/spreadsheets/d/1gTYJyafTP5JY-ZW3eKr8KqmOvWCmSFXH/edit"),
    ("OM Club House", "Avalon", "https://partners.avalonbali.com/om-en", "https://docs.google.com/spreadsheets/d/1mRcEfQhlTkXBTIs1svla-9EBCJXZbg6A/edit"),
    ("Green Village Villas", "LOYO", "https://docs.google.com/spreadsheets/d/1qVnrTG-3_UHIexFcZ8sYRDYtFin_He7tDu5g9NE9pwg/preview", "https://docs.google.com/spreadsheets/d/1qVnrTG-3_UHIexFcZ8sYRDYtFin_He7tDu5g9NE9pwg/preview"),
    ("Y-WAY Boutique Hotel", "PCE", "https://drive.google.com/drive/folders/14KTxn7IPROb9DLV-nByQsq5menjP3VeX", "https://docs.google.com/spreadsheets/d/1HyGi0657Lm-T-_l35xL6xQnveGfgW4lYffWXw3zvw28/edit"),
    ("Maya", "Solace", "https://solacedg.com/maya_residence/", None),
    ("Azura", "Vibe", None, None),
    ("Bubbles", "Bali Baza", "https://drive.google.com/drive/folders/1oVRqyPeXH00mC8aBCd7Dyz_7OhSVmCup", "https://docs.google.com/spreadsheets/d/1TWbIAHCWka3ChmSxnl_n1brWpvHWygSgQygDn7SoKMI/edit"),
    ("VIRGIN BEACH II", "Prana Home", "https://drive.google.com/drive/folders/1cQY9urtQNfXSgD9Ub3G8aHVpcPZAoAyn", "https://docs.google.com/spreadsheets/d/1v8df9e2Dpyn_0nw1q_nJCMabN58JDBCg9Z6OcAmyYNc/edit"),
    ("Sebelas Apartments", "Evdekimi", "https://drive.google.com/drive/folders/1aKTaP-hlXipayWot0mPKGjTnHFqi44-U", "https://docs.google.com/spreadsheets/d/1yf0eQVMHS48v8l1Krt2raLNKKhWSewo-7fIzTn1kJqg/edit"),
    ("Unit Space U2", "Unit", "https://momofdragons.notion.site/5daef127be834b829ef52f0aa244fae7", "https://docs.google.com/spreadsheets/d/1g58AS0sl3X8GAxtUnX3QGwbx_hxRBl3vzc4vhSckRoI/edit"),
    ("Predmet Babakan", "Predmet", "https://drive.google.com/drive/folders/1YX3uhnJk-JB5FNp6uYiMIw6uGBmS6wSQ", "https://docs.google.com/spreadsheets/d/1ogkQ2zJJbiBEl8WyRVOmWGU-4oT1XMwv/edit"),
    ("Lunara Villas", "Swatch Development", "https://drive.google.com/drive/folders/1NwUYqusqWm9UGtJz_faTSNUs1UDYjmlw", "https://docs.google.com/spreadsheets/d/1uMvYnieLx-IMEqmHmpFBzY4H3NSHibLC/edit"),
    ("Ramada Encore Pandawa", "Anta", "https://drive.google.com/drive/folders/19vDAQEX7nvecCphTowujnMynCjjq9_bN", "https://docs.google.com/spreadsheets/d/1XXWvYYN_WrciIwiL_VRUpbrVXZdRl_Zo7nV_Igv559g/edit"),
    ("Axis One", "PCE", "https://pcepartners.notion.site/Axis-One-RU-145192db18eb801ebffacc9e031feadf", "https://docs.google.com/spreadsheets/d/1LGZYDe1xaDEkng3zbWnuIUs4mfi5onGu/edit"),
    ("Buddha Club House", "Avalon", "https://partners.avalonbali.com/buddha-en", "https://docs.google.com/spreadsheets/d/14_tM5YhGFzm3xk_LRpcArMVc1GrTZ_7i/edit"),
    ("BIOM", "Nuanu", "https://biom.super.site", "https://docs.google.com/spreadsheets/d/17nwerNkKrJIqRPUvlS7sfzX78iKMm57i/edit"),
    ("Palmmood", "White Development", "https://drive.google.com/drive/folders/1gtfN0JxGZ6jMY0xJJu_Cs1vtshHPNzqF", "https://docs.google.com/spreadsheets/d/1H9lsLy1dpc2hTDI_jNjKIx-6wJabzglXTejbYVpeMz4/edit"),
    ("La Quinta", "Sunny", "https://drive.google.com/drive/folders/16zv5bYsV6suZeTRPic44dr4REzMD1ZS6", "https://docs.google.com/spreadsheets/d/13iDO_hPOecMS235VQuPxSSAji9p1MKjX-8RVgoPEREA/edit"),
    ("The Nine", "Swatch Development", "https://drive.google.com/drive/folders/1xrqHC_Gtv03B02OfHUAlAuuzfV8nolgi", "https://docs.google.com/spreadsheets/d/1uMvYnieLx-IMEqmHmpFBzY4H3NSHibLC/edit"),
    ("Melasti Villas Lyvin", "Lyvin", "https://drive.google.com/drive/folders/1Gv7cYsCvalZZMnKldMVIzXG9YkFs8DmY", "https://docs.google.com/spreadsheets/d/1ZBD4yL8S741GNqSUYoxufG4GT3Zvexd2lZd1kTxczXE/edit"),
    ("Uluwatu Art Villas", "Art Villas Bali", "https://docs.google.com/spreadsheets/d/1Fqz4xRTiDjpi0LAQyPpSn0urCSQD-ICuhyABHsRvyQ8/edit", None),
]

# Check duplicates
skipped = []
inserted = []
errors = []
unresolved_devs = []

for name, dev_notion, files_url, chess_url in projects:
    name_clean = name.strip()
    if name_clean.lower() in existing_names:
        skipped.append(name_clean)
        continue

    supa_name, dev_id = resolve_dev(dev_notion)

    if dev_id is None:
        unresolved_devs.append((name_clean, dev_notion, supa_name))

    drive_val = esc(files_url)
    sheets_val = esc(chess_url)
    dev_id_val = f"'{dev_id}'" if dev_id else "NULL"
    dev_name_val = esc(supa_name)
    name_val = esc(name_clean)

    sql = f"""INSERT INTO catalog_projects (name, developer_name, developer_id, status, drive_folder_url, sheets_url)
              VALUES ({name_val}, {dev_name_val}, {dev_id_val}, 'pending', {drive_val}, {sheets_val})"""

    result = run_sql(sql)
    if result is not None:
        inserted.append(name_clean)
    else:
        errors.append(name_clean)

    time.sleep(0.3)

print(f"\n=== IMPORT RESULTS ===")
print(f"Inserted: {len(inserted)}")
print(f"Skipped (duplicate): {len(skipped)}")
print(f"Errors: {len(errors)}")
if skipped:
    print(f"\nSkipped: {', '.join(skipped)}")
if errors:
    print(f"\nErrors: {', '.join(errors)}")
if unresolved_devs:
    print(f"\nUnresolved developers (inserted without developer_id):")
    for name, notion, supa in unresolved_devs:
        print(f"  {name}: {notion} -> {supa}")
PYEOF