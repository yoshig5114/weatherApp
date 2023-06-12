


const toggleButton = document.querySelector('degreesToggle');

const toggleButtonState = {
  isActive: false,
  temperatureUnit: 'F',
};

toggleButton.addEventListener('click', () => {
  toggleButtonState.isActive = !toggleButtonState.isActive;
  toggleButtonState.temperatureUnit = toggleButtonState.isActive ? 'C' : 'F';

  toggleButton.classList.toggle('active', toggleButtonState.isActive);
  document.querySelector(`.toggle-button span.${toggleButtonState.temperatureUnit}`).classList.add('active');
});