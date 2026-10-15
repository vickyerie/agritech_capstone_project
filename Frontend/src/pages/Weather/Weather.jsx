import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  FaCloudSun,
  FaLocationDot,
  FaDroplet,
  FaWind,
  FaGauge,
  FaTemperatureHalf,
  FaMagnifyingGlass,
  FaCrosshairs,
  FaTractor,
  FaShieldHalved,
  FaCircleInfo,
} from "react-icons/fa6";
import { getWeatherByCoords, getWeatherByCity } from "../../api/weatherApi";
import { getMyFarms } from "../../api/farmApi";

export default function Weather() {
  const [city, setCity] = useState("");
  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user's farms for dropdown
  useEffect(() => {
    getMyFarms()
      .then(setFarms)
      .catch(() => {
        // Optional feature
      });
  }, []);

  // Auto-detect location on load
  useEffect(() => {
    detectCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation.");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data);
        } catch (err) {
          setError(
            err.response?.data?.message || "Failed to retrieve local weather data."
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied. Please enter a city name manually.");
        setLoading(false);
      }
    );
  };

  const searchByCity = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError("");
    try {
      const data = await getWeatherByCity(cityName);
      setWeather(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "City not found or OpenWeather API connection pending."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchByCity(city);
  };

  const handleFarmSelect = (e) => {
    const farmId = e.target.value;
    setSelectedFarmId(farmId);
    const farm = farms.find((f) => f._id === farmId);
    if (farm) {
      setCity(farm.location);
      searchByCity(farm.location);
    }
  };

  return (
    <Container style={{ maxWidth: "780px" }} className="py-4">
      {/* Page Title */}
      <div className="text-center mb-4">
        <div className="agri-icon-box agri-icon-sky mx-auto mb-2" style={{ width: 54, height: 54 }}>
          <FaCloudSun size={26} />
        </div>
        <h2 className="agri-page-title">Hyperlocal Weather Forecasting</h2>
        <p className="agri-page-subtitle">
          Real-time atmospheric monitoring to optimize irrigation schedules, pesticide spraying, and harvesting windows
        </p>
      </div>

      {/* Control Card: Farm selector + Search input */}
      <Card className="agri-card border-0 shadow-sm p-4 mb-4">
        {farms.length > 0 && (
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
              <FaTractor size={13} className="text-success" />
              <span>Inspect Weather at Your Farm Location</span>
            </Form.Label>
            <Form.Select value={selectedFarmId} onChange={handleFarmSelect}>
              <option value="">-- Choose from Registered Farms --</option>
              {farms.map((farm) => (
                <option key={farm._id} value={farm._id}>
                  {farm.name} &middot; {farm.location} ({farm.cropType})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <Form onSubmit={handleSearchSubmit}>
          <Form.Label className="small fw-semibold text-secondary">
            Or Search by City / Agricultural District
          </Form.Label>
          <div className="d-flex gap-2">
            <div className="position-relative flex-grow-1">
              <FaMagnifyingGlass
                size={14}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              />
              <Form.Control
                type="text"
                placeholder="e.g. Hyderabad, Tangerang, Bogor..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="ps-5"
              />
            </div>
            <Button type="submit" variant="success" className="px-4 d-flex align-items-center gap-1">
              <span>Search</span>
            </Button>
          </div>
        </Form>

        <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={detectCurrentLocation}
            className="d-flex align-items-center gap-2"
          >
            <FaCrosshairs size={13} className="text-success" />
            <span>Use My Current GPS Location</span>
          </Button>

          <span className="text-muted small">Live OpenWeather Data</span>
        </div>
      </Card>

      {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

      {/* Weather Display */}
      {loading ? (
        <Card className="p-5 text-center agri-card shadow-sm">
          <Spinner animation="border" variant="success" className="mx-auto mb-2" />
          <div className="text-muted small">Retrieving live atmospheric conditions...</div>
        </Card>
      ) : weather ? (
        <div className="d-flex flex-column gap-3">
          <div className="weather-hero-card">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <FaLocationDot size={18} />
                <h4 className="fw-bold mb-0 text-white">
                  {weather.name}, {weather.sys?.country}
                </h4>
              </div>
              <span className="badge bg-white text-dark fw-bold px-3 py-1 shadow-sm">
                Live Reading
              </span>
            </div>

            <div className="d-flex align-items-center gap-3 my-3">
              <h1 className="display-2 fw-extrabold text-white mb-0" style={{ letterSpacing: "-0.04em" }}>
                {Math.round(weather.main?.temp)}&deg;C
              </h1>
              {weather.weather?.[0]?.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  style={{ width: 80, height: 80 }}
                />
              )}
            </div>

            <h5 className="text-capitalize text-light mb-4">
              {weather.weather?.[0]?.description}
            </h5>

            <Row className="g-3">
              <Col xs={6} sm={3}>
                <div className="weather-metric-pill text-center">
                  <FaDroplet size={18} className="mb-2 text-white-50" />
                  <div className="text-white-50 small" style={{ fontSize: "0.75rem" }}>Humidity</div>
                  <div className="fw-bold fs-5 text-white">{weather.main?.humidity}%</div>
                </div>
              </Col>

              <Col xs={6} sm={3}>
                <div className="weather-metric-pill text-center">
                  <FaWind size={18} className="mb-2 text-white-50" />
                  <div className="text-white-50 small" style={{ fontSize: "0.75rem" }}>Wind Speed</div>
                  <div className="fw-bold fs-5 text-white">{weather.wind?.speed} m/s</div>
                </div>
              </Col>

              <Col xs={6} sm={3}>
                <div className="weather-metric-pill text-center">
                  <FaGauge size={18} className="mb-2 text-white-50" />
                  <div className="text-white-50 small" style={{ fontSize: "0.75rem" }}>Pressure</div>
                  <div className="fw-bold fs-5 text-white">{weather.main?.pressure} hPa</div>
                </div>
              </Col>

              <Col xs={6} sm={3}>
                <div className="weather-metric-pill text-center">
                  <FaTemperatureHalf size={18} className="mb-2 text-white-50" />
                  <div className="text-white-50 small" style={{ fontSize: "0.75rem" }}>Feels Like</div>
                  <div className="fw-bold fs-5 text-white">{Math.round(weather.main?.feels_like)}&deg;C</div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Agronomic Action Insight */}
          <Card className="agri-card border-0 shadow-sm p-3 bg-white">
            <div className="d-flex align-items-start gap-3">
              <div className="agri-icon-box agri-icon-emerald" style={{ width: 38, height: 38 }}>
                <FaCircleInfo size={16} />
              </div>
              <div className="small">
                <div className="fw-bold text-dark mb-1">Agronomic Spraying & Irrigation Window</div>
                <div className="text-muted">
                  {weather.wind?.speed > 5
                    ? "Elevated wind speeds detected (>5 m/s). Avoid spraying pesticides or foliar nutrients to prevent chemical drift."
                    : weather.main?.humidity > 80
                    ? "High relative humidity detected. Monitor fields closely for fungal sporulation and damp blight."
                    : "Optimal environmental conditions for ground tractor operations and field irrigation."}
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="agri-card border-0 shadow-sm p-5 text-center">
          <FaCloudSun size={36} className="text-muted mx-auto mb-2" />
          <h6 className="fw-bold text-dark mb-1">No Weather Information Loaded</h6>
          <p className="text-muted small mb-0">
            Use the search box above or choose a farm location to display weather parameters.
          </p>
        </Card>
      )}
    </Container>
  );
}
