import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaLink, FaCopy, FaCheck } from 'react-icons/fa';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/urls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(`${import.meta.env.VITE_SERVER_URL}/${data.shortCode}`);
    } catch (err) {
      setError('An error occurred while shortening the URL. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column align-items-center justify-content-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="text-center mb-5">
              <h1 className="fw-bold display-4 text-primary mb-3">
                <FaLink className="me-3 mb-1" />
                Espresso URL
              </h1>
              <p className="lead text-muted">A minimal and fast URL shortener.</p>
            </div>

            <Card className="shadow-sm border-0 rounded-4 mb-4">
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="urlInput">
                    <Form.Label className="fw-semibold text-secondary mb-2">Enter your long URL</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="https://example.com/very/long/path..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      size="lg"
                      className="rounded-3"
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="w-100 rounded-3 fw-bold shadow-sm"
                    disabled={loading || !url}
                  >
                    {loading ? 'Shortening...' : 'Shorten URL'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {error && (
              <Alert variant="danger" className="rounded-3 shadow-sm border-0">
                {error}
              </Alert>
            )}

            {shortUrl && (
              <Card className="shadow-sm border-0 rounded-4 bg-primary text-white overflow-hidden slide-up-animation">
                <Card.Body className="p-4 d-flex align-items-center justify-content-between">
                  <div className="text-truncate me-3">
                    <div className="small text-white-50 mb-1 fw-semibold text-uppercase tracking-wide">Your Short URL</div>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-decoration-none fs-5 fw-bold"
                    >
                      {shortUrl}
                    </a>
                  </div>
                  <Button
                    variant={copied ? "success" : "light"}
                    onClick={copyToClipboard}
                    className="rounded-circle p-3 d-flex align-items-center justify-content-center shadow-sm flex-shrink-0 transition-all"
                    style={{ width: '50px', height: '50px' }}
                    title="Copy to clipboard"
                  >
                    {copied ? <FaCheck size={20} /> : <FaCopy size={20} className="text-primary" />}
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      {/* Version Footer */}
      <div className="position-fixed bottom-0 start-50 translate-middle-x p-2">
        <a 
          href="https://github.com/RMCampos/espresso-url/pkgs/container/espresso-url/frontend" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted text-decoration-none transition-all footer-link"
          style={{ fontSize: '0.75rem', opacity: 0.6 }}
        >
          {import.meta.env.VITE_BUILD || 'vdev'}
        </a>
      </div>

      {/* Simple inline styles for animations since we aren't using an external CSS file for custom styles yet */}
      <style>{`
        .slide-up-animation {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tracking-wide { letter-spacing: 0.05em; }
        .transition-all { transition: all 0.2s ease-in-out; }
      `}</style>
    </div>
  );
}

export default App;
