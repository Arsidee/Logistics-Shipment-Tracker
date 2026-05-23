import '../styles/StatusBadge.css';

const classMap = {
  'In Transit': 'in-transit',
  'Delivered':  'delivered',
  'Delayed':    'delayed',
  'Pending':    'pending',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${classMap[status] ?? ''}`}>
      {status}
    </span>
  );
}
