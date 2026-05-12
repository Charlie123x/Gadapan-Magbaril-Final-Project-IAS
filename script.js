const samples = [
  {
    name: 'WannaCry.sim', path: 'WannaCry.sim',
    iocs: [
      {cat:'File Hash (SHA256)', val:'ed01eb...c12a9a (simulated)'},
      {cat:'Ransom Note',        val:'@WanaDecryptor@.exe'},
      {cat:'Kill Switch Domain', val:'iuqerfsodp9ifj...com'},
      {cat:'Lateral Movement',   val:'EternalBlue / MS17-010'},
    ],
    events: [
      {d:120,  tag:'sys',  cat:'tag-sys',  msg:'<span class="path">PROCESS_CREATE</span> → <span class="path">C:\\Windows\\Temp\\mssecsvc.exe</span>'},
      {d:240,  tag:'reg',  cat:'tag-reg',  msg:'REG_WRITE → <span class="path">HKLM\\SYSTEM\\CurrentControlSet\\Services\\mssecsvc2.0</span>'},
      {d:380,  tag:'net',  cat:'tag-net',  msg:'HTTP_GET → <span class="ip">iuqerfsodp9ifjasdfjhgorijfaewrwergwea.com</span> (kill switch probe)'},
      {d:500,  tag:'net',  cat:'tag-net',  msg:'SMB_SCAN → <span class="ip">192.168.0.0/24</span> port <span class="val">445</span> (worm propagation)'},
      {d:640,  tag:'proc', cat:'tag-proc', msg:'EXPLOIT EternalBlue → <span class="path">\\\\192.168.0.14\\IPC$</span> PWNED'},
      {d:780,  tag:'fs',   cat:'tag-fs',   msg:'FILE_ENCRYPT → <span class="path">C:\\Users\\*.docx</span> → <span class="val">*.WNCRY</span>'},
      {d:900,  tag:'fs',   cat:'tag-fs',   msg:'FILE_ENCRYPT → <span class="path">C:\\Users\\*.xlsx</span> → <span class="val">*.WNCRY</span>'},
      {d:1020, tag:'fs',   cat:'tag-fs',   msg:'FILE_CREATE → <span class="path">C:\\Users\\Desktop\\@WanaDecryptor@.exe</span>'},
      {d:1150, tag:'net',  cat:'tag-net',  msg:'TOR_CONNECT → <span class="ip">sqjolphimrr7jqw6.onion</span>:80 (C2 beacon)'},
      {d:1280, tag:'warn', cat:'tag-warn', msg:'RANSOM_NOTE displayed — demands $300 in Bitcoin'},
      {d:1400, tag:'proc', cat:'tag-proc', msg:'SHADOW_DELETE → vssadmin delete shadows /all /quiet'},
      {d:1530, tag:'ok',   cat:'tag-ok',   msg:'ANALYSIS_COMPLETE — Sample fully mapped. 0 real changes made.'},
    ],
    phases:[3,3,3,3,5]
  },
  {
    name: 'Mirai.sim', path: 'Mirai.sim',
    iocs: [
      {cat:'Target Ports',     val:'23 (Telnet), 2323, 7547, 5555'},
      {cat:'C2 Protocol',      val:'Custom binary TCP over port 48101'},
      {cat:'Default Creds',    val:'admin:admin, root:root, …62 pairs'},
      {cat:'DDoS Methods',     val:'UDP Flood, SYN Flood, HTTP Flood'},
    ],
    events: [
      {d:100,  tag:'net',  cat:'tag-net',  msg:'TELNET_SCAN → <span class="ip">0.0.0.0/0</span> port <span class="val">23</span> random sweep'},
      {d:230,  tag:'net',  cat:'tag-net',  msg:'CRED_BRUTE → <span class="ip">185.62.x.x</span> trying <span class="val">admin:admin</span>'},
      {d:350,  tag:'sys',  cat:'tag-sys',  msg:'LOGIN_SUCCESS → <span class="ip">185.62.44.12</span> (DVR device)'},
      {d:470,  tag:'proc', cat:'tag-proc', msg:'PAYLOAD_DROP → <span class="path">/tmp/mirai.arm7</span> via wget'},
      {d:590,  tag:'fs',   cat:'tag-fs',   msg:'BINARY_DELETE → <span class="path">/tmp/mirai.arm7</span> (self-erase after exec)'},
      {d:700,  tag:'net',  cat:'tag-net',  msg:'C2_CONNECT → <span class="ip">188.166.x.x</span>:48101 (IRC-like protocol)'},
      {d:820,  tag:'net',  cat:'tag-net',  msg:'BOT_REGISTER → sending arch/hostname to C2'},
      {d:940,  tag:'warn', cat:'tag-warn', msg:'DDoS_COMMAND received: UDP flood target <span class="ip">8.8.8.8</span> for 60s'},
      {d:1060, tag:'net',  cat:'tag-net',  msg:'UDP_FLOOD → <span class="val">280 Gbps</span> simulated traffic (NOT real)'},
      {d:1180, tag:'ok',   cat:'tag-ok',   msg:'ANALYSIS_COMPLETE — Botnet enrollment lifecycle mapped.'},
    ],
    phases:[3,4,2,5,4]
  },
  {
    name: 'Emotet.sim', path: 'Emotet.sim',
    iocs: [
      {cat:'Delivery Vector',    val:'Malicious Word macro (.docm)'},
      {cat:'Persistence Key',    val:'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'},
      {cat:'Payload Stage 2',    val:'TrickBot / QakBot loader'},
      {cat:'C2 Infrastructure',  val:'Bulletproof hosting, rotating IPs'},
    ],
    events: [
      {d:100,  tag:'proc', cat:'tag-proc', msg:'MACRO_EXEC → WinWord spawns <span class="path">cmd.exe</span> (macro-enabled doc)'},
      {d:220,  tag:'proc', cat:'tag-proc', msg:'POWERSHELL -enc [Base64] → downloads stage-1 dropper'},
      {d:350,  tag:'net',  cat:'tag-net',  msg:'HTTP_GET → <span class="ip">198.23.x.x</span>/wp-content/uploads/emotet.dll'},
      {d:470,  tag:'fs',   cat:'tag-fs',   msg:'FILE_WRITE → <span class="path">%APPDATA%\\Roaming\\Qfvxnkd\\emotet.exe</span>'},
      {d:590,  tag:'reg',  cat:'tag-reg',  msg:'PERSIST → <span class="path">HKCU\\Run\\Qfvxnkd</span> = <span class="val">emotet.exe</span>'},
      {d:710,  tag:'mem',  cat:'tag-mem',  msg:'PROCESS_INJECT → hollowing into <span class="path">svchost.exe</span> PID 1284'},
      {d:830,  tag:'net',  cat:'tag-net',  msg:'SPAM_HARVEST → reading Outlook contacts for lateral phishing'},
      {d:950,  tag:'net',  cat:'tag-net',  msg:'C2_BEACON → <span class="ip">91.217.x.x</span>:443 (TLS encrypted)'},
      {d:1070, tag:'proc', cat:'tag-proc', msg:'STAGE2_DROP → TrickBot downloaded and executed'},
      {d:1190, tag:'warn', cat:'tag-warn', msg:'CREDENTIAL_STEAL → browser credential vaults accessed'},
      {d:1310, tag:'ok',   cat:'tag-ok',   msg:'ANALYSIS_COMPLETE — Full infection chain documented.'},
    ],
    phases:[3,4,4,4,3]
  },
  {
    name: 'Stuxnet.sim', path: 'Stuxnet.sim',
    iocs: [
      {cat:'Spread Vector',   val:'USB drive (LNK exploit), network shares'},
      {cat:'Target',          val:'Siemens S7-315 PLCs (centrifuges)'},
      {cat:'Zero-Days Used',  val:'4 (CVE-2010-2568, 2772, 2729, 2568)'},
      {cat:'Signed Certs',    val:'Stolen Realtek / JMicron certs'},
    ],
    events: [
      {d:100,  tag:'sys',  cat:'tag-sys',  msg:'USB_MOUNT → LNK exploit triggered (CVE-2010-2568)'},
      {d:220,  tag:'proc', cat:'tag-proc', msg:'ROOTKIT_INSTALL → signed driver hides stuxnet files'},
      {d:340,  tag:'fs',   cat:'tag-fs',   msg:'REPLICATE → copies self to all network shares / USB'},
      {d:460,  tag:'proc', cat:'tag-proc', msg:'FINGERPRINT → scanning for Siemens Step 7 software'},
      {d:580,  tag:'sys',  cat:'tag-sys',  msg:'PLC_FOUND → S7-315 detected on industrial network'},
      {d:700,  tag:'mem',  cat:'tag-mem',  msg:'CODE_INJECT → intercepts WinCC DB communication'},
      {d:820,  tag:'warn', cat:'tag-warn', msg:'PLC_REPROGRAM → alters centrifuge RPM instructions (1410→63000 Hz)'},
      {d:940,  tag:'sys',  cat:'tag-sys',  msg:'FAKE_TELEMETRY → sends normal readings to SCADA display'},
      {d:1060, tag:'proc', cat:'tag-proc', msg:'PHYSICAL_DAMAGE → simulated centrifuge over-speed (SIM ONLY)'},
      {d:1180, tag:'ok',   cat:'tag-ok',   msg:'ANALYSIS_COMPLETE — Nation-state ICS sabotage chain mapped.'},
    ],
    phases:[3,4,5,3,5]
  },
  {
    name: 'Agent.Tesla.sim', path: 'Agent.Tesla.sim',
    iocs: [
      {cat:'Exfil Channel',      val:'SMTP, FTP, HTTP POST, Telegram Bot'},
      {cat:'Keylogger Target',   val:'All foreground windows + clipboard'},
      {cat:'Credential Targets', val:'Chrome, Firefox, Outlook, FileZilla'},
      {cat:'Packer',             val:'.NET obfuscation + CoffeeMixer packer'},
    ],
    events: [
      {d:100,  tag:'proc', cat:'tag-proc', msg:'PROCESS_START → <span class="path">update.exe</span> injected via phishing PDF'},
      {d:220,  tag:'mem',  cat:'tag-mem',  msg:'ANTI_ANALYSIS → checks VM artifacts, debugger presence'},
      {d:340,  tag:'fs',   cat:'tag-fs',   msg:'BROWSER_VAULT → reading <span class="path">%LOCALAPPDATA%\\Google\\Chrome\\Login Data</span>'},
      {d:460,  tag:'fs',   cat:'tag-fs',   msg:'OUTLOOK_GRAB → parsing <span class="path">%APPDATA%\\Microsoft\\Outlook\\*.pst</span>'},
      {d:580,  tag:'sys',  cat:'tag-sys',  msg:'KEYLOGGER_ON → SetWindowsHookEx WH_KEYBOARD_LL installed'},
      {d:700,  tag:'sys',  cat:'tag-sys',  msg:'SCREENSHOT → desktop captured every 30s'},
      {d:820,  tag:'net',  cat:'tag-net',  msg:'SMTP_EXFIL → credentials dumped to <span class="ip">mail.attacker[.]com</span>:587'},
      {d:940,  tag:'reg',  cat:'tag-reg',  msg:'PERSIST → Task Scheduler entry every 15min'},
      {d:1060, tag:'warn', cat:'tag-warn', msg:'DATA_EXFIL → 1.4MB credentials/keylog sent via Telegram Bot API'},
      {d:1180, tag:'ok',   cat:'tag-ok',   msg:'ANALYSIS_COMPLETE — Infostealer pipeline fully traced.'},
    ],
    phases:[2,4,4,4,3]
  },
  {
    name: 'GrayWare.sim', path: 'GrayWare.sim',
    iocs: [
      {cat:'Installation Source', val:'Bundled with freeware installer'},
      {cat:'Persistence',         val:'Startup folder shortcut + Chrome extension'},
      {cat:'Data Collected',      val:'Browsing history, search queries'},
      {cat:'Ad Injection',        val:'DOM injection into HTTP responses'},
    ],
    events: [
      {d:100, tag:'sys',  cat:'tag-sys',  msg:'INSTALLER_RUN → <span class="path">setup.exe</span> with hidden bundled adware'},
      {d:220, tag:'fs',   cat:'tag-fs',   msg:'EXTENSION_INSTALL → Chrome extension <span class="val">ID: jfkdladjk…</span> added silently'},
      {d:340, tag:'reg',  cat:'tag-reg',  msg:'STARTUP_ADD → <span class="path">HKCU\\Run\\AdHelper</span>'},
      {d:460, tag:'net',  cat:'tag-net',  msg:'TRACKING → browsing history POSTed to <span class="ip">track.adpartner[.]net</span>'},
      {d:580, tag:'sys',  cat:'tag-sys',  msg:'HOMEPAGE_HIJACK → sets Chrome start page to <span class="val">search.adpartner.net</span>'},
      {d:700, tag:'net',  cat:'tag-net',  msg:'AD_INJECT → inserting ads into visited web pages'},
      {d:820, tag:'ok',   cat:'tag-ok',   msg:'ANALYSIS_COMPLETE — Low-severity PUP behavior documented.'},
    ],
    phases:[1,2,3,3,1]
  }
];
 
