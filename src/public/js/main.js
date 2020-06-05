/**
 * Add image to the dom after redirect
**/
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('url')) {
    const url = params.get('url');
    const filename = params.get('filename');

    const previewDiv = document.getElementById('preview');
    const img = document.createElement('IMG');
    const h2 = document.createElement('H2');
    const p = document.createElement('P');

    h2.innerText = 'Uploaded Image';
    p.innerText = filename;
    img.src = url;

    previewDiv.appendChild(h2);
    previewDiv.appendChild(p);
    previewDiv.appendChild(img);
  }
});
