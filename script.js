const container = document.querySelector('.container');
const author = document.querySelector('.author');

const handleResize = () => {
  document.body.style.height = '100vh';

  const containerHeight = container.offsetHeight;
  const authorHeight = author.offsetHeight;
  const totalHeight = containerHeight + authorHeight;
  const documentHeight = document.documentElement.offsetHeight;

  if (totalHeight >= documentHeight) document.body.style.height = 'auto';
  else document.body.style.height = '100vh';
};

window.addEventListener('resize', handleResize);
