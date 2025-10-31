const styleCheckboxIcon = (checkbox, isCompleted = false) => {
    const screenWidth = window.innerWidth;
    const isSmallScreen = screenWidth <= 600;
    
    const size = isSmallScreen ? '25px' : '32px';
    const borderWidth = isSmallScreen ? '1px' : '1px';
        
    checkbox.style.width = size;
    checkbox.style.height = size;
    checkbox.style.borderWidth = borderWidth;

    if (isCompleted){
        checkbox.style.border = '1px solid #4caf50';
        checkbox.style.backgroundColor = '#e8f5e8';
    } else{
        checkbox.style.border = '1px solid grey';
        checkbox.style.backgroundColor = 'transparent';
    }   
}

const styleStatusLabel = (label, isCompleted = false) => {
    const screenWidth = window.innerWidth;
    const isSmallScreen = screenWidth <= 600;
    
    const padding = isSmallScreen ? '4px 8px' : '6px 12px';
    const fontSize = isSmallScreen ? '10px' : '12px';
    const minWidth = isSmallScreen ? '70px' : '80px';
    const borderRadius = isSmallScreen ? '15px' : '20px';

    label.style.padding = padding;
    label.style.borderRadius = borderRadius;
    label.style.fontSize = fontSize;
    label.style.fontWeight = '600';
    label.style.display = 'inline-block';
    label.style.minWidth = minWidth;
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
