const treeEl   = document.getElementById("tree");
const lyricsEl = document.getElementById("lyrics");
const audioEl  = document.getElementById("audio");
const endEl    = document.getElementById("end");   

const height = 10;

const colors = [
  "#ff0000","#ff6600","#ffff00","#00ff00",
  "#00ffff","#0066ff","#9900ff","#ff00ff",
  "#ffffff","#ff99cc"
];

const lyrics = [
  { text: "A face on a lover,",                time: 0   },
  { text: "With a fire in his heart,",         time: 1.5   },
  { text: "A man under cover,",                time: 3.5   },
  { text: "But you tore me apart,",            time: 4.5 },
  { text: "Oh oh",                             time: 8 },
  { text: "Now I've found a real love,",       time: 9 },
  { text: "You'll never fool me again.",       time: 11  },
  { text: "Last Christmas, I gave you my heart,", time: 13 },
  { text: "But the very next day you gave it away", time: 15.5 },
];

const endMessage = {
  text: "✨✨  Alex și Carina vă urează  ✨✨<br>🎅🎅  Crăciun Fericit!  🎅🎅",time: 18.7
};
function drawTree() {
  const width = height * 2 - 1;
  let html = "";

  for (let i = 0; i < height; i++) {
    const stars = 2 * i + 1;
    const spaces = (width - stars) / 2;
    html += " ".repeat(spaces);

    for (let s = 0; s < stars; s++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      html += `<span class="blink" style="color:${color}; text-shadow:0 0 6px ${color};">*</span>`;
    }

    html += "\n";
  }

  
  const trunkWidth = 3;
  const trunkSpaces = Math.floor((width - trunkWidth) / 2);

  for (let i = 0; i < 3; i++) {
    html += " ".repeat(trunkSpaces);
    html += `<span style="color:#8B4513; text-shadow:0 0 6px #a0522d;">###</span>\n`;
  }

  treeEl.innerHTML = html;
}

function displayLyricsSync() {
  let currentLine = 0;
  audioEl.addEventListener("timeupdate", () => {

   
    while (currentLine < lyrics.length && audioEl.currentTime >= lyrics[currentLine].time) {
      const div = document.createElement("div");
      div.textContent = lyrics[currentLine].text;
      lyricsEl.appendChild(div);
      currentLine++;
    }

  
    if (audioEl.currentTime >= endMessage.time && !endEl.innerHTML) {
      endEl.innerHTML = endMessage.text;
      endEl.classList.add("end-style"); 
    }

  });
}


function startAudioAndLyrics() {
  audioEl.play().then(() => {
    displayLyricsSync();
  }).catch(() => {
    console.log("Click or press ENTER to start audio.");
  });
}

document.body.addEventListener("keydown", e => {
  if (e.key === "Enter") startAudioAndLyrics();
}, { once: true });

document.body.addEventListener("click", () => {
  startAudioAndLyrics();
}, { once: true });

setInterval(drawTree, 400);
drawTree();
