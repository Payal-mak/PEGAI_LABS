import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Bot, Check, ChevronRight, CircleAlert, Download, FileText, LayoutDashboard, MessageSquareText, Plus, Search, Send, Settings2, Sparkles, WandSparkles } from 'lucide-react';
import './styles.css';
import { demoReply, initialConversation } from './services/requirementsAssistant';

const requirements = [
  ['FR-01', 'Students can browse and filter upcoming campus events.', 'Functional', 'High'],
  ['FR-02', 'Students can register or cancel an event registration.', 'Functional', 'High'],
  ['FR-03', 'Organizers can create, publish, and manage events.', 'Functional', 'High'],
  ['NFR-01', 'The platform loads primary event listings within 2 seconds.', 'Performance', 'Medium'],
  ['NFR-02', 'Only authenticated users may view or modify registration data.', 'Security', 'High']
];

function Badge({ children, tone = 'neutral' }) { return <span className={`badge ${tone}`}>{children}</span>; }

function App() {
  const [active, setActive] = useState('Elicitation');
  const [messages, setMessages] = useState(initialConversation);
  const [draft, setDraft] = useState('');
  const [selectedRequirement, setSelectedRequirement] = useState('FR-02');
  const [tab, setTab] = useState('Requirements');
  const score = useMemo(() => Math.min(96, 72 + messages.length * 3), [messages]);

  const send = () => {
    const text = draft.trim(); if (!text) return;
    setMessages(prev => [...prev, { role: 'user', text }, { role: 'ai', text: demoReply(text) }]);
    setDraft('');
  };
  const createProject = () => { setMessages([{ role: 'ai', text: 'Let’s begin a new requirements interview. What problem should this product solve, and for whom?' }]); setActive('Elicitation'); };
  const exportSrs = () => window.print();

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Sparkles size={18}/></div><span>specflow<span className="brand-ai">.ai</span></span></div>
      <button className="new-project" onClick={createProject}><Plus size={17}/> New project</button>
      <div className="project-switcher"><span className="project-dot"/><div><small>ACTIVE PROJECT</small><strong>Campus Connect</strong></div><ChevronRight size={15}/></div>
      <nav>{[['Overview', LayoutDashboard], ['Elicitation', MessageSquareText], ['SRS Studio', FileText], ['Prompt Lab', WandSparkles]].map(([label, Icon]) => <button key={label} onClick={() => setActive(label)} className={active === label ? 'nav-active' : ''}><Icon size={18}/>{label}{label === 'Elicitation' && <span className="nav-pulse"/>}</button>)}</nav>
      <div className="sidebar-bottom"><button><Settings2 size={18}/> Settings</button><div className="profile"><div className="avatar">M</div><div><strong>payal makwana</strong><small>Business Analyst</small></div><ChevronRight size={15}/></div></div>
    </aside>
    <main>
      <header className="topbar"><div><div className="crumb">Projects <ChevronRight size={13}/> Campus Connect</div><h1>{active === 'Elicitation' ? 'Requirement Elicitation' : active}</h1></div><div className="top-actions"><button className="icon-button"><Search size={18}/></button><button className="help">?</button><button className="export" onClick={exportSrs}><Download size={16}/> Export SRS</button></div></header>
      {active === 'Elicitation' ? <section className="workspace">
        <div className="conversation panel"><div className="panel-heading"><div><h2>Discovery conversation</h2><p>AI-guided interview · Session 01</p></div><Badge tone="success"><span className="live-dot"/> Live</Badge></div>
          <div className="messages">{messages.map((m, i) => <div className={`message ${m.role}`} key={i}>{m.role === 'ai' ? <div className="bot-avatar"><Bot size={17}/></div> : <div className="avatar small">M</div>}<div><div className="message-meta">{m.role === 'ai' ? 'Nova · Requirements Analyst' : 'You'} <span>{i < 2 ? '10:2' + i + ' AM' : 'Now'}</span></div><div className="bubble">{m.text}</div></div></div>)}</div>
          <div className="composer"><textarea aria-label="Requirement reply" value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => {if(e.key === 'Enter' && !e.shiftKey){e.preventDefault();send()}}} placeholder="Describe a requirement, constraint, or concern..."/><div><span><Sparkles size={14}/> AI will analyze your response</span><button onClick={send}><Send size={16}/> Send</button></div></div>
        </div>
        <div className="insights">
          <div className="readiness"><div className="section-label">SPECIFICATION READINESS</div><div className="score-row"><strong>{score}<small>%</small></strong><div className="ring"><span>{score}%</span></div></div><div className="progress"><i style={{width: `${score}%`}}/></div><p>Strong foundation. Resolve open questions to prepare the SRS.</p></div>
          <div className="panel gaps"><div className="panel-heading"><div><h2>Needs clarification</h2><p>2 open items detected</p></div><CircleAlert size={19} color="#e89c35"/></div><article><Badge tone="warning">Ambiguity</Badge><h3>Event capacity policy</h3><p>What should happen when an event reaches its maximum number of registrations?</p><button onClick={() => setDraft('When an event is full, students should be able to join a waitlist and receive a notification if a spot opens.')}>Answer this <ChevronRight size={15}/></button></article><article><Badge tone="purple">Missing detail</Badge><h3>Authentication method</h3><p>Should users sign in with their university email or a separate account?</p><button onClick={() => setDraft('Users must sign in through university single sign-on using their official email address.')}>Answer this <ChevronRight size={15}/></button></article></div>
          <div className="panel prompt-card"><div className="prompt-icon"><WandSparkles size={17}/></div><div><h3>Prompt workflow active</h3><p>Role + structured follow-up + ambiguity scan</p></div><button onClick={() => setActive('Prompt Lab')}>View</button></div>
        </div>
      </section> : <section className="studio">
        <div className="studio-hero"><div><Badge tone="purple">AI-GENERATED · REVIEW READY</Badge><h2>{active === 'SRS Studio' ? 'Campus Connect — Software Requirements Specification' : active === 'Prompt Lab' ? 'Prompt Workflow Lab' : 'Project intelligence overview'}</h2><p>{active === 'SRS Studio' ? 'IEEE-inspired specification · Version 0.4 · Updated just now' : 'A focused workspace for reliable, transparent requirements.'}</p></div><button className="export" onClick={exportSrs}><Download size={16}/> Export document</button></div>
        {active === 'SRS Studio' ? <><div className="tabs">{['Requirements','Traceability','Versions'].map(x => <button onClick={() => setTab(x)} className={tab===x?'selected':''} key={x}>{x}</button>)}</div>{tab === 'Requirements' ? <div className="table-card"><div className="table-header"><h3>Validated requirements</h3><button><Plus size={15}/> Add requirement</button></div><table><thead><tr><th>ID</th><th>Requirement</th><th>Type</th><th>Priority</th><th>Status</th></tr></thead><tbody>{requirements.map(r => <tr className={selectedRequirement===r[0]?'selected-row':''} onClick={() => setSelectedRequirement(r[0])} key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td><td><Badge tone={r[3] === 'High' ? 'danger':'neutral'}>{r[3]}</Badge></td><td><Badge tone="success"><Check size={12}/> Validated</Badge></td></tr>)}</tbody></table></div> : <div className="empty-card"><FileText size={28}/><h3>{tab} view</h3><p>Trace each requirement from stakeholder need to acceptance criteria and release version.</p></div>}</> : <div className="overview-grid"><div className="metric"><span>REQUIREMENTS CAPTURED</span><strong>18</strong><small><Check size={13}/> 5 validated</small></div><div className="metric"><span>OPEN QUESTIONS</span><strong>2</strong><small className="amber"><CircleAlert size={13}/> Needs attention</small></div><div className="metric"><span>TRACEABILITY</span><strong>94%</strong><small><Check size={13}/> Well linked</small></div><div className="workflow"><div className="prompt-icon"><WandSparkles size={19}/></div><h3>Prompt refinement</h3><p>Compare prompt versions, inspect AI output, and promote the clearest workflow.</p><button className="outline" onClick={() => setActive('Prompt Lab')}>Open Prompt Lab</button></div></div>}</section>}
    </main>
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
