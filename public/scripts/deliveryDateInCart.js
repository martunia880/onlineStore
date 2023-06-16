// Pobierz dzisiejszą datę
var today = new Date();

// Dodaj 2 dni
var startDate = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));

// Dodaj 4 dni
var endDate = new Date(today.getTime() + (4 * 24 * 60 * 60 * 1000));

// Formatuj daty jako łańcuchy znaków
var startDateString = startDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
var endDateString = endDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });

// Ustaw zawartość elementu delivery-date
var deliveryDateElement = document.getElementById('delivery-date');
deliveryDateElement.textContent = startDateString + ' - ' + endDateString;
    