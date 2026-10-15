import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaTractor,
  FaCloudSun,
  FaBasketShopping,
  FaBookOpen,
  FaTriangleExclamation,
  FaBoxesPacking,
  FaArrowRight,
  FaLocationDot,
  FaDroplet,
  FaWind,
  FaGauge,
  FaTemperatureHalf,
  FaMagnifyingGlass,
  FaCrosshairs,
} from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { getWeatherByCoords, getWeatherByCity } from "../../api/weatherApi";
import { getCropInfoList } from "../../api/cropInfoApi";
import { getCropImage } from "../../utils/cropImages";

const QUICK_ACTIONS = [
  {
    to: "/farms",
    icon: FaTractor,
    color: "emerald",
    title: "My Farms",
    desc: "Manage acreage plots, soil types, and registered lands",
  },
  {
    to: "/weather",
    icon: FaCloudSun,
    color: "sky",
    title: "Weather Hub",
    desc: "Hyperlocal precipitation, wind speed, and humidity forecasts",
  },
  {
    to: "/products",
    icon: FaBasketShopping,
    color: "amber",
    title: "Agri Marketplace",
    desc: "Procure certified seeds, fertilizers, and protective inputs",
  },
  {
    to: "/crop-info",
    icon: FaBookOpen,
    color: "emerald",
    title: "Crop Guide",
    desc: "Agronomic cultivation cycles and pest management guides",
  },
  {
    to: "/my-alerts",
    icon: FaTriangleExclamation,
    color: "danger",
    title: "Pest Alerts",
    desc: "Active pest outbreaks and diagnostic early warning radar",
  },
  {
    to: "/my-bookings",
    icon: FaBoxesPacking,
    color: "dark",
    title: "My Orders",
    desc: "Real-time dispatch tracking for farm inputs and machinery",
  },
];

