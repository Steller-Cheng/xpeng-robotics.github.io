let leaderboardRows = [];
let currentLeaderboardFilter = "all";
/* Column order PG, DA, SV, VS, then compositional tiers (benchmark figure caption). */
const familyColumns = ["PG", "DA", "SV", "VS", "AI", "SI", "SM", "CR"];
const outcomeColumns = [
  { key: "verified_success", label: "Verified", color: "#72f0bd" },
  { key: "unsupported_commitment", label: "FR", color: "#ff7c8e" },
  { key: "no_report", label: "NR", color: "#ffbf69" },
  { key: "invalid", label: "Invalid", color: "#a9a0ff" },
  { key: "honest_fail", label: "Honest fail", color: "#8aa0b8" },
];

const feedbackRows = [
  { model: "Gemini-3.1-Pro", dW: 13.9, dB: 13.0, dFR: -9.2, dNR: -4.6 },
  { model: "Doubao-Seed-1.8", dW: 12.1, dB: 12.6, dFR: -4.6, dNR: -8.3 },
  { model: "Qwen3.6-27B", dW: 8.0, dB: 12.1, dFR: 4.0, dNR: -17.6 },
  { model: "Qwen3.5-27B", dW: 11.3, dB: 12.1, dFR: -0.1, dNR: -15.8 },
  { model: "GPT-5.4", dW: 4.5, dB: 2.3, dFR: -3.6, dNR: 3.6 },
  { model: "Claude-Sonnet-4", dW: 2.7, dB: 0.9, dFR: -23.0, dNR: 8.5 },
  { model: "Qwen3-VL-32B", dW: 2.6, dB: 3.0, dFR: 1.5, dNR: -8.8 },
  { model: "Qwen3-VL-32B (T)", dW: 4.0, dB: 1.4, dFR: 4.1, dNR: -5.0 },
  { model: "InternVL3.5-38B", dW: -0.6, dB: 1.5, dFR: -4.0, dNR: 0.7 },
  { model: "MiMo-Embodied-7B", dW: 3.0, dB: 0.0, dFR: 0.6, dNR: -7.1 },
];

const feedbackMetrics = [
  { key: "dW", label: "ΔW", color: "#69d6ff" },
  { key: "dB", label: "ΔB", color: "#72f0bd" },
  { key: "dFR", label: "ΔFR", color: "#ff7c8e" },
  { key: "dNR", label: "ΔNR", color: "#ffbf69" },
];

const taskCards = [
  {
    family: "PG",
    name: "Pixel Grounding",
    text: "Click the correct visible object from a single egocentric frame.",
    image: "assets/task_family_gallery_pairs/annotated/S1_selected_target_annotated.png",
  },
  {
    family: "DA",
    name: "Distance Approach",
    text: "Navigate from visible-but-far evidence into interaction range.",
    image: "assets/task_family_gallery_pairs/annotated/S2_near_annotated.png",
  },
  {
    family: "SV",
    name: "State Verification",
    text: "Report the categorical state of a visible object without physical interaction.",
    image: "assets/task_family_gallery_pairs/annotated/S4_state_a_annotated.png",
  },
  {
    family: "VS",
    name: "View Search",
    text: "Recover the target through active viewpoint exploration.",
    image: "assets/task_family_gallery_pairs/annotated/S3_target_visible_annotated.png",
  },
  {
    family: "AI",
    name: "Approach & Interact",
    text: "Navigate to a visible object and execute an interaction with terminal report.",
    image: "assets/task_family_gallery_pairs/annotated/T1_after_action_annotated.png",
  },
  {
    family: "SI",
    name: "Search & Interact",
    text: "Search, relocate, interact, and avoid premature false success reports.",
    image: "assets/task_family_gallery_pairs/annotated/T2_after_open_annotated.png",
  },
  {
    family: "SM",
    name: "Sequential Manipulation",
    text: "Preserve subgoal state across open, pick, place, and final verification.",
    image: "assets/task_family_gallery_pairs/annotated/T3_after_action_annotated.png",
  },
  {
    family: "CR",
    name: "Constraint Resolving",
    text: "Visible target, blocked approach—detour or restore reachability, then satisfy the instruction.",
    image: "assets/task_family_gallery_pairs/annotated/T4_after_resolve_annotated.png",
  },
];

const rollouts = [
  {
    title: "PG · Toaster target selection",
    meta: "success",
    outcome: "Identifies and clicks the correct target from egocentric view.",
    image: "assets/site/demo_s1_grounding.gif",
  },
  {
    title: "AI · Microwave activate",
    meta: "success",
    outcome: "Navigates to microwave and executes the interaction.",
    image: "assets/site/demo_t1_interact.gif",
  },
  {
    title: "SI · Microwave open",
    meta: "success",
    outcome: "Searches, approaches, clicks to open the microwave door.",
    image: "assets/site/demo_microwave_open.gif",
  },
  {
    title: "SM · Multi-step knife task",
    meta: "success",
    outcome: "Open cabinet, pick knife, place in sink — 10-step trace.",
    image: "assets/site/demo_t3_trace.gif",
  },
  {
    title: "AI · Fridge open",
    meta: "success",
    outcome: "Navigates to fridge and opens it in 3 steps.",
    image: "assets/site/demo_fridge_open.gif",
  },
  {
    title: "SM · Open-pick-place sequence",
    meta: "success",
    outcome: "Executes multi-step manipulation with state preservation.",
    image: "assets/site/demo_t3_manipulation.gif",
  },
];

