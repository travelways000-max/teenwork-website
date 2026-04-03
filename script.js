<script>
  // ── NAVIGATION & SLIDE LOGIC ──
  const navLinks = document.querySelectorAll('.nav-links a, .hero-actions a');
  const sections = document.querySelectorAll('section');
  const hero = document.querySelector('.hero');

  function showSlide(targetId) {
    const targetSection = document.querySelector(targetId);
    
    if (!targetSection) return;

    // 1. Hide Hero if we are moving to a specific section
    hero.classList.add('hidden');

    // 2. Remove active class from all sections
    sections.forEach(s => s.classList.remove('active-slide'));

    // 3. Show target section
    targetSection.classList.add('active-slide');

    // 4. Update Nav Link styling
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.style.color = link.getAttribute('href') === targetId ? 'var(--amber)' : 'var(--muted)';
    });

    // Scroll to top of the new "slide"
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Listen for clicks on nav items
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        history.pushState(null, null, href); // Update URL without jumping
        showSlide(href);
      }
    });
  });

  // Handle Logo click to go back to "Home" (Hero)
  document.querySelector('.logo').style.cursor = 'pointer';
  document.querySelector('.logo').addEventListener('click', () => {
    hero.classList.remove('hidden');
    sections.forEach(s => s.classList.remove('active-slide'));
    history.pushState(null, null, ' ');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash;
    if (hash) {
      showSlide(hash);
    } else {
      hero.classList.remove('hidden');
      sections.forEach(s => s.classList.remove('active-slide'));
    }
  });

  // Initialize if user loads page with a hash (e.g., index.html#explore)
  if (window.location.hash) {
    showSlide(window.location.hash);
  }

  // ── PRE-EXISTING LOGIC (Form & Chips) ──
  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  function handleSubmit() {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const type = document.getElementById('ftype').value;
    const msg = document.getElementById('fmsg').value.trim();

    if (!name || !email || !msg) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    const subject = encodeURIComponent(`WorkFlowConnect Inquiry: ${type || 'General'} from ${name}`);
    const body = encodeURIComponent(`Hi,\n\nName: ${name}\nEmail: ${email}\nReason: ${type}\n\nMessage:\n${msg}\n\n— Sent via WorkFlowConnect`);

    window.location.href = `mailto:travelways000@gmail.com?subject=${subject}&body=${body}`;

    document.getElementById('successMsg').style.display = 'block';
    // Clear form
    ['fname', 'femail', 'fmsg'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('ftype').value = '';
  }
</script>
