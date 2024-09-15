document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('cookieTableBody');
  
    // Get current tab's URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const url = new URL(tab.url);
      
      // Get cookies for the current domain
      chrome.cookies.getAll({ domain: url.hostname }, (cookies) => {
        cookies.forEach(cookie => {
          const row = document.createElement('tr');
          
          // Create Name column
          const nameCell = document.createElement('td');
          nameCell.textContent = cookie.name;
          row.appendChild(nameCell);
  
          // Create Value column (apply ellipsis if too long)
          const valueCell = document.createElement('td');
          valueCell.textContent = cookie.value;
          valueCell.className = 'cookie-value'; // Apply ellipsis styling
          row.appendChild(valueCell);
  
          // Create Copy Icon column
          const copyCell = document.createElement('td');
          const copyIcon = document.createElement('img');
          copyIcon.src = 'icons/copy.png'; // Add your icon path here
          copyIcon.className = 'copy-icon';
          copyIcon.addEventListener('click', () => {
            navigator.clipboard.writeText(cookie.value)
              .then(() => alert(`Cookie value for ${cookie.name} copied!`))
              .catch(err => console.error('Could not copy text: ', err));
          });
          copyCell.appendChild(copyIcon);
          row.appendChild(copyCell);
  
          tableBody.appendChild(row);
        });
      });
    });
  });
  