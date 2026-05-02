 
 window.onbeforeunload = () => window.scrollTo(0, 0);

 document.getElementById('chatForm').addEventListener('submit', function(e) 
 {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        document.getElementById('successBanner').classList.add('show');
        this.reset();
        setTimeout(() => document.getElementById('successBanner').classList.remove('show'), 6000);
      }, 1500);
    });