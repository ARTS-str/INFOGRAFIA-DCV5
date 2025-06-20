let latamMapEN = document.getElementById('LATAM_EN');

function language(languageTo) {
    switch (languageTo) {
        case 'ES':
            currentMap = latamMap;
            latamMapEN.style.display = 'none';
            latamMap.style.display = 'block';
            
            break;
        case 'EN':
                currentMap = latamMapEN;
                latamMap.style.display = 'none';
                latamMapEN.style.display = 'block';
            break;
        case 'PR':
            
            break;
    
        default:
            break;
    }
}