export default function UserHome() {
  const { user } = useAuth();

  // Weather widget states
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState("");

  // Crop Information showcase states
  const [crops, setCrops] = useState([]);
  const [cropsLoading, setCropsLoading] = useState(true);

  // Initialize weather using geolocation, with fallback to Jakarta/Bandung
  useEffect(() => {
    let isMounted = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await getWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            if (isMounted) {
              setWeather(data);
              setWeatherLoading(false);
            }
          } catch {
            if (isMounted) fetchFallbackWeather();
          }
        },
        () => {
          if (isMounted) fetchFallbackWeather();
        }
      );
    } else {
      fetchFallbackWeather();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const fetchFallbackWeather = async () => {
    try {
      const data = await getWeatherByCity("Jakarta");
      setWeather(data);
    } catch {
      setWeatherError("Weather data currently unavailable.");
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleCitySearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    setWeatherLoading(true);
    setWeatherError("");
    try {
      const data = await getWeatherByCity(city.trim());
      setWeather(data);
    } catch (err) {
      setWeatherError(err.response?.data?.message || "Location not found.");
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    setWeatherLoading(true);
    setWeatherError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
          setWeather(data);
        } catch {
          setWeatherError("Failed to fetch location weather.");
        } finally {
          setWeatherLoading(false);
        }
      },
      () => {
        setWeatherError("Location access denied.");
        setWeatherLoading(false);
      }
    );
  };

  // Load Crop Information for Agricultural Information Section
  useEffect(() => {
    (async () => {
      try {
        const data = await getCropInfoList();
        setCrops(data);
      } catch {
        // Silent fallback
      } finally {
        setCropsLoading(false);
      }
    })();
  }, []);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container fluid className="page-container py-4">
      {/* Welcome Banner */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h2 className="fw-bold text-dark mb-0">Welcome, {user?.name}</h2>
            <span className="badge badge-soft-success">Active Farmer</span>
          </div>
          <p className="text-muted small mb-0">{formattedDate} &middot; Precision Farm Operations Center</p>
        </div>
        <div className="mt-3 mt-md-0 d-flex gap-2">
          <Button as={Link} to="/farms/new" variant="success" size="sm" className="px-3">
            + Register New Farm
          </Button>
          <Button as={Link} to="/products" variant="outline-success" size="sm" className="px-3">
            Marketplace
          </Button>
        </div>
      </div>

      {/* Weather Forecast Section (PDF Page 23) */}
      <div className="mb-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <div>
            <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
              <FaCloudSun className="text-success" /> Weather Forecast
            </h4>
            <p className="text-muted small mb-0">Real-time localized meteorological conditions for your fields</p>
          </div>

          {/* Quick city search */}
          <Form onSubmit={handleCitySearch} className="d-flex gap-2 mt-2 mt-sm-0" style={{ maxWidth: "340px", width: "100%" }}>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Search city / district..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button type="submit" variant="success" size="sm" className="d-flex align-items-center gap-1">
              <FaMagnifyingGlass size={12} />
              <span>Search</span>
            </Button>
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              onClick={handleUseMyLocation}
              title="Use Current GPS Location"
              className="d-flex align-items-center"
            >
              <FaCrosshairs size={13} />
            </Button>
          </Form>
        </div>

        {weatherError && <Alert variant="warning" className="small py-2">{weatherError}</Alert>}

        {weatherLoading ? (
          <Card className="p-4 text-center agri-card shadow-sm">
            <Spinner animation="border" variant="success" className="mx-auto mb-2" />
            <span className="text-muted small">Fetching latest atmospheric data...</span>
          </Card>
        ) : weather ? (
          <div className="weather-hero-card">
            <Row className="align-items-center gy-4">
              <Col md={5} className="border-md-end border-white-50">
                <div className="d-flex align-items-center gap-2 mb-2 text-white-50 small">
                  <FaLocationDot size={14} className="text-white" />
                  <span className="fw-semibold text-white fs-6">
                    {weather.name}, {weather.sys?.country}
                  </span>
                  <span>(Current Location)</span>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <h1 className="display-3 fw-bold mb-0 text-white" style={{ letterSpacing: "-0.04em" }}>
                    {Math.round(weather.main?.temp)}&deg;C
                  </h1>
                  {weather.weather?.[0]?.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      style={{ width: 68, height: 68 }}
                    />
                  )}
                </div>

                <div className="text-capitalize fw-semibold fs-6 mt-1 text-light">
                  {weather.weather?.[0]?.description}
                </div>
              </Col>

              <Col md={7}>
                <Row className="g-3">
                  <Col xs={6} sm={3}>
                    <div className="weather-metric-pill text-center">
                      <FaDroplet size={18} className="mb-2 text-white-50" />
                      <div className="text-white-50 small" style={{ fontSize: "0.75rem" }}>Humidity</div>
                      <div className="fw-bold fs-6 text-white">{weather.main?.humidity}%</div>
                    </div>
                  </Col>

                  <Col xs={6} sm={3}>
                    <div className="weather-metric-pill text-center">
                      <FaWind size={18} className="mb-2 text-white-50" />
                      <div className="text-white-50 small" style={{ fontSize: "0.75rem" }}>Wind Speed</div>
                      <div className="fw-bold fs-6 text-white">{weather.wind?.speed} m/s</div>
                    </div>
                  </Col>

                  <Col xs={6} sm={3}>
                    <div className="weather-metric-pill text-center">
                      <FaGauge size={18} className="mb-2 text-white-50" />
                      <div className="text-white-50 small" style={{ fontSize: "0.75rem" }}>Pressure</div>
                      <div className="fw-bold fs-6 text-white">{weather.main?.pressure} hPa</div>
                    </div>
                  </Col>

                  <Col xs={6} sm={3}>
                    <div className="weather-metric-pill text-center">
                      <FaTemperatureHalf size={18} className="mb-2 text-white-50" />
                      <div className="text-white-50 small" style={{ fontSize: "0.75rem" }}>Feels Like</div>
                      <div className="fw-bold fs-6 text-white">{Math.round(weather.main?.feels_like)}&deg;C</div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        ) : null}
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="mb-5">
        <h4 className="fw-bold text-dark mb-3">Farm Management Hub</h4>
        <Row className="g-3">
          {QUICK_ACTIONS.map(({ to, icon: Icon, color, title, desc }) => (
            <Col key={to} xs={12} sm={6} lg={4}>
              <Card as={Link} to={to} className="h-100 agri-card agri-card-hover p-3 text-decoration-none">
                <Card.Body className="p-2 d-flex gap-3 align-items-start">
                  <div className={`agri-icon-box agri-icon-${color}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="fw-bold text-dark mb-0">{title}</h6>
                      <FaArrowRight size={13} className="text-muted" />
                    </div>
                    <p className="text-muted small mb-0">{desc}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Agricultural Information Showcase (PDF Page 24) */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="fw-bold text-dark mb-1">Agricultural Information</h4>
            <p className="text-muted small mb-0">Agronomic guides and cultivation cycles for primary regional crops</p>
          </div>
          <Button as={Link} to="/crop-info" variant="outline-success" size="sm">
            View All Crops &rarr;
          </Button>
        </div>

        {cropsLoading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="success" />
          </div>
        ) : (
          <Row className="g-4">
            {crops.slice(0, 6).map((crop) => (
              <Col key={crop.id} xs={12} sm={6} lg={4}>
                <Card className="h-100 agri-card agri-card-hover border-0 shadow-sm">
                  <div className="position-relative agri-overflow-hidden">
                    <img
                      src={getCropImage(crop.id)}
                      alt={crop.name}
                      className="agri-crop-card-img"
                    />
                    <span className="position-absolute top-0 end-0 m-2 badge badge-soft-success">
                      Staple Crop
                    </span>
                  </div>
                  <Card.Body className="d-flex flex-column p-3">
                    <h5 className="fw-bold text-dark mb-1">{crop.name}</h5>
                    <p className="text-muted small mb-3 flex-grow-1">
                      Explore detailed climate parameters, sowing schedules, and recommended soil preparations.
                    </p>
                    <Button
                      as={Link}
                      to={`/crop-info/${crop.id}`}
                      variant="outline-success"
                      size="sm"
                      className="w-100 fw-semibold d-flex justify-content-center align-items-center gap-1"
                    >
                      <span>Learn More</span>
                      <FaArrowRight size={13} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
}
