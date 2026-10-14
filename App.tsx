import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'profiles' | 'contact';

type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
};

const sections: { id: SectionId; label: string; kicker: string }[] = [
  { id: 'home', label: 'Home', kicker: '00 / Intro' },
  { id: 'about', label: 'About Me', kicker: '01 / Story' },
  { id: 'skills', label: 'Skills', kicker: '02 / Toolkit' },
  { id: 'projects', label: 'Projects', kicker: '03 / Work' },
  { id: 'profiles', label: 'Profiles', kicker: '04 / Signals' },
  { id: 'contact', label: 'Contact', kicker: '05 / Connect' },
];

const resumeProjects = [
  {
    number: '01',
    title: 'Cryptographic Chat Application',
    meta: 'Python · Socket Programming · Fernet',
    date: 'May 2026',
    copy: 'A TCP client-server chat application with end-to-end encrypted messaging, multithreaded send/receive handling, and a documented modular CLI architecture.',
    accent: 'copper',
  },
  {
    number: '02',
    title: 'Python Security Tools',
    meta: 'Python · Networking · Socket Programming',
    date: 'Jun 2026',
    copy: 'A set of authorized-environment security utilities: a multi-port scanner for open services and a WiFi password auditor focused on practical security learning.',
    accent: 'aqua',
  },
];

const skillGroups = [
  { label: 'Programming Languages', values: ['Python', 'Java', 'C', 'C# (Basic)'], tone: 'copper' },
  { label: 'Database', values: ['MySQL (Basic)'], tone: 'aqua' },
  { label: 'Core Computer Science', values: ['Data Structures', 'Algorithms', 'Object-Oriented Programming', 'Problem Solving'], tone: 'cream' },
  { label: 'Tools', values: ['Git', 'GitHub', 'VS Code'], tone: 'copper' },
];

const profileLinks = [
  { label: 'GitHub', handle: '@parimalanagar07', description: 'Public repositories, experiments, and work in progress.', href: 'https://github.com/parimalanagar07', icon: 'GH' },
  { label: 'LinkedIn', handle: 'Parimala Devi', description: 'Professional profile and learning journey.', href: 'https://www.linkedin.com/in/parimala-devi-bb4a8b383/', icon: 'in' },
  { label: 'LeetCode', handle: '@parimala_07', description: 'Consistent practice, algorithmic thinking, and problem solving.', href: 'https://leetcode.com/u/parimala_07/', icon: 'LC' },
];

