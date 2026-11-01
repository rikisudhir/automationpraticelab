import React, { useMemo, useState } from "react";
import {
  Activity, BookOpen, Boxes, Braces, CheckSquare, ChevronDown, CircleHelp,
  Code2, ExternalLink, FileUp, Frame, Globe2, Home, Layers, MousePointer2,
  Search, Settings2, Table2, Terminal, WandSparkles
} from "lucide-react";

const modules = [
  { id: "overview", label: "Overview", group: "START HERE", icon: Home },
  { id: "inputs", label: "Text inputs", group: "FORM ELEMENTS", icon: Braces },
  { id: "selection", label: "Dropdowns & selection", group: "FORM ELEMENTS", icon: CheckSquare },
  { id: "date", label: "Date & time", group: "FORM ELEMENTS", icon: Activity },
  { id: "buttons", label: "Buttons & clicks", group: "MOUSE ACTIONS", icon: MousePointer2 },
  { id: "drag", label: "Drag and drop", group: "MOUSE ACTIONS", icon: Boxes },
  { id: "browser", label: "Alerts & windows", group: "BROWSER", icon: Globe2 },
  { id: "frames", label: "Iframes", group: "BROWSER", icon: Frame },
  { id: "links", label: "Links", group: "BROWSER", icon: ExternalLink },
  { id: "tables", label: "Tables", group: "DATA & DYNAMIC", icon: Table2 },
  { id: "dynamic", label: "Dynamic elements", group: "DATA & DYNAMIC", icon: WandSparkles },
  { id: "upload", label: "File upload", group: "DATA & DYNAMIC", icon: FileUp },
  { id: "shadow", label: "Shadow DOM", group: "ADVANCED", icon: Layers }
];

