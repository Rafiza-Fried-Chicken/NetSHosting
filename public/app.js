// Small client helpers shared across pages
(function(){
// set year across pages if element exists
['year','year2','year3','year4','year5','year6','year7'].forEach(id=>{
const el = document.getElementById(id); if(el) el.textContent = new Date().getFullYear();
});


// mobile nav toggle
document.querySelectorAll('.nav-toggle').forEach(btn=>{
btn.addEventListener('click', ()=>{
const nav = document.querySelector('.nav'); if(!nav) return; nav.classList.toggle('show');
});
});


// Domain search demo
const domainBtn = document.getElementById('domainBtn');
if(domainBtn){
domainBtn.addEventListener('click', ()=>{
const input = document.getElementById('domainInput');
const q = (input.value||'').trim();
const out = document.getElementById('domainResult');
if(!q) { out.textContent='Please enter a domain name.'; return; }
const tlds=['.com','.net','.io'];
out.innerHTML = 'Suggestions: <strong>'+tlds.map(t=>q+t).join(', ')+'</strong>';
});
}


// Support/contact forms (mock)
const supportForm = document.getElementById('supportForm');
if(supportForm){ supportForm.addEventListener('submit', e=>{ e.preventDefault(); document.getElementById('supportMsg').textContent='Ticket received. We will contact you shortly.'; supportForm.reset(); }); }
const contactForm = document.getElementById('contactForm');
if(contactForm){ contactForm.addEventListener('submit', e=>{ e.preventDefault(); document.getElementById('contactMsg').textContent='Thanks! Sales will contact you soon.'; contactForm.reset(); }); }


// Upload handler (cloud.html)
const uploadForm = document.getElementById('uploadForm');
if(uploadForm){
uploadForm.addEventListener('submit', async (e)=>{
e.preventDefault();
const fileInput = document.getElementById('fileInput');
const resultEl = document.getElementById('uploadResult');
if(!fileInput || !fileInput.files.length) { resultEl.textContent='Please choose a file.'; return; }
const file = fileInput.files[0];
const fd = new FormData(); fd.append('file', file);
resultEl.textContent = 'Uploading...';
try{
const res = await fetch('/api/upload', { method:'POST', body: fd });
if(!res.ok) throw new Error('Upload failed');
const data = await res.json();
// if storage returns url, show it; otherwise show id
if(data.url) resultEl.innerHTML = `Uploaded: <a href="${data.url}" target="_blank">${data.url}</a>`;
else resultEl.innerHTML = `Uploaded: <code>${data.id}</code> (no public URL)`;
}catch(err){ resultEl.textContent = 'Upload error: '+err.message; }
});
}
})();
