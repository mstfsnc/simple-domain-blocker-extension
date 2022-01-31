import "./Status.scss";

export default ({ checked, onChange }) => {
  return (
    <div className="status">
      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
};