function renderLeaderboard(filter = "all") {
  currentLeaderboardFilter = filter;
  const body = document.querySelector("#leaderboardBody");
  if (!leaderboardRows.length) {
    body.innerHTML = `<tr><td colspan="15">Loading leaderboard...</td></tr>`;
    return;
  }
  const rows = leaderboardRows
    .filter((row) => filter === "all" || row.group === filter)
    .sort((a, b) => (b.all.b || 0) - (a.all.b || 0));

  body.innerHTML = rows
    .map(
      (row, index) => `
        <tr>
          <td>${index + 1}</td>
          <td><strong>${row.model}</strong><span class="meta">${row.model_id}</span></td>
          <td>${row.group === "closed" ? "Closed API" : "Open"}</td>
          <td>${row.episodes?.toLocaleString() || "--"}</td>
          <td>${formatNumber(row.score)}</td>
          <td>${row.all.text}<div class="score-bar"><span style="width:${row.all.b || 0}%"></span></div></td>
          <td>${row.delta.toFixed(1)}</td>
          ${familyColumns.map((key) => `<td>${row.families[key]?.text || "--"}</td>`).join("")}
        </tr>
      `,
    )
    .join("");
}

function formatNumber(value) {
  return value == null ? "--" : value.toFixed(1);
}

