export default function DashStatsCard({ title, value }) {
  return (
    <div className="bg-white shadow p-4 rounded flex flex-col">
      <span className="text-gray-500">{title}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