let selected  = 0;
let simTimer  = null;
let running   = false;
let statsE=0, statsN=0, statsR=0, statsF=0;
 
function selectSample(idx) {
  if (running) return;
  selected = idx;
  document.querySelectorAll('.malware-card').forEach((c,i) => c.classList.toggle('active', i===idx));
  document.getElementById('term-title').textContent = `sandbox://simulate/${samples[idx].path}`;
  clearOutput();
  resetPhases();
  resetStats();
  document.getElementById('ioc-grid').innerHTML =
    `<div class="ioc-item"><div class="ioc-cat">Status</div><div class="ioc-val" style="color:#555">Press Run Analysis to begin</div></div>`;
}
 
function clearOutput() {
  document.getElementById('output').innerHTML = `
    <div class="line" style="color:#444;margin-bottom:8px;">
      <span class="msg">── Malware Behavior Analysis Sandbox v2.1 ──────────────────</span>
    </div>
    <div class="line" style="color:#444;">
      <span class="msg">Loaded: ${samples[selected].name} — press Run to start simulation.</span>
    </div>`;
}
 
function resetPhases() {
  for (let i=0; i<5; i++) {
    document.getElementById('ph-'+i).classList.remove('active','done');
    document.getElementById('pf-'+i).style.width = '0%';
  }
}
 