const examples = {
  inputs: {
    title: "Text inputs",
    description: "Practise locating and interacting with common input fields.",
    selenium: `WebDriver driver = new ChromeDriver();\ndriver.get("https://your-lab-url/");\ndriver.findElement(By.id("fullName")).sendKeys("Alex Morgan");\ndriver.findElement(By.id("email")).sendKeys("alex@example.com");\ndriver.findElement(By.id("about")).sendKeys("Learning automation");`,
    playwright: `import { test, expect } from '@playwright/test';\ntest('fill text fields', async ({ page }) => {\n  await page.goto('https://your-lab-url/');\n  await page.locator('#fullName').fill('Alex Morgan');\n  await page.locator('#email').fill('alex@example.com');\n  await page.locator('#about').fill('Learning automation');\n});`
  },
  selection: {
    title: "Dropdowns & selection",
    description: "Practise native selects, checkboxes and radio buttons.",
    selenium: `Select country = new Select(driver.findElement(By.id("country")));\ncountry.selectByVisibleText("India");\ndriver.findElement(By.id("skill-api")).click();\ndriver.findElement(By.id("level-intermediate")).click();`,
    playwright: `await page.locator('#country').selectOption({ label: 'India' });\nawait page.locator('#skill-api').check();\nawait page.locator('#level-intermediate').check();\nawait expect(page.locator('#skill-api')).toBeChecked();`
  },
  date: {
    title: "Date & time",
    description: "Practise browser-native date, time and datetime controls.",
    selenium: `driver.findElement(By.id("startDate")).sendKeys("11/15/2026");\ndriver.findElement(By.id("startTime")).sendKeys("10:30AM");`,
    playwright: `await page.locator('#startDate').fill('2026-11-15');\nawait page.locator('#startTime').fill('10:30');\nawait page.locator('#appointment').fill('2026-11-15T10:30');`
  },
  buttons: {
    title: "Buttons & clicks",
    description: "Practise click, double-click, right-click and hover interactions.",
    selenium: `driver.findElement(By.id("clickBtn")).click();\nnew Actions(driver).doubleClick(driver.findElement(By.id("doubleBtn"))).perform();\nnew Actions(driver).contextClick(driver.findElement(By.id("rightBtn"))).perform();\nnew Actions(driver).moveToElement(driver.findElement(By.id("hoverTarget"))).perform();`,
    playwright: `await page.locator('#clickBtn').click();\nawait page.locator('#doubleBtn').dblclick();\nawait page.locator('#rightBtn').click({ button: 'right' });\nawait page.locator('#hoverTarget').hover();`
  },
  drag: {
    title: "Drag and drop",
    description: "Move an item into the target area and verify the result.",
    selenium: `WebElement source = driver.findElement(By.id("dragItem"));\nWebElement target = driver.findElement(By.id("dropZone"));\nnew Actions(driver).dragAndDrop(source, target).perform();`,
    playwright: `await page.locator('#dragItem').dragTo(page.locator('#dropZone'));\nawait expect(page.locator('#dropZone')).toContainText('Dropped successfully');`
  },
  browser: {
    title: "Alerts & windows",
    description: "Practise JavaScript dialogs and opening a new browser tab.",
    selenium: `driver.findElement(By.id("alertBtn")).click();\nAlert alert = driver.switchTo().alert();\nSystem.out.println(alert.getText());\nalert.accept();`,
    playwright: `page.on('dialog', async dialog => {\n  console.log(dialog.message());\n  await dialog.accept();\n});\nawait page.locator('#alertBtn').click();`
  },
  frames: {
    title: "Iframes",
    description: "Locate elements inside an embedded frame.",
    selenium: `driver.switchTo().frame("practiceFrame");\ndriver.findElement(By.id("frameMessage")).click();\ndriver.switchTo().defaultContent();`,
    playwright: `const frame = page.frameLocator('#practiceFrame');\nawait frame.locator('#frameMessage').click();\nawait expect(frame.locator('#frameStatus')).toHaveText('You interacted with the iframe');`
  },
  links: {
    title: "Links",
    description: "Practise locating links, checking href values and opening new tabs.",
    selenium: `WebElement docs = driver.findElement(By.id("docsLink"));\nString href = docs.getAttribute("href");\nSystem.out.println(href);\ndocs.click();`,
    playwright: `const docsLink = page.locator('#docsLink');\nawait expect(docsLink).toHaveAttribute('href', /example/);\nawait docsLink.click();`
  },
  tables: {
    title: "Tables",
    description: "Search, sort and inspect rows in a data table.",
    selenium: `List<WebElement> rows = driver.findElements(By.cssSelector("#peopleTable tbody tr"));\nfor (WebElement row : rows) {\n  System.out.println(row.getText());\n}`,
    playwright: `const rows = page.locator('#peopleTable tbody tr');\nawait expect(rows).toHaveCount(4);\nconsole.log(await rows.allTextContents());\nawait page.locator('#tableSearch').fill('Maya');`
  },
  dynamic: {
    title: "Dynamic elements",
    description: "Wait for content that appears after a short delay.",
    selenium: `driver.findElement(By.id("loadBtn")).click();\nWebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\nwait.until(ExpectedConditions.visibilityOfElementLocated(By.id("loadedMessage")));`,
    playwright: `await page.locator('#loadBtn').click();\nawait expect(page.locator('#loadedMessage')).toBeVisible({ timeout: 10000 });`
  },
  upload: {
    title: "File upload",
    description: "Choose a local file and verify its filename.",
    selenium: `driver.findElement(By.id("fileInput")).sendKeys("/absolute/path/to/sample.pdf");\nString name = driver.findElement(By.id("fileName")).getText();`,
    playwright: `await page.locator('#fileInput').setInputFiles('sample.pdf');\nawait expect(page.locator('#fileName')).toContainText('sample.pdf');`
  },
  shadow: {
    title: "Shadow DOM",
    description: "Practise locating content inside a web component's shadow root.",
    selenium: `WebElement host = driver.findElement(By.cssSelector("shadow-card"));\nSearchContext shadowRoot = host.getShadowRoot();\nshadowRoot.findElement(By.cssSelector("#shadowAction")).click();`,
    playwright: `await page.locator('shadow-card').locator('#shadowAction').click();\nawait expect(page.locator('shadow-card').locator('#shadowResult')).toHaveText('Shadow button clicked');`
  }
};

