// Price configuration for Grab Chauffeur Service
const CHAUFFEUR_PRICES = {
  baseRate: {
    4: 2000,
    8: 3800,
    12: 5400,
    24: 10000
  },
  vehiclePremium: {
    'sedan': 500,
    'suv': 800,
    'van': 1000
  },
  serviceFee: 200
};


function initChauffeurPricing() {

  const durationSelect = document.getElementById('duration');
  const vehicleSelect = document.getElementById('vehicle-type');
  const hoursDisplay = document.getElementById('hours-display');
  const baseRateDisplay = document.getElementById('base-rate');
  const vehiclePremiumDisplay = document.getElementById('vehicle-premium');
  const serviceFeeDisplay = document.getElementById('service-fee');
  const totalPriceDisplay = document.getElementById('total-price');

  if (!durationSelect || !vehicleSelect) return;


  function updatePrices() {
    const hours = parseInt(durationSelect.value);
    const vehicleType = vehicleSelect.value;

    hoursDisplay.textContent = hours;
    
    const baseRate = CHAUFFEUR_PRICES.baseRate[hours];
    const vehiclePremium = CHAUFFEUR_PRICES.vehiclePremium[vehicleType];
    const serviceFee = CHAUFFEUR_PRICES.serviceFee;
    const total = baseRate + vehiclePremium + serviceFee;

    baseRateDisplay.textContent = `₱${baseRate.toLocaleString()}`;
    vehiclePremiumDisplay.textContent = `₱${vehiclePremium.toLocaleString()}`;
    serviceFeeDisplay.textContent = `₱${serviceFee.toLocaleString()}`;
    totalPriceDisplay.textContent = `₱${total.toLocaleString()}`;
  }

 
  durationSelect.addEventListener('change', updatePrices);
  vehicleSelect.addEventListener('change', updatePrices);


  updatePrices();
}

// Date pricing
function initAccommodationPricing() {
  const checkInInput = document.querySelector('.check-in input');
  const checkOutInput = document.querySelector('.check-out input');
  const summaryNights = document.querySelector('.summary-item:first-child');
  const cleaningFee = 1500;
  const serviceFee = 2000;
  const pricePerNight = 9568;

  if (!checkInInput || !checkOutInput || !summaryNights) return;

  function calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function updatePricing() {
    if (checkInInput.value && checkOutInput.value) {
      const nights = calculateNights(checkInInput.value, checkOutInput.value);
      const subtotal = pricePerNight * nights;
      const total = subtotal + cleaningFee + serviceFee;

      summaryNights.innerHTML = `<span>₱${pricePerNight.toLocaleString()} × ${nights} nights</span><span>₱${subtotal.toLocaleString()}</span>`;
      document.querySelector('.summary-total span:last-child').textContent = `₱${total.toLocaleString()}`;
    }
  }

  checkInInput.addEventListener('change', updatePricing);
  checkOutInput.addEventListener('change', updatePricing);
}

document.addEventListener('DOMContentLoaded', function() {
  initChauffeurPricing();
  initAccommodationPricing();
  

  const dropdownBtns = document.querySelectorAll('.dropdown-btn');
  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
      const subMenu = this.nextElementSibling;
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
      } else {
        subMenu.classList.add('show');
      }
    });
  });
});
