const styleCheckboxIcon = (checkbox, isCompleted = false) => {
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