function resetStats() {
  statsE=statsN=statsR=statsF=0;
  ['s-events','s-net','s-reg','s-files'].forEach(id =>
    document.getElementById(id).textContent = '0');
}
 
function stopSim() {
  if (simTimer) { clearTimeout(simTimer); simTimer=null; }
  running = false;
  document.getElementById('run-btn').disabled = false;
  document.getElementById('stop-btn').style.display = 'none';
  document.getElementById('run-btn').style.display  = '';
}
 
function runSimulation() {
  if (running) return;
  running = true;
  document.getElementById('run-btn').disabled = true;
  document.getElementById('stop-btn').style.display = '';
  resetPhases();
  resetStats();
 
  const s   = samples[selected];
  const out = document.getElementById('output');
  out.innerHTML = '';
 
  appendLine(out, '#444', null, null, '<span class="msg">── Sandbox Init: ' + s.name + ' ──────────────────────────────────</span>');
  appendLine(out, '#444', null, null, '<span class="msg">Environment: Windows 10 x64 · .NET 4.8 · No network egress</span>');
  appendLine(out, '#444', null, null, '<span class="msg">&nbsp;</span>');
 
  const phaseWeights = s.phases;
  const totalW = phaseWeights.reduce((a,b)=>a+b, 0);
  const phaseEnds = [];
  let acc = 0;
  phaseWeights.forEach(w => { acc += w; phaseEnds.push(acc/totalW); });
 
  let eventsDone = 0;
  const total = s.events.length;
 
  s.events.forEach((ev, i) => {
    simTimer = setTimeout(() => {
      if (!running) return;
      const now = new Date();
      const ts  = pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds())+'.'+String(now.getMilliseconds()).slice(0,2);
      appendLine(out, null, ev.tag, ev.cat, '<span class="msg">'+ev.msg+'</span>', ts);
      out.scrollTop = out.scrollHeight;
 
      statsE++;
      document.getElementById('s-events').textContent = statsE;
      if (ev.cat==='tag-net')  { statsN++; document.getElementById('s-net').textContent  = statsN; }
      if (ev.cat==='tag-reg')  { statsR++; document.getElementById('s-reg').textContent  = statsR; }
      if (ev.cat==='tag-fs')   { statsF++; document.getElementById('s-files').textContent = statsF; }
 
      const pct = (i+1)/total;
      for (let p=0; p<5; p++) {
        const phEl = document.getElementById('ph-'+p);
        const pfEl = document.getElementById('pf-'+p);
        const start = p===0 ? 0 : phaseEnds[p-1];
        const end   = phaseEnds[p];
        if (pct >= end) {
          phEl.classList.remove('active'); phEl.classList.add('done');
          pfEl.style.width = '100%';
        } else if (pct >= start) {
          phEl.classList.add('active'); phEl.classList.remove('done');
          pfEl.style.width = Math.round((pct-start)/(end-start)*100)+'%';
        }
      }
 
      eventsDone++;
      if (eventsDone === total) {
        showIOCs(s);
        running = false;
        document.getElementById('run-btn').disabled = false;
        document.getElementById('stop-btn').style.display = 'none';
      }
    }, ev.d);
  });
}
 
function pad(n) { return String(n).padStart(2,'0'); }
 
function appendLine(out, color, tag, cat, html, ts='') {
  const div = document.createElement('div');
  div.className = 'line';
  if (color) div.style.color = color;
  let inner = '';
  if (ts)  inner += `<span class="ts">${ts}</span>`;
  if (tag) inner += `<span class="tag ${cat}">${tag.toUpperCase()}</span>`;
  inner += html;
  div.innerHTML = inner;
  out.appendChild(div);
}
 
function showIOCs(s) {
  document.getElementById('ioc-grid').innerHTML = s.iocs.map(ioc =>
    `<div class="ioc-item"><div class="ioc-cat">${ioc.cat}</div><div class="ioc-val">${ioc.val}</div></div>`
  ).join('');
}