(function(){
  const catalog = [
    { id:'fetch_inbox', name:'Fetch inbox', input:'none', output:'emails[]'},
    { id:'classify_messages', name:'Classify messages', input:'emails[]', output:'classifiedEmails[]'},
    { id:'apply_labels', name:'Apply labels', input:'classifiedEmails[]', output:'classifiedEmails[]'},
    { id:'route_to_queue', name:'Route to queues', input:'classifiedEmails[]', output:'routedItems[]'},
    { id:'send_auto_reply', name:'Send auto-replies', input:'routedItems[]', output:'notifications[]'},
    { id:'check_availability', name:'Check availability', input:'calendar', output:'slots[]'},
    { id:'find_shared_slot', name:'Find shared slot', input:'slots[]', output:'slot'},
    { id:'create_crm', name:'Create CRM record', input:'form', output:'contact'},
  ];

  let flow = { id:'flow_1', name:'Untitled flow', steps:[] };
  let selectedIndex = -1;

  const catalogList = document.getElementById('catalogList');
  const canvasList = document.getElementById('canvasList');
  const formEditor = document.getElementById('formEditor');
  const jsonEditor = document.getElementById('jsonEditor');
  const editorMode = document.getElementById('editorMode');
  const validateBtn = document.getElementById('validateBtn');
  const runBtn = document.getElementById('runBtn');
  const validationResult = document.getElementById('validationResult');
  const addSample = document.getElementById('addSample');
  const saveJson = document.getElementById('saveJson');
  const exportJson = document.getElementById('exportJson');

  function renderCatalog(){
    catalogList.innerHTML = catalog.map(function(item){
      return '<div class="step"><div><strong>'+escapeHtml(item.name)+'</strong><div style="font-size:12px;color:#6b7280">in: '+escapeHtml(item.input)+' → out: '+escapeHtml(item.output)+'</div></div><div><button class="btn ghost" data-id="'+item.id+'">Add</button></div></div>';
    }).join('');
    catalogList.querySelectorAll('button[data-id]').forEach(b=>b.addEventListener('click',function(e){
      const id = e.currentTarget.getAttribute('data-id');
      const item = catalog.find(c=>c.id===id);
      if(item){ flow.steps.push({ id: item.id, name: item.name, input: item.input, output: item.output }); renderCanvas(); selectStep(flow.steps.length-1); }
    }));
  }

  function renderCanvas(){
    if(flow.steps.length===0){ canvasList.innerHTML = '<div style="padding:20px;color:#6b7280">Canvas is empty. Add steps from the catalog.</div>'; return; }
    canvasList.innerHTML = flow.steps.map((s,i)=>'<div class="node" data-index="'+i+'"><div style="display:flex;justify-content:space-between"><div><strong>'+escapeHtml(s.name)+'</strong><div style="font-size:12px;color:#6b7280">in:'+escapeHtml(s.input)+' → out:'+escapeHtml(s.output)+'</div></div><div><button data-action="edit" data-index="'+i+'" class="btn ghost">Edit</button> <button data-action="remove" data-index="'+i+'" class="btn ghost">Remove</button></div></div></div>').join('');
    canvasList.querySelectorAll('button[data-action]').forEach(b=>b.addEventListener('click',function(e){
      const idx = parseInt(e.currentTarget.getAttribute('data-index'),10);
      const action = e.currentTarget.getAttribute('data-action');
      if(action==='edit') selectStep(idx);
      else if(action==='remove'){ flow.steps.splice(idx,1); if(selectedIndex===idx) selectedIndex=-1; renderCanvas(); renderEditor(); }
    }));
  }

  function escapeHtml(text){ return String(text||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

  function selectStep(i){ selectedIndex = i; renderEditor(); }

  function renderEditor(){
    if(editorMode.value==='json'){
      formEditor.style.display='none';
      jsonEditor.style.display='block';
      jsonEditor.value = JSON.stringify(flow,null,2);
      return;
    }
    jsonEditor.style.display='none';
    formEditor.style.display='block';
    if(selectedIndex<0 || !flow.steps[selectedIndex]){
      formEditor.innerHTML = '<div style="color:#6b7280">Select a step to edit or add one from the catalog.</div>';
      return;
    }
    const s = flow.steps[selectedIndex];
    formEditor.innerHTML = ''+
      '<div class="field"><label>Name</label><input id="stepName" class="input" value="'+escapeHtml(s.name)+'" /></div>'+
      '<div class="field"><label>Input type (simple)</label><input id="stepInput" class="input" value="'+escapeHtml(s.input)+'" /></div>'+
      '<div class="field"><label>Output type (simple)</label><input id="stepOutput" class="input" value="'+escapeHtml(s.output)+'" /></div>'+
      '<div style="display:flex;gap:8px"><button id="saveStep" class="btn">Save</button><button id="moveUp" class="btn ghost">Move up</button><button id="moveDown" class="btn ghost">Move down</button></div>';
    document.getElementById('saveStep').addEventListener('click',()=>{
      const name = document.getElementById('stepName').value.trim();
      const input = document.getElementById('stepInput').value.trim() || 'none';
      const output = document.getElementById('stepOutput').value.trim() || 'none';
      flow.steps[selectedIndex].name = name || flow.steps[selectedIndex].name;
      flow.steps[selectedIndex].input = input;
      flow.steps[selectedIndex].output = output;
      renderCanvas(); renderEditor();
    });
    document.getElementById('moveUp').addEventListener('click',()=>{
      if(selectedIndex>0){ const s = flow.steps.splice(selectedIndex,1)[0]; flow.steps.splice(selectedIndex-1,0,s); selectedIndex--; renderCanvas(); renderEditor(); }
    });
    document.getElementById('moveDown').addEventListener('click',()=>{
      if(selectedIndex<flow.steps.length-1){ const s = flow.steps.splice(selectedIndex,1)[0]; flow.steps.splice(selectedIndex+1,0,s); selectedIndex++; renderCanvas(); renderEditor(); }
    });
  }

  function parseSimpleType(spec){
    // spec like 'emails[]' or 'slot' or 'none' or 'object{name:string,age:number}'
    if(!spec) return { kind:'none' };
    if(spec==='none') return { kind:'none' };
    if(spec.endsWith('[]')) return { kind:'array', item: spec.slice(0,-2) };
    // object shorthand
    if(spec.indexOf('{')>0){ // very small parse
      try{ const body = spec.slice(spec.indexOf('{')+1, spec.lastIndexOf('}')); const parts = body.split(',').map(p=>p.trim()).filter(Boolean); const props={}; parts.forEach(p=>{ const kv=p.split(':').map(x=>x.trim()); props[kv[0]]=kv[1]; }); return { kind:'object', props }; }catch(e){}
    }
    return { kind:'primitive', name:spec };
  }

  function typesCompatible(outSpec, inSpec){
    const a = parseSimpleType(outSpec);
    const b = parseSimpleType(inSpec);
    // none means nothing
    if(a.kind==='none' && b.kind==='none') return true;
    if(a.kind==='none' && b.kind!=='none') return false;
    // array vs array
    if(a.kind==='array' && b.kind==='array') return a.item===b.item;
    if(a.kind==='array' && b.kind!=='array') return false;
    if(a.kind==='primitive' && b.kind==='primitive') return a.name===b.name;
    if(a.kind==='object' && b.kind==='object'){
      // require that b's props are subset of a's props (i.e., output has required fields for input)
      for(const k in b.props){ if(!(k in a.props) || a.props[k]!==b.props[k]) return false; }
      return true;
    }
    // allow primitive -> object? false
    return false;
  }

  function validateFlow(f){
    if(!f.steps || f.steps.length===0) return { ok:false, message:'No steps defined' };
    for(let i=0;i<f.steps.length-1;i++){
      const cur = f.steps[i]; const next = f.steps[i+1];
      if(!typesCompatible(cur.output, next.input)){
        return { ok:false, index:i+1, message:'Type mismatch: step "'+next.name+'" expects '+next.input+' but previous step outputs '+cur.output };
      }
    }
    return { ok:true, message:'All step types align' };
  }

  validateBtn.addEventListener('click',()=>{
    const res = validateFlow(flow);
    if(res.ok){ validationResult.textContent = res.message; validationResult.className='status-ok'; }
    else{ validationResult.textContent = (res.index?('Problem at step '+res.index+': '):'')+res.message; validationResult.className='status-bad'; }
  });

  runBtn.addEventListener('click',()=>{
    const res = validateFlow(flow);
    if(!res.ok){ validationResult.textContent = 'Cannot run: '+res.message; validationResult.className='status-bad'; return; }
    validationResult.textContent = 'Simulated run: all steps executed successfully'; validationResult.className='status-ok';
  });

  editorMode.addEventListener('change',()=>{ renderEditor(); });

  addSample.addEventListener('click',()=>{
    flow = { id:'sample', name:'Inbox triage', steps:[
      { id:'fetch_inbox', name:'Fetch inbox', input:'none', output:'emails[]' },
      { id:'classify_messages', name:'Classify messages', input:'emails[]', output:'classifiedEmails[]' },
      { id:'apply_labels', name:'Apply labels', input:'classifiedEmails[]', output:'classifiedEmails[]' },
      { id:'route_to_queue', name:'Route to queues', input:'classifiedEmails[]', output:'routedItems[]' }
    ] };
    selectedIndex = -1; renderCanvas(); renderEditor();
  });

  saveJson.addEventListener('click',()=>{
    try{
      const parsed = JSON.parse(jsonEditor.value);
      if(!parsed.steps) throw new Error('Missing steps array');
      flow = parsed; selectedIndex = -1; renderCanvas(); renderEditor(); validationResult.textContent='JSON saved'; validationResult.className='status-ok';
    }catch(e){ validationResult.textContent='Invalid JSON: '+e.message; validationResult.className='status-bad'; }
  });

  exportJson.addEventListener('click',()=>{ const blob = new Blob([JSON.stringify(flow,null,2)],{type:'application/json'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=(flow.id||'flow')+'.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); });

  // initial
  renderCatalog(); renderCanvas(); renderEditor();
})();
