export default function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader-spinner" aria-hidden="true" />
      <span>Loading movies...</span>
    </div>
  );
}