async function loadLeaderboard() {
  try {
    const response = await fetch("assets/site/leaderboard.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    leaderboardRows = data.rows || [];
  } catch (error) {
    document.querySelector("#leaderboardBody").innerHTML = `<tr><td colspan="15">Failed to load leaderboard data.</td></tr>`;
    return;
  }
  renderLeaderboard(currentLeaderboardFilter);
  renderOutcomeChart();
  renderFeedbackChart();
}

function renderCards() {
  const diagnosticFamilies = ["PG", "DA", "SV", "VS"];
  const diagnostic = taskCards.filter((t) => diagnosticFamilies.includes(t.family));
  const compositional = taskCards.filter((t) => !diagnosticFamilies.includes(t.family));

  const renderGrid = (cards) =>
    cards
      .map(
        (task) => `
        <article class="task-card">
          <img src="${task.image}" alt="${task.family} ${task.name}" loading="lazy" />
          <div class="card-body">
            <span class="family-tag">${task.family}</span>
            <h3>${task.name}</h3>
            <p>${task.text}</p>
          </div>
        </article>
      `,
      )
      .join("");

  document.querySelector("#taskGridDiagnostic").innerHTML = renderGrid(diagnostic);
  document.querySelector("#taskGridCompositional").innerHTML = renderGrid(compositional);

  document.querySelector("#rolloutGrid").innerHTML = rollouts
    .map(
      (rollout) => `
        <article class="rollout-card">
          <img src="${rollout.image}" alt="${rollout.title}" loading="lazy" />
          <div class="card-body">
            <span class="outcome ${rollout.meta}">${rollout.meta}</span>
            <h3>${rollout.title}</h3>
            <p>${rollout.outcome}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderLeaderboard(tab.dataset.filter);
  });
});

renderLeaderboard();
renderCards();
loadLeaderboard();

function setupBibtexCopy() {
  const button = document.getElementById("copyBibtex");
  const code = document.getElementById("bibtexCode");
  if (!button || !code) return;

  const resetLabel = () => {
    window.setTimeout(() => {
      button.querySelector(".copy-label").textContent = "Copy BibTeX";
      button.removeAttribute("data-state");
    }, 1800);
  };

  button.addEventListener("click", async () => {
    const label = button.querySelector(".copy-label");
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      label.textContent = "Copied";
      button.dataset.state = "copied";
    } catch (error) {
      label.textContent = "Select text";
      button.dataset.state = "failed";
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    resetLabel();
  });
}

setupBibtexCopy();

function tooltip() {
  let el = document.querySelector(".chart-tooltip");
  if (!el) {
    el = document.createElement("div");
    el.className = "chart-tooltip";
    document.body.appendChild(el);
  }
  return el;
}

function showTooltip(event, html) {
  const el = tooltip();
  el.innerHTML = html;
  el.style.opacity = "1";
  el.style.left = `${event.clientX + 14}px`;
  el.style.top = `${event.clientY + 14}px`;
}

function hideTooltip() {
  tooltip().style.opacity = "0";
}

function renderOutcomeChart() {
  const mount = document.querySelector("#outcomeChart");
  if (!mount || !leaderboardRows.length) return;

  const rows = leaderboardRows
    .slice()
    .filter((row) => row.outcomes)
    .sort((a, b) => (b.all.b || 0) - (a.all.b || 0));
  const width = 980;
  const left = 190;
  const right = 32;
  const rowH = 25;
  const top = 46;
  const height = top + rows.length * rowH + 44;
  const chartW = width - left - right;

  const legend = outcomeColumns
    .map(
      (c, i) =>
        `<g transform="translate(${left + i * 126},18)"><rect width="10" height="10" fill="${c.color}"></rect><text x="16" y="10" class="chart-label">${c.label}</text></g>`,
    )
    .join("");

  const bars = rows
    .map((row, idx) => {
      let x = left;
      const y = top + idx * rowH;
      const segments = outcomeColumns
        .map((col) => {
          const value = row.outcomes?.[col.key] || 0;
          const w = (value / 100) * chartW;
          const seg = `<rect class="chart-segment" data-tip="<strong>${row.model}</strong><br>${col.label}: ${value.toFixed(1)}%" x="${x}" y="${y}" width="${Math.max(0, w)}" height="15" fill="${col.color}"></rect>`;
          x += w;
          return seg;
        })
        .join("");
      return `
        <text x="0" y="${y + 12}" class="chart-model">${row.model}</text>
        <text x="${left - 44}" y="${y + 12}" class="chart-label">${row.all.text}</text>
        ${segments}
      `;
    })
    .join("");

  mount.innerHTML = `
    <svg class="interactive-chart" viewBox="0 0 ${width} ${height}" role="img">
      ${legend}
      <line x1="${left}" y1="${top - 12}" x2="${left + chartW}" y2="${top - 12}" stroke="rgba(136,190,255,.22)" />
      ${bars}
      <text x="${left}" y="${height - 12}" class="chart-label">Outcome share per model; left label shows All W/B.</text>
    </svg>
  `;
  attachTooltips(mount);
}

function renderFeedbackChart() {
  const mount = document.querySelector("#feedbackChart");
  if (!mount) return;

  const width = 980;
  const left = 185;
  const right = 34;
  const rowH = 35;
  const top = 52;
  const height = top + feedbackRows.length * rowH + 46;
  const chartW = width - left - right;
  const min = -25;
  const max = 15;
  const zeroX = left + ((0 - min) / (max - min)) * chartW;
  const xFor = (v) => left + ((v - min) / (max - min)) * chartW;

  const legend = feedbackMetrics
    .map(
      (m, i) =>
        `<g transform="translate(${left + i * 110},18)"><rect width="10" height="10" fill="${m.color}"></rect><text x="16" y="10" class="chart-label">${m.label}</text></g>`,
    )
    .join("");

  const bars = feedbackRows
    .map((row, idx) => {
      const y = top + idx * rowH;
      const group = feedbackMetrics
        .map((metric, j) => {
          const value = row[metric.key];
          const x = Math.min(zeroX, xFor(value));
          const w = Math.abs(xFor(value) - zeroX);
          return `<rect class="chart-segment" data-tip="<strong>${row.model}</strong><br>${metric.label}: ${value > 0 ? "+" : ""}${value.toFixed(1)} pp" x="${x}" y="${y + j * 7}" width="${Math.max(1, w)}" height="5" fill="${metric.color}"></rect>`;
        })
        .join("");
      return `<text x="0" y="${y + 18}" class="chart-model">${row.model}</text>${group}`;
    })
    .join("");

  mount.innerHTML = `
    <svg class="interactive-chart" viewBox="0 0 ${width} ${height}" role="img">
      ${legend}
      <line x1="${zeroX}" y1="${top - 12}" x2="${zeroX}" y2="${height - 32}" stroke="rgba(237,246,255,.42)" />
        <text x="${left}" y="${height - 12}" class="chart-label">Proprioceptive-style feedback (\`too_far\`, \`path_blocked\`) only; negative ΔFR/ΔNR means fewer closure failures vs base.</text>
      ${bars}
    </svg>
  `;
  attachTooltips(mount);
}

function attachTooltips(mount) {
  mount.querySelectorAll(".chart-segment").forEach((segment) => {
    segment.addEventListener("mousemove", (event) => showTooltip(event, segment.dataset.tip));
    segment.addEventListener("mouseleave", hideTooltip);
  });
}

// Hero carousel
(function () {
  const imgs = document.querySelectorAll(".carousel-img");
  const outcomeEl = document.getElementById("carouselOutcome");
  const labelEl = document.getElementById("carouselLabel");
  const dotsContainer = document.getElementById("carouselDots");
  if (!imgs.length || !dotsContainer) return;

  imgs.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  let current = 0;
  const dots = dotsContainer.querySelectorAll(".carousel-dot");

  function goTo(index) {
    imgs[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = index;
    imgs[current].classList.add("active");
    dots[current].classList.add("active");
    outcomeEl.textContent = imgs[current].dataset.outcome;
    outcomeEl.className = "outcome " + imgs[current].dataset.class;
    labelEl.textContent = imgs[current].dataset.label;
  }

  setInterval(() => goTo((current + 1) % imgs.length), 4000);
})();