function App() {
  const [active, setActive] = useState("overview");
  const [language, setLanguage] = useState("playwright");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("India");
  const [skills, setSkills] = useState(["Automation"]);
  const [level, setLevel] = useState("Intermediate");
  const [date, setDate] = useState("2026-11-15");
  const [time, setTime] = useState("10:30");
  const [clickCount, setClickCount] = useState(0);
  const [doubleMessage, setDoubleMessage] = useState("Double-click the button");
  const [hovered, setHovered] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [frameClicked, setFrameClicked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [shadowClicked, setShadowClicked] = useState(false);

  const filteredModules = modules.filter(m => m.label.toLowerCase().includes(search.toLowerCase()));
  const current = examples[active];
  const people = useMemo(() => {
    const data = [{name:"Aarav",role:"QA Engineer",city:"Pune"},{name:"Maya",role:"Automation Lead",city:"Bengaluru"},{name:"Rohan",role:"Test Analyst",city:"Hyderabad"},{name:"Sara",role:"SDET",city:"Mumbai"}];
    return data.filter(p => (p.name+p.role+p.city).toLowerCase().includes(tableSearch.toLowerCase())).sort((a,b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }, [tableSearch, sortAsc]);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const toggleSkill = (skill) => setSkills(old => old.includes(skill) ? old.filter(x => x !== skill) : [...old, skill]);
  const code = current ? (language === "selenium" ? current.selenium : current.playwright) : "";

  const copyCode = async () => {
    try { await navigator.clipboard.writeText(code); notify("Code copied to clipboard"); }
    catch { notify("Clipboard unavailable — select and copy the code"); }
  };

  const renderPractice = () => {
    switch (active) {
      case "inputs": return <div className="practice-grid">
        <div className="field"><label htmlFor="fullName">Full name</label><input id="fullName" placeholder="Enter your name" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" placeholder="alex@example.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div className="field full"><label htmlFor="password">Password</label><input id="password" type="password" placeholder="Enter password" /></div>
        <div className="field full"><label htmlFor="about">About you</label><textarea id="about" rows="3" placeholder="Tell us what you are learning..." value={about} onChange={e=>setAbout(e.target.value)} /></div>
        <div className="field"><label htmlFor="disabledInput">Disabled field</label><input id="disabledInput" disabled value="Cannot edit this field" readOnly /></div>
        <div className="field"><label htmlFor="readonlyInput">Read-only field</label><input id="readonlyInput" readOnly value="Read-only value" /></div>
        <div className="full action-row"><button className="primary" onClick={()=>notify(`Submitted: ${name || "No name"} · ${email || "No email"}`)}>Submit form</button><button className="secondary" onClick={()=>{setName("");setEmail("");setAbout("");}}>Reset</button></div>
      </div>;
      case "selection": return <div className="practice-grid">
        <div className="field"><label htmlFor="country">Select country</label><select id="country" value={country} onChange={e=>setCountry(e.target.value)}><option>India</option><option>United States</option><option>United Kingdom</option><option>Australia</option><option>Singapore</option></select><small>Selected: {country}</small></div>
        <div className="field"><label htmlFor="multiCountry">Multi-select</label><select id="multiCountry" multiple size="4" defaultValue={["India","Singapore"]}><option>India</option><option>Singapore</option><option>Germany</option><option>Japan</option></select></div>
        <div className="field"><span className="label">Choose skills</span><div className="choice-list">{["Automation","API Testing","Manual Testing"].map(s=><label className="choice" key={s}><input id={`skill-${s.toLowerCase().replaceAll(" ","-")}`} type="checkbox" checked={skills.includes(s)} onChange={()=>toggleSkill(s)} />{s}</label>)}</div><small>Selected: {skills.join(", ") || "None"}</small></div>
        <div className="field"><span className="label">Experience level</span><div className="choice-list">{["Beginner","Intermediate","Advanced"].map(s=><label className="choice" key={s}><input id={`level-${s.toLowerCase()}`} type="radio" name="level" checked={level===s} onChange={()=>setLevel(s)} />{s}</label>)}</div><small>Selected: {level}</small></div>
      </div>;
      case "date": return <div className="practice-grid">
        <div className="field"><label htmlFor="startDate">Date picker</label><input id="startDate" type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
        <div className="field"><label htmlFor="startTime">Time picker</label><input id="startTime" type="time" value={time} onChange={e=>setTime(e.target.value)} /></div>
        <div className="field"><label htmlFor="appointment">Date and time</label><input id="appointment" type="datetime-local" defaultValue="2026-11-15T10:30" /></div>
        <div className="field"><label htmlFor="monthPicker">Month picker</label><input id="monthPicker" type="month" defaultValue="2026-11" /></div>
        <div className="full result-box">Selected appointment: <strong>{date} at {time}</strong></div>
      </div>;
      case "buttons": return <div className="practice-grid">
        <div className="demo-tile"><span className="label">Single click</span><button id="clickBtn" className="primary" onClick={()=>setClickCount(c=>c+1)}>Click me</button><small>Clicked {clickCount} time(s)</small></div>
        <div className="demo-tile"><span className="label">Double click</span><button id="doubleBtn" className="secondary" onDoubleClick={()=>setDoubleMessage("Double-click detected!")}>Double-click me</button><small id="doubleStatus">{doubleMessage}</small></div>
        <div className="demo-tile"><span className="label">Right click</span><button id="rightBtn" className="secondary" onContextMenu={e=>{e.preventDefault();notify("Right-click detected");}}>Right-click me</button><small>Use the right mouse button</small></div>
        <div className="demo-tile"><span className="label">Hover</span><div id="hoverTarget" className={`hover-target ${hovered?"is-hovered":""}`} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>{hovered?"You are hovering!":"Move your mouse here"}</div><small>Hover state: {hovered?"active":"inactive"}</small></div>
      </div>;
      case "drag": return <div className="practice-grid">
        <div className="demo-tile"><span className="label">Draggable item</span><div id="dragItem" className="drag-item" draggable onDragStart={e=>e.dataTransfer.setData("text/plain","Automation item")}>Drag this item <span>⠿</span></div></div>
        <div className="demo-tile"><span className="label">Drop target</span><div id="dropZone" className={`drop-zone ${dropped?"drop-success":""}`} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();setDropped(true);}}>{dropped?"Dropped successfully ✓":"Drop the item here"}</div><button className="text-button" onClick={()=>setDropped(false)}>Reset drop zone</button></div>
        <div className="field full"><label htmlFor="rangeSlider">Range slider: <strong id="rangeValue">50</strong></label><input id="rangeSlider" type="range" min="0" max="100" defaultValue="50" onChange={e=>document.getElementById("rangeValue").textContent=e.target.value} /></div>
      </div>;
      case "browser": return <div className="practice-grid">
        <div className="demo-tile"><span className="label">JavaScript alert</span><button id="alertBtn" className="primary" onClick={()=>window.alert("Hello from Automation Lab!")}>Show alert</button><small>Accept the browser alert</small></div>
        <div className="demo-tile"><span className="label">Confirm dialog</span><button id="confirmBtn" className="secondary" onClick={()=>notify(window.confirm("Do you want to continue?")?"You selected OK":"You selected Cancel")}>Show confirm</button><small>Choose OK or Cancel</small></div>
        <div className="demo-tile"><span className="label">Prompt dialog</span><button id="promptBtn" className="secondary" onClick={()=>{const v=window.prompt("Enter your name");notify(v?`Hello, ${v}`:"Prompt dismissed");}}>Show prompt</button><small>Enter a value in the prompt</small></div>
        <div className="demo-tile"><span className="label">New tab / window</span><a id="newTabLink" className="button-link" href="https://example.com" target="_blank" rel="noreferrer">Open example.com ↗</a><small>Opens a new browser tab</small></div>
      </div>;
      case "frames": return <div className="field full"><label htmlFor="practiceFrame">Embedded practice iframe</label><iframe id="practiceFrame" title="Practice iframe" className="practice-frame" srcDoc={`<!doctype html><html><body style="font:15px Arial;padding:20px;background:#f4f7fb;color:#182235"><h3>Inside the iframe</h3><p>Switch into this frame to interact with its button.</p><button id="frameMessage" onclick="document.getElementById('frameStatus').textContent='You interacted with the iframe'" style="padding:10px 14px;background:#315ee8;color:white;border:0;border-radius:6px">Click inside frame</button><p id="frameStatus">Waiting for interaction</p></body></html>`} /></div>;
      case "links": return <div className="practice-grid">
        <div className="demo-tile"><span className="label">Internal link</span><a id="internalLink" href="#overview" onClick={e=>{e.preventDefault();setActive("overview");}}>Go to overview</a><small>Navigates within this practice app</small></div>
        <div className="demo-tile"><span className="label">External link</span><a id="docsLink" href="https://example.com" target="_blank" rel="noreferrer">Visit example.com ↗</a><small>Opens an external website</small></div>
        <div className="demo-tile"><span className="label">Link attributes</span><code>id="docsLink"</code><code>target="_blank"</code><code>rel="noreferrer"</code></div>
      </div>;
      case "tables": return <div className="field full">
        <div className="table-toolbar"><input id="tableSearch" placeholder="Search people..." value={tableSearch} onChange={e=>setTableSearch(e.target.value)} /><button className="secondary" onClick={()=>setSortAsc(s=>!s)}>Sort name {sortAsc?"↑":"↓"}</button></div>
        <div className="table-wrap"><table id="peopleTable"><thead><tr><th>Name</th><th>Role</th><th>City</th></tr></thead><tbody>{people.map(p=><tr key={p.name}><td>{p.name}</td><td>{p.role}</td><td>{p.city}</td></tr>)}</tbody></table></div><small id="rowCount">Showing {people.length} record(s)</small>
      </div>;
      case "dynamic": return <div className="practice-grid">
        <div className="demo-tile"><span className="label">Delayed element</span><button id="loadBtn" className="primary" onClick={()=>{setLoaded(false);window.setTimeout(()=>setLoaded(true),1800);}}>Load element (1.8 sec)</button>{loaded?<div id="loadedMessage" className="result-box">Dynamic content loaded successfully ✓</div>:<small>Click to reveal a delayed element</small>}</div>
        <div className="demo-tile"><span className="label">Visibility toggle</span><button className="secondary" onClick={()=>setHovered(v=>!v)}>Toggle visibility</button>{hovered&&<div id="visibleMessage" className="result-box">Now you can see me!</div>}</div>
      </div>;
      case "upload": return <div className="practice-grid">
        <div className="field full"><label htmlFor="fileInput">Choose a file</label><input id="fileInput" type="file" onChange={e=>setFileName(e.target.files?.[0]?.name || "")} /><div id="fileName" className="result-box">{fileName?`Selected file: ${fileName}`:"No file selected yet"}</div><small>For Selenium, send the absolute file path to the input element. For Playwright, use setInputFiles().</small></div>
      </div>;
      case "shadow": return <div className="demo-tile"><span className="label">Shadow DOM practice</span><div className="shadow-sim"><div className="shadow-header">Simulated shadow component</div><p>This demo introduces the idea of component boundaries.</p><button id="shadowAction" className="primary" onClick={()=>setShadowClicked(true)}>Click shadow button</button><p id="shadowResult">{shadowClicked?"Shadow button clicked":"Waiting for click"}</p></div><div className="result-box">Note: This first-version demo is a simulated component. The next development step can replace it with a real custom element and open shadow root.</div></div>;
      default: return null;
    }
  };

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Terminal size={21}/></div><div><strong>Automation Lab</strong><span>TESTING PLAYGROUND</span></div></div>
      <div className="sidebar-search"><Search size={15}/><input aria-label="Search modules" placeholder="Find a module..." value={search} onChange={e=>setSearch(e.target.value)}/><kbd>/</kbd></div>
      <nav className="nav-list">
        {["START HERE","FORM ELEMENTS","MOUSE ACTIONS","BROWSER","DATA & DYNAMIC","ADVANCED"].map(group=><div className="nav-group" key={group}><div className="nav-heading">{group}</div>{filteredModules.filter(m=>m.group===group).map(m=>{const Icon=m.icon;return <button key={m.id} className={`nav-item ${active===m.id?"active":""}`} onClick={()=>setActive(m.id)}><Icon size={16}/><span>{m.label}</span>{active===m.id&&<span className="active-dot"/>}</button>})}</div>)}
      </nav>
      <div className="sidebar-bottom"><div className="learning-card"><div className="learning-icon"><BookOpen size={16}/></div><strong>Keep learning</strong><p>Practice one element every day to build your automation skills.</p><span>COURSES COMING SOON</span></div><div className="profile"><div className="avatar">AL</div><div><strong>Automation Lab</strong><span>Learning edition</span></div><Settings2 size={16}/></div></div>
    </aside>

    <main className="main-area">
      <header className="topbar"><div className="breadcrumb">Playground <span>/</span> {modules.find(m=>m.id===active)?.label || "Overview"}</div><div className="top-actions"><span className="status-pill"><i/> Playground active</span><a href="https://playwright.dev/docs/intro" target="_blank" rel="noreferrer">Playwright docs <ExternalLink size={13}/></a></div></header>
      <div className="content">
        {active==="overview" ? <>
          <div className="hero"><div className="hero-copy"><div className="eyebrow"><span/> HANDS-ON AUTOMATION LEARNING</div><h1>Welcome to your<br/><em>Automation Lab.</em></h1><p>A practical playground to explore web elements, practise browser interactions and build confidence with Selenium and Playwright.</p><div className="hero-actions"><button className="primary" onClick={()=>setActive("inputs")}>Start practising <span>→</span></button><button className="ghost" onClick={()=>setActive("dynamic")}><CircleHelp size={16}/> Explore challenges</button></div></div><div className="hero-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="code-window"><div className="window-bar"><i/><i/><i/><span>test.spec.js</span></div><div className="code-lines"><p><b>01</b> <span className="pink">test</span>(<span className="green">'first test'</span>, async ({`{ page }`}) =&gt; {'{'}</p><p><b>02</b> &nbsp; <span className="blue">await</span> page.goto(<span className="green">'/playground'</span>);</p><p><b>03</b> &nbsp; <span className="blue">await</span> page.locator(<span className="green">'#submit'</span>).click();</p><p><b>04</b> {'}'});</p><p className="code-success">✓ Test passed</p></div></div><div className="floating-chip chip-top"><span>⌘</span> Browser automation</div><div className="floating-chip chip-bottom"><span>✓</span> Learn by doing</div></div></div>
          <div className="stats-row"><div className="stat-card"><span className="stat-icon purple"><Boxes size={18}/></span><div><strong>13</strong><span>Practice modules</span></div></div><div className="stat-card"><span className="stat-icon blue"><Code2 size={18}/></span><div><strong>2</strong><span>Automation languages</span></div></div><div className="stat-card"><span className="stat-icon green"><Activity size={18}/></span><div><strong>30+</strong><span>Hands-on interactions</span></div></div><div className="stat-card"><span className="stat-icon orange"><BookOpen size={18}/></span><div><strong>Free</strong><span>Practice environment</span></div></div></div>
          <div className="section-head"><div><div className="eyebrow">YOUR LEARNING SPACE</div><h2>Explore practice modules</h2><p>Choose an element and start experimenting.</p></div><span className="module-count">13 MODULES</span></div>
          <div className="module-grid">{modules.filter(m=>m.id!=="overview").map((m,i)=>{const Icon=m.icon;return <button className="module-card" key={m.id} onClick={()=>setActive(m.id)}><div className={`module-icon tone-${i%5}`}><Icon size={19}/></div><div className="module-title">{m.label}<span>↗</span></div><p>{examples[m.id].description}</p><div className="module-footer"><span>OPEN PRACTICE</span><span>→</span></div></button>})}</div>
          <div className="bottom-banner"><div className="banner-icon"><Braces size={22}/></div><div><strong>Learn both. Practise anywhere.</strong><p>Switch between Selenium Java and Playwright JavaScript examples inside each module.</p></div><button className="secondary" onClick={()=>setActive("inputs")}>View code examples</button></div>
        </> : <div className="practice-page">
          <div className="page-heading"><div><div className="eyebrow">PRACTICE MODULE</div><h1>{current?.title}</h1><p>{current?.description}</p></div><span className="module-tag">INTERACTIVE EXERCISE</span></div>
          <div className="practice-layout"><section className="panel practice-panel"><div className="panel-heading"><div><span className="panel-kicker">LIVE PLAYGROUND</span><h2>Try it yourself</h2></div><span className="live-dot">LIVE</span></div><div className="practice-content">{renderPractice()}</div></section>
          <section className="panel code-panel"><div className="panel-heading"><div><span className="panel-kicker">AUTOMATION EXAMPLE</span><h2>Write your test</h2></div><span className="code-icon"><Code2 size={17}/></span></div><div className="language-tabs"><button className={language==="playwright"?"selected":""} onClick={()=>setLanguage("playwright")}>Playwright JS</button><button className={language==="selenium"?"selected":""} onClick={()=>setLanguage("selenium")}>Selenium Java</button></div><div className="code-block"><div className="code-toolbar"><span><i/> {language==="playwright"?"JavaScript":"Java"}</span><button onClick={copyCode}>Copy code</button></div><pre><code>{code}</code></pre></div><div className="code-note"><CircleHelp size={15}/><span>These are starter examples. Add imports, driver setup and your actual deployed playground URL before running them.</span></div></section></div>
          <div className="challenge-panel"><div className="challenge-symbol">✦</div><div><strong>Challenge yourself</strong><p>Can you write the automation script without looking at the example? Try it first, then compare your solution.</p></div><span className="challenge-level">BEGINNER FRIENDLY</span></div>
        </div>}
        <footer className="footer"><span>© 2026 Automation Lab. Built for curious testers.</span><span>Learn · Practise · Automate</span></footer>
      </div>
    </main>
    {toast&&<div className="toast"><span>✓</span>{toast}</div>}
  </div>;
}

export default App;