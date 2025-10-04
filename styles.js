const styleMain = (main) => {
    main.style.display = 'flex';
    main.style.justifyContent = 'center';
    main.style.alignItems = 'center';
    main.style.flexDirection = 'column';
    main.style.width = '100%';
}

const styleBody = (body) => {
    body.style.minHeight = '100vh';
    body.style.display = 'flex';
    body.style.alignItems = 'center';
    body.style.flexDirection = 'column';
    body.style.padding = '10px';
    body.style.margin = '0';
    body.style.backgroundColor = '#E8E6E6';
}

const styleH1 = (h1) => {
    h1.style.textTransform = 'uppercase';
    h1.style.fontSize = 'clamp(24px, 5vw, 40px)';
    h1.style.textAlign = 'center';
    h1.style.margin = '10px 0';
    h1.style.color = '#333';
}

const styleDateSpan = (span) => {
    span.style.fontWeight = '600';
    span.style.textAlign = 'center';
    span.style.display = 'block';
    span.style.width = '100%';
    span.style.padding = '10px 0';
    span.style.fontSize = 'clamp(14px, 3vw, 16px)';
    span.style.color = '#666';
};

const styleSection = (section) => {
    section.style.width = 'min(95%, 900px)';
    section.style.display = 'flex';
    section.style.flexDirection = 'column';
    section.style.gap = '15px';
    section.style.border = '2px solid grey';
    section.style.borderRadius = '10px';
    section.style.boxShadow = '0 .5rem 1rem rgba(0, 0, 0, 0.1)';
    section.style.padding = 'clamp(15px, 3vw, 25px)';
    section.style.boxSizing = 'border-box';
    section.style.backgroundColor = 'white';
    section.style.margin = '10px 0';
}

const styleForm = (form) => {
    form.style.display = 'flex';
    form.style.gap = '10px';
    form.style.alignItems = 'center';
    form.style.justifyContent = 'center';
    form.style.flexWrap = 'wrap';
}

const styleInput = (input) => {
    input.style.boxSizing = 'border-box';
    input.style.width = 'clamp(200px, 50%, 400px)';
    input.style.background = 'none';
    input.style.padding = '12px 20px';
    input.style.border = '1px solid grey';
    input.style.borderRadius = '1000px';
    input.style.height = '48px';
    input.style.fontSize = '16px';
    input.style.flex = '1 1 auto';
    input.style.minWidth = '150px';
}

const styleInputDate = (input) => {
    input.style.boxSizing = 'border-box';
    input.style.width = 'clamp(150px, 30%, 250px)';
    input.style.background = 'none';
    input.style.padding = '12px 20px';
    input.style.border = '1px solid grey';
    input.style.borderRadius = '1000px';
    input.style.height = '48px';
    input.style.fontSize = '16px';
    input.style.flex = '0 1 auto';
}

const styleAddButton = (addBtn) => {
    addBtn.style.boxSizing = 'border-box';
    addBtn.style.background = 'none';
    addBtn.style.padding = '12px';
    addBtn.style.border = '1px solid grey';
    addBtn.style.borderRadius = '1000px';
    addBtn.style.height = '48px';
    addBtn.style.width = '48px';
    addBtn.style.display = 'flex';
    addBtn.style.justifyContent = 'center';
    addBtn.style.alignItems = 'center';
    addBtn.style.cursor = 'pointer';
}

const styleTableHeaders = (th) => {
    th.style.padding = '12px 8px';
    th.style.textAlign = 'center';
    th.style.borderBottom = '2px solid grey';
    th.style.fontWeight = '700';
    th.style.backgroundColor = '#f8f9fa';
}

const styleTableCell = (td) => {
    td.style.padding = 'clamp(8px, 2vw, 12px)';
    td.style.textAlign = 'center';
    td.style.borderBottom = '1px solid #eee';
    td.style.verticalAlign = 'middle';
}

const styleTextArea = (textarea) => {
    textarea.style.width = '100%';
    textarea.style.border = 'none';
    textarea.style.background = 'transparent';
    textarea.style.resize = 'none';
    textarea.style.textAlign = 'center';
    textarea.style.padding = '5px';
    textarea.style.boxSizing = 'border-box';
}

const styleActionsBtn = (btn) => {
    btn.style.margin = '0 2px';
    btn.style.background = 'none';
    btn.style.border = '1px solid grey';
    btn.style.borderRadius = '50%';
    btn.style.width = 'clamp(28px, 6vw, 32px)';
    btn.style.height = 'clamp(28px, 6vw, 32px)';
    btn.style.display = 'inline-flex';
    btn.style.justifyContent = 'center';
    btn.style.alignItems = 'center';
    btn.style.cursor = 'pointer';
    btn.style.padding = '0';
}

const styleCheckboxIcon = (checkbox, isCompleted = false) => {
    checkbox.style.borderRadius = '50%';
    checkbox.style.width = 'clamp(28px, 6vw, 32px)';
    checkbox.style.height = 'clamp(28px, 6vw, 32px)';
    checkbox.style.display = 'flex';
    checkbox.style.justifyContent = 'center';
    checkbox.style.alignItems = 'center';
    checkbox.style.cursor = 'pointer';
    checkbox.style.margin = '0 auto';

    if (isCompleted){
        checkbox.style.border = '1px solid #4caf50';
        checkbox.style.backgroundColor = '#e8f5e8';
    } else{
        checkbox.style.border = '1px solid grey';
        checkbox.style.backgroundColor = 'transparent';
    }   
}

const styleStatusLabel = (label, isCompleted = false) => {
    label.style.padding = '6px 12px';
    label.style.borderRadius = '20px';
    label.style.fontSize = '14px';
    label.style.fontWeight = '600';
    label.style.display = 'inline-block';
    label.style.minWidth = '80px';
    label.style.textAlign = 'center';
    
    if (isCompleted){
        label.style.backgroundColor = '#e8f5e8';
        label.style.color = '#2e7d32';
        label.style.border = '1px solid #4caf50';
    } else{
        label.style.backgroundColor = '#fff3cd';
        label.style.color = '#856404';
        label.style.border = '1px solid #ffc107';
    }
}