function AvatarStage() {
  return (
    <div className="avatar-stage" aria-label="Static sculptural avatar illustration">
      <div className="avatar-halo" />
      <div className="avatar-orbit avatar-orbit-one" />
      <div className="avatar-orbit avatar-orbit-two" />
      <div className="avatar-card-note note-top"><span>01</span><strong>Imagine<br />Build<br />Evolve</strong></div>
      <div className="avatar-card-note note-bottom"><span className="note-star">✦</span><strong>Purpose-led<br />digital craft</strong></div>
      <div className="avatar-sculpture">
        <div className="avatar-neck" />
        <div className="avatar-head">
          <div className="avatar-face" />
          <div className="avatar-mask" />
          <div className="avatar-ear left" />
          <div className="avatar-ear right" />
        </div>
        <div className="avatar-body"><div className="body-cut" /></div>
        <div className="avatar-shoulder" />
      </div>
      <div className="avatar-caption"><span className="status-dot" /> Static portrait study</div>
    </div>
  );
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return <span aria-hidden="true" className={`arrow arrow-${direction}`}>{direction === 'left' ? '←' : '→'}</span>;
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [githubStatus, setGithubStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [formState, setFormState] = useState<'idle' | 'sent' | 'invalid'>('idle');
  const touchStartX = useRef<number | null>(null);
  const lastWheelMove = useRef(0);
  const active = sections[activeIndex];

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/users/parimalanagar07/repos?per_page=100&sort=updated', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub unavailable');
        return response.json() as Promise<GithubRepo[]>;
      })
      .then((data) => {
        setRepos(data.filter((repo) => !repo.fork));
        setGithubStatus('ready');
      })
      .catch(() => {
        if (!controller.signal.aborted) setGithubStatus('error');
      });
    return () => controller.abort();
  }, []);

  const projectItems = useMemo(() => {
    const liveItems = repos.slice(0, 4).map((repo, index) => ({
      number: String(index + 3).padStart(2, '0'),
      title: repo.name,
      meta: repo.language || 'Public GitHub repository',
      date: new Date(repo.updated_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      copy: repo.description || 'Public repository from Parimala Devi’s GitHub profile.',
      accent: index % 2 === 0 ? 'copper' : 'aqua',
      href: repo.html_url,
      stars: repo.stargazers_count,
    }));
    return [...resumeProjects, ...liveItems];
  }, [repos]);

  const goTo = (index: number) => setActiveIndex((index + sections.length) % sections.length);
  const next = () => goTo(activeIndex + 1);
  const previous = () => goTo(activeIndex - 1);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, [contenteditable="true"]')) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        next();
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        previous();
      } else if (event.key === 'Home') {
        event.preventDefault();
        goTo(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goTo(sections.length - 1);
      }
    };
    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('.project-rail, .contact-form')) return;
      const now = Date.now();
      if (now - lastWheelMove.current < 650 || Math.abs(event.deltaY) < 24) return;
      lastWheelMove.current = now;
      event.deltaY > 0 ? next() : previous();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartX.current = event.changedTouches[0]?.clientX ?? null;
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartX.current === null) return;
      const distance = event.changedTouches[0]?.clientX - touchStartX.current;
      if (Math.abs(distance) > 48) distance < 0 ? next() : previous();
      touchStartX.current = null;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeIndex]);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !email.includes('@') || !message) {
      setFormState('invalid');
      return;
    }
    setFormState('sent');
    window.location.href = `mailto:parimalanagar07@gmail.com?subject=${encodeURIComponent(`Portfolio message from ${name}`)}&body=${encodeURIComponent(`${message}\n\nReply to: ${email}`)}`;
  };

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="leaf-cluster leaf-one" aria-hidden="true"><i /><i /><i /></div>
      <div className="leaf-cluster leaf-two" aria-hidden="true"><i /><i /><i /></div>
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <button className="wordmark" onClick={() => goTo(0)} aria-label="Parimaladevi N, go to Home">
          <span className="wordmark-mark">PD</span>
          <span className="wordmark-name">Parimaladevi <em>N</em></span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {sections.map((section, index) => (
            <button key={section.id} className={index === activeIndex ? 'nav-link active' : 'nav-link'} onClick={() => goTo(index)} aria-current={index === activeIndex ? 'page' : undefined}>
              <span>{section.label}</span><small>{String(index).padStart(2, '0')}</small>
            </button>
          ))}
        </nav>
        <a className="header-cta" href="mailto:parimalanagar07@gmail.com">Start a conversation <span>↗</span></a>
      </header>

      <div className="mobile-nav" role="tablist" aria-label="Portfolio sections">
        {sections.map((section, index) => (
          <button key={section.id} className={index === activeIndex ? 'mobile-dot active' : 'mobile-dot'} onClick={() => goTo(index)} aria-label={`Go to ${section.label}`} aria-selected={index === activeIndex} />
        ))}
      </div>

      <section key={active.id} className={`slide slide-${active.id}`} aria-labelledby={`${active.id}-title`}>
        <div className="slide-index"><span>{active.kicker}</span><b>{String(activeIndex + 1).padStart(2, '0')} / 06</b></div>

        {active.id === 'home' && (
          <div className="home-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> Developer · Creative thinker · Problem solver</p>
              <h1 id="home-title">Hello, I’m<br /><span>Parimala</span> <em>Devi.</em></h1>
              <p className="hero-lede">B.Tech Information Technology student building thoughtful Python tools, learning cybersecurity, and turning complex problems into clear next steps.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => goTo(3)}>Explore my work <Arrow direction="right" /></button>
                <button className="button button-ghost" onClick={() => goTo(5)}>Let’s connect <Arrow direction="right" /></button>
              </div>
              <div className="hero-meta"><span>Based in India</span><i /><span>Available for opportunities</span></div>
            </div>
            <AvatarStage />
          </div>
        )}

        {active.id === 'about' && (
          <div className="content-layout about-layout">
            <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> 01 / About</p><h2 id="about-title">Curious by nature.<br /><em>Careful</em> by craft.</h2></div>
            <div className="about-copy"><p className="lead-copy">I’m a motivated Information Technology student seeking an entry-level Python Developer opportunity. My work sits at the intersection of systems thinking, problem solving, and a steady willingness to learn.</p><p>I enjoy building hands-on tools that make abstract concepts tangible — from encrypted client-server communication to practical network security utilities. I’m currently pursuing my B.Tech at VSB College of Engineering & Technical Campus, Coimbatore.</p><div className="about-stats"><div><strong>8.50</strong><span>CGPA / 10</span></div><div><strong>2025–29</strong><span>B.Tech · IT</span></div><div><strong>02</strong><span>Resume projects</span></div></div></div>
            <div className="about-quote"><span>“</span><p>Build with clarity.<br />Grow with intent.</p><small>— a working principle</small></div>
          </div>
        )}

        {active.id === 'skills' && (
          <div className="content-layout skills-layout"><div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> 02 / Toolkit</p><h2 id="skills-title">The tools<br /><em>behind</em> the work.</h2><p className="heading-note">A grounded toolkit from coursework, internships, and practical builds.</p></div><div className="skills-grid">{skillGroups.map((group) => <article className={`skill-card skill-${group.tone}`} key={group.label}><div className="skill-card-top"><span className="skill-index">0{skillGroups.indexOf(group) + 1}</span><span className="skill-dot" /></div><h3>{group.label}</h3><ul>{group.values.map((value) => <li key={value}>{value}</li>)}</ul></article>)}</div></div>
        )}

        {active.id === 'projects' && (
          <div className="content-layout projects-layout"><div className="section-heading projects-heading"><p className="eyebrow"><span className="eyebrow-line" /> 03 / Selected work</p><h2 id="projects-title">Made to be<br /><em>useful.</em></h2><p className="heading-note">Resume-backed work first. Public GitHub repositories appear here when the live feed is available.</p></div><div className="project-rail">{projectItems.map((project) => <article className={`project-card project-${project.accent}`} key={`${project.number}-${project.title}`}><div className="project-card-header"><span>{project.number}</span><span>{project.date}</span></div><div><h3>{project.title}</h3><p className="project-meta">{project.meta}</p><p className="project-copy">{project.copy}</p></div>{'href' in project && <a className="text-link" href={String(project.href)} target="_blank" rel="noreferrer">View repository <span>↗</span></a>}</article>)}</div><div className="github-status"><span className={githubStatus === 'loading' ? 'pulse-dot' : githubStatus === 'ready' ? 'status-dot' : 'status-dot status-error'} />{githubStatus === 'loading' ? 'Checking public GitHub repositories…' : githubStatus === 'ready' ? `${repos.length} public repositories available from GitHub.` : 'GitHub is unavailable right now; showing verified resume projects.'}</div></div>
        )}

        {active.id === 'profiles' && (
          <div className="content-layout profiles-layout"><div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> 04 / Signals</p><h2 id="profiles-title">Find me<br /><em>in the wild.</em></h2><p className="heading-note">The best way to see what I’m learning is to follow the trail.</p></div><div className="profile-list">{profileLinks.map((profile) => <a className="profile-card" href={profile.href} target="_blank" rel="noreferrer" key={profile.label}><span className="profile-icon">{profile.icon}</span><span className="profile-text"><strong>{profile.label}</strong><b>{profile.handle}</b><small>{profile.description}</small></span><span className="profile-arrow">↗</span></a>)}</div></div>
        )}

        {active.id === 'contact' && (
          <div className="content-layout contact-layout"><div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> 05 / Contact</p><h2 id="contact-title">Let’s make<br /><em>something clear.</em></h2><p className="heading-note">For a role, collaboration, or simply a thoughtful conversation, send a note.</p><a className="email-link" href="mailto:parimalanagar07@gmail.com">parimalanagar07@gmail.com <span>↗</span></a></div><form className="contact-form" onSubmit={handleContactSubmit} noValidate><label>Your name<input name="name" placeholder="Name" autoComplete="name" /></label><label>Email address<input name="email" type="email" placeholder="your.email@example.com" autoComplete="email" /></label><label>Message<textarea name="message" placeholder="A few words about your project or opportunity…" rows={4} /></label><button className="button button-primary" type="submit">{formState === 'sent' ? 'Opening your mail app' : 'Send message'} <Arrow direction="right" /></button>{formState === 'invalid' && <p className="form-note error">Please add your name, a valid email, and a short message.</p>}{formState === 'sent' && <p className="form-note">Your default mail app should open with a prepared message.</p>}</form></div>
        )}
      </section>

      <footer className="site-footer"><button className="scroll-cue" onClick={next}><span className="scroll-cue-line" /> Scroll to discover</button><div className="footer-controls"><button onClick={previous} aria-label="Previous section"><Arrow direction="left" /></button><div className="progress-track"><span style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }} /></div><button onClick={next} aria-label="Next section"><Arrow direction="right" /></button></div><span className="footer-note">© 2026 · Crafted with purpose</span></footer>
      <div className="edge-control edge-left"><button onClick={previous} aria-label="Previous section"><Arrow direction="left" /></button></div><div className="edge-control edge-right"><button onClick={next} aria-label="Next section"><Arrow direction="right" /></button></div>
    </main>
  );
}

export default App;
