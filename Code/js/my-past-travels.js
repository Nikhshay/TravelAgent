// Initialize Map
const map = L.map('map', {
  minZoom: 2,
  maxZoom: 6,
  worldCopyJump: true
}).setView([20, 0], 2);

// Add basemap
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenMapTiles & Stadia Maps'
}).addTo(map);

// Load World GeoJSON
fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => {
        const countryName = feature.properties.name;
        const isVisited = travelData.some(entry => entry.country === countryName);

        return {
          color: isVisited ? 'green' : '#ccc',
          weight: 1,
          fillOpacity: 0,
          fillColor: isVisited ? 'green' : '#eee'
        };
      },
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.name;
        const isVisited = travelData.some(entry => entry.country === countryName);

        layer.on({
          mouseover: e => {
            const layer = e.target;
            layer.setStyle({
              weight: 2,
              color: '#666',
              fillOpacity: 0.7
            });
            layer.bindTooltip(
              isVisited ? `✅ Visited: ${countryName}` : `❌ Not Visited: ${countryName}`,
              { sticky: true }
            ).openTooltip();
          },
          mouseout: e => {
            const layer = e.target;
            layer.setStyle({
              weight: 1,
              color: isVisited ? 'green' : '#ccc',
              fillColor: isVisited ? 'green' : '#eee',
              fillOpacity: 0.6
            });
            layer.closeTooltip();
          }
        });

        // Fade-in animation
        setTimeout(() => {
          layer.setStyle({ fillOpacity: 0.6 });
        }, Math.random() * 1000);
      }
    }).addTo(map);

    // After countries are drawn, add cities
    addCityMarkers();
  });

// Add black dot markers for all cities
function addCityMarkers() {
  travelData.forEach(countryEntry => {
    countryEntry.cities.forEach(city => {
      const blackDot = L.divIcon({ className: 'custom-marker' });
      const marker = L.marker(city.coords, { icon: blackDot }).addTo(map);

      // Create popup content
      let popupContent = `<b>${city.name}</b>`;
      if (city.title) popupContent += `<br><strong>${city.title}</strong>`;
      if (city.story) popupContent += `<br>${city.story}`;
      if (city.images && city.images.length > 0) {
        popupContent += `<br>`;
        city.images.forEach(img => {
          popupContent += `<img src="../assets/${img}" style="width:100px;margin:5px;">`;
        });
      }

      marker.bindPopup(popupContent);
    });
  });
}

// Travel Progress Bar Animation
function updateTravelProgress() {
  const totalCountries = 195; // Total number of countries
  const visitedCountries = travelData.map(entry => entry.country);
  const visited = visitedCountries.length;
  const percent = ((visited / totalCountries) * 100).toFixed(2);

  const progressText = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-fill');

  let current = 0;
  const speed = 20; // ms per step

  const interval = setInterval(() => {
    if (current >= percent) {
      clearInterval(interval);
      current = percent;
    }
    progressText.textContent = `🌎 Visited ${visited} of ${totalCountries} countries (${current.toFixed(2)}%)`;
    progressFill.style.width = `${current}%`;
    current += 0.5;
  }, speed);
}

// Call it
updateTravelProgress();
