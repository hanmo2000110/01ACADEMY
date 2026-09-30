const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const phaseNames = {explore:'도구 탐험',personal:'나의 프로젝트',team:'우리의 프로젝트'};
if (document.querySelector('#projects')) document.querySelector('#projects').innerHTML = academyContent.projects.map(([icon,type,title,description]) => `<article class="project-card"><div class="project-top"><span class="project-icon" aria-hidden="true">${icon}</span><span class="project-type">${type}</span></div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></article>`).join('') + '<p class="fine" style="grid-column:1/-1;margin:0">수업에서 만들어볼 수 있는 결과물 예시입니다. 실제 학생 작품은 공개 동의를 확인한 후 소개할 예정입니다.</p>';
if (document.querySelector('#weeks')) document.querySelector('#weeks').innerHTML = academyContent.weeks.map((week,i) => `<button class="week-card" data-week="${i}" data-phase="${week.phase}" aria-haspopup="dialog"><div class="week-meta"><span class="week-number">WEEK ${String(i+1).padStart(2,'0')}</span><span class="week-phase">${phaseNames[week.phase]}</span></div><h3>${escapeHtml(week.title)}</h3><p>${escapeHtml(week.description)}</p><div class="week-output">완성할 것 · ${escapeHtml(week.output)}</div></button>`).join('');
if (document.querySelector('#faqs')) document.querySelector('#faqs').innerHTML = academyContent.faqs.map(([q,a])=>`<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join('');
document.querySelectorAll('.phase-tabs button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.phase-tabs button').forEach(item => item.setAttribute('aria-pressed',String(item===button)));
  document.querySelectorAll('.week-card').forEach(card => card.hidden = button.dataset.phase !== 'all' && card.dataset.phase !== button.dataset.phase);
}));
const dialog = document.querySelector('#week-dialog');
document.querySelectorAll('.week-card').forEach(button => button.addEventListener('click', () => {
  const index = Number(button.dataset.week), week = academyContent.weeks[index];
  document.querySelector('#dialog-content').innerHTML = `<p class="eyebrow">WEEK ${String(index+1).padStart(2,'0')} · ${phaseNames[week.phase]}</p><h2 id="dialog-title">${escapeHtml(week.title)}</h2><p>${escapeHtml(week.description)}</p><h3>함께할 활동</h3><ul>${week.activities.map(a=>`<li>${escapeHtml(a)}</li>`).join('')}</ul><h3>이번 주 미션</h3><p>${escapeHtml(week.mission)}</p><p class="output"><strong>완성할 것</strong><br>${escapeHtml(week.output)}</p><h3>수업 준비</h3><p>${escapeHtml(week.prepare || '노트북과 충전기 지참을 권장합니다. 사용할 서비스와 계정, 자료 링크는 해당 수업 전에 안내합니다.')}</p><p class="fine">현재의 수업 구성안입니다. 세부 활동은 진행 상황에 따라 조정될 수 있습니다.</p>`;
  dialog.showModal();
}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
