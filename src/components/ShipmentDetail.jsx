import StatusBadge from './StatusBadge';
import '../styles/ShipmentDetail.css';

export default function ShipmentDetail({ shipment, onClose, onDelete }) {
  if (!shipment) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={e => e.stopPropagation()}>
        <div className="detail-header">
          <button className="detail-back" onClick={onClose}>← Back to Dashboard</button>
          <div className="detail-id">{shipment.id}</div>
          <StatusBadge status={shipment.status} />
        </div>

        <div className="detail-body">
          <div className="detail-section">
            <div className="detail-section-title">Route</div>
            <div className="route-display">
              <div className="route-city">
                <label>Origin</label>
                <span>{shipment.origin}</span>
              </div>
              <div className="route-divider">→</div>
              <div className="route-city">
                <label>Destination</label>
                <span>{shipment.destination}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-section-title">Shipment Info</div>
            <div className="detail-grid">
              <div className="detail-field">
                <label>Carrier</label>
                <span>{shipment.carrier}</span>
              </div>
              <div className="detail-field">
                <label>Weight</label>
                <span>{shipment.weight}</span>
              </div>
              <div className="detail-field">
                <label>Est. Delivery</label>
                <span>{shipment.estimatedDelivery}</span>
              </div>
              <div className="detail-field">
                <label>Tracking ID</label>
                <span style={{ fontFamily: 'monospace' }}>{shipment.id}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-section-title">Tracking History</div>
            <div className="timeline">
              {[...shipment.trackingEvents].reverse().map((event, i) => (
                <div className="timeline-event" key={i}>
                  <div className="timeline-dot" />
                  <div className="timeline-event-name">{event.event}</div>
                  <div className="timeline-event-meta">
                    {event.location} &middot; {event.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="detail-delete-btn"
            onClick={() => onDelete(shipment.id)}
          >
            Delete Shipment
          </button>
        </div>
      </div>
    </div>
  );
